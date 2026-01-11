-- =============================================================================
-- ArrestDelta Super Admin Deck Reviews — Migration 015
-- Internal review checklist for Tom and Michael before going live
-- Run this in Supabase SQL Editor
-- =============================================================================

-- =============================================================================
-- STEP 1: CREATE TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS super_admin_deck_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    deck_id TEXT NOT NULL,
    reviewer_name TEXT NOT NULL CHECK (reviewer_name IN ('MICHAEL', 'TOM')),
    content_ok BOOLEAN DEFAULT FALSE,
    design_ok BOOLEAN DEFAULT FALSE,
    desktop_ok BOOLEAN DEFAULT FALSE,
    mobile_ok BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(deck_id, reviewer_name)
);

-- =============================================================================
-- STEP 2: ENABLE RLS - SUPER ADMIN ONLY
-- =============================================================================

ALTER TABLE super_admin_deck_reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running migration)
DROP POLICY IF EXISTS "Super admins can read all reviews" ON super_admin_deck_reviews;
DROP POLICY IF EXISTS "Super admins can insert reviews" ON super_admin_deck_reviews;
DROP POLICY IF EXISTS "Super admins can update reviews" ON super_admin_deck_reviews;

-- Read policy: only super_admin can read
CREATE POLICY "Super admins can read all reviews"
    ON super_admin_deck_reviews FOR SELECT
    USING (
        (SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin'
    );

-- Insert policy: only super_admin can insert
CREATE POLICY "Super admins can insert reviews"
    ON super_admin_deck_reviews FOR INSERT
    WITH CHECK (
        (SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin'
    );

-- Update policy: only super_admin can update
CREATE POLICY "Super admins can update reviews"
    ON super_admin_deck_reviews FOR UPDATE
    USING (
        (SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin'
    );

-- =============================================================================
-- STEP 3: CREATE TRIGGER FOR updated_at
-- =============================================================================

CREATE OR REPLACE FUNCTION update_super_admin_deck_reviews_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS super_admin_deck_reviews_updated_at ON super_admin_deck_reviews;

CREATE TRIGGER super_admin_deck_reviews_updated_at
    BEFORE UPDATE ON super_admin_deck_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_super_admin_deck_reviews_timestamp();

-- =============================================================================
-- SUCCESS! Table is ready for super admin review tracking.
-- =============================================================================
