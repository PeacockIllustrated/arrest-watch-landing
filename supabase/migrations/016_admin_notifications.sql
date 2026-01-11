-- =============================================================================
-- ArrestDelta Admin Notifications & Deck Access Requests — Migration 016
-- Run this in Supabase SQL Editor
-- =============================================================================

-- =============================================================================
-- PART 1: NOTIFICATIONS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS admin_notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('new_signup', 'deck_access_request', 'system')),
    title TEXT NOT NULL,
    message TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email TEXT,  -- Denormalized for quick display
    metadata JSONB DEFAULT '{}'::jsonb,  -- Stores deck_ids for access requests
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for quick unread queries
CREATE INDEX IF NOT EXISTS idx_admin_notifications_unread ON admin_notifications(is_read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_type ON admin_notifications(type);

-- RLS: Only super admins can read/update
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "super_admin_read_notifications" ON admin_notifications;
CREATE POLICY "super_admin_read_notifications" ON admin_notifications FOR SELECT
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin');

DROP POLICY IF EXISTS "super_admin_update_notifications" ON admin_notifications;
CREATE POLICY "super_admin_update_notifications" ON admin_notifications FOR UPDATE
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin');

-- Allow insert from trigger (uses SECURITY DEFINER)
DROP POLICY IF EXISTS "system_insert_notifications" ON admin_notifications;
CREATE POLICY "system_insert_notifications" ON admin_notifications FOR INSERT
    WITH CHECK (true);

-- =============================================================================
-- PART 2: DECK ACCESS REQUESTS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS deck_access_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    deck_id TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
    requested_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    resolved_at TIMESTAMPTZ,
    resolved_by UUID REFERENCES auth.users(id),
    UNIQUE(user_id, deck_id)  -- One request per user/deck combo
);

CREATE INDEX IF NOT EXISTS idx_deck_access_requests_user ON deck_access_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_deck_access_requests_status ON deck_access_requests(status);

ALTER TABLE deck_access_requests ENABLE ROW LEVEL SECURITY;

-- Users can view their own requests
DROP POLICY IF EXISTS "user_read_own_requests" ON deck_access_requests;
CREATE POLICY "user_read_own_requests" ON deck_access_requests FOR SELECT
    USING (user_id = auth.uid());

-- Users can create requests for themselves
DROP POLICY IF EXISTS "user_insert_own_requests" ON deck_access_requests;
CREATE POLICY "user_insert_own_requests" ON deck_access_requests FOR INSERT
    WITH CHECK (user_id = auth.uid());

-- Super admins can read all requests
DROP POLICY IF EXISTS "super_admin_read_all_requests" ON deck_access_requests;
CREATE POLICY "super_admin_read_all_requests" ON deck_access_requests FOR SELECT
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin');

-- Super admins can update all requests
DROP POLICY IF EXISTS "super_admin_update_requests" ON deck_access_requests;
CREATE POLICY "super_admin_update_requests" ON deck_access_requests FOR UPDATE
    USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin');

-- =============================================================================
-- PART 3: NOTIFICATION TRIGGERS
-- =============================================================================

-- Trigger: New user signup notification (DEFENSIVE - won't break signups)
CREATE OR REPLACE FUNCTION notify_new_signup()
RETURNS TRIGGER AS $$
BEGIN
    -- Use exception handling to ensure signups never fail due to notifications
    BEGIN
        INSERT INTO admin_notifications (type, title, message, user_id, user_email)
        VALUES (
            'new_signup',
            'New User Signup',
            'New user registered and may need deck access',
            NEW.id,
            NEW.email
        );
    EXCEPTION WHEN OTHERS THEN
        -- Log warning but don't fail the signup
        RAISE WARNING 'notify_new_signup failed: % - %', SQLERRM, SQLSTATE;
    END;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists, then create
DROP TRIGGER IF EXISTS on_new_user_notify ON auth.users;
CREATE TRIGGER on_new_user_notify
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION notify_new_signup();

-- Trigger: Deck access request notification
CREATE OR REPLACE FUNCTION notify_deck_access_request()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO admin_notifications (type, title, message, user_id, user_email, metadata)
    VALUES (
        'deck_access_request',
        'Deck Access Request',
        'User requested access to gated deck',
        NEW.user_id,
        (SELECT email FROM auth.users WHERE id = NEW.user_id),
        jsonb_build_object('deck_id', NEW.deck_id, 'request_id', NEW.id)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_deck_access_request_notify ON deck_access_requests;
CREATE TRIGGER on_deck_access_request_notify
    AFTER INSERT ON deck_access_requests
    FOR EACH ROW
    EXECUTE FUNCTION notify_deck_access_request();

-- =============================================================================
-- PART 4: HELPER FUNCTIONS FOR ADMIN ACTIONS
-- =============================================================================

-- Approve deck access request
CREATE OR REPLACE FUNCTION approve_deck_access(p_request_id UUID)
RETURNS TEXT AS $$
DECLARE
    v_request deck_access_requests%ROWTYPE;
    v_approver_role TEXT;
BEGIN
    -- Check caller is super_admin
    SELECT role INTO v_approver_role FROM profiles WHERE id = auth.uid();
    IF v_approver_role != 'super_admin' THEN
        RETURN 'unauthorized';
    END IF;

    -- Get the request
    SELECT * INTO v_request FROM deck_access_requests WHERE id = p_request_id;
    IF v_request IS NULL THEN
        RETURN 'not_found';
    END IF;

    -- Grant deck access
    INSERT INTO user_deck_access (user_id, deck_id, granted_by)
    VALUES (v_request.user_id, v_request.deck_id, auth.uid())
    ON CONFLICT (user_id, deck_id) DO NOTHING;

    -- Update request status
    UPDATE deck_access_requests
    SET status = 'approved', resolved_at = NOW(), resolved_by = auth.uid()
    WHERE id = p_request_id;

    RETURN 'success';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Deny deck access request
CREATE OR REPLACE FUNCTION deny_deck_access(p_request_id UUID)
RETURNS TEXT AS $$
DECLARE
    v_approver_role TEXT;
BEGIN
    SELECT role INTO v_approver_role FROM profiles WHERE id = auth.uid();
    IF v_approver_role != 'super_admin' THEN
        RETURN 'unauthorized';
    END IF;

    UPDATE deck_access_requests
    SET status = 'denied', resolved_at = NOW(), resolved_by = auth.uid()
    WHERE id = p_request_id;

    RETURN 'success';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant all standard decks to a user (non-gated decks)
CREATE OR REPLACE FUNCTION grant_all_decks_to_user(p_user_id UUID)
RETURNS TEXT AS $$
DECLARE
    v_approver_role TEXT;
    v_deck_ids TEXT[] := ARRAY[
        'investor-deck', 'why-problem', 'why-now', 'market-sizing',
        'competitive-landscape', 'technical-defensibility', 
        'technical-appendix-system-logic', 'operational-scenarios',
        'gtm-plan', 'customer-proof', 'revenue-model', 'use-of-funds',
        'kill-criteria', 'founder-investor-fit', 'valuation'
    ];
    v_deck TEXT;
BEGIN
    SELECT role INTO v_approver_role FROM profiles WHERE id = auth.uid();
    IF v_approver_role != 'super_admin' THEN
        RETURN 'unauthorized';
    END IF;

    FOREACH v_deck IN ARRAY v_deck_ids LOOP
        INSERT INTO user_deck_access (user_id, deck_id, granted_by)
        VALUES (p_user_id, v_deck, auth.uid())
        ON CONFLICT (user_id, deck_id) DO NOTHING;
    END LOOP;

    RETURN 'success';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- SUCCESS!
-- 
-- Tables created:
-- - admin_notifications (with RLS for super_admin)
-- - deck_access_requests (with RLS for users + super_admin)
--
-- Triggers:
-- - on_new_user_notify: Creates notification when user signs up
-- - on_deck_access_request_notify: Creates notification when access requested
--
-- Functions:
-- - approve_deck_access(request_id): Approves request and grants access
-- - deny_deck_access(request_id): Denies request
-- - grant_all_decks_to_user(user_id): Grants all standard decks
-- =============================================================================
