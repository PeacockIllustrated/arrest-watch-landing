-- Migration: Admin RPC functions for managing user deck read status
-- This allows super_admins to view and toggle deck read status for any user

-- =============================================================================
-- RPC: Get user's deck read status by email (admin only)
-- =============================================================================
CREATE OR REPLACE FUNCTION get_user_deck_read_status_by_email(p_email TEXT)
RETURNS TABLE (
    deck_id TEXT,
    opened_at TIMESTAMPTZ,
    marked_read_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_caller_role TEXT;
BEGIN
    -- Check if caller is super_admin
    SELECT role INTO v_caller_role
    FROM profiles
    WHERE id = auth.uid();
    
    IF v_caller_role IS NULL OR v_caller_role != 'super_admin' THEN
        RAISE EXCEPTION 'Access denied: super_admin role required';
    END IF;
    
    -- Find user by email
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE LOWER(email) = LOWER(p_email);
    
    IF v_user_id IS NULL THEN
        RETURN; -- Return empty if user not found
    END IF;
    
    -- Return their deck read statuses
    RETURN QUERY
    SELECT 
        udrs.deck_id,
        udrs.opened_at,
        udrs.marked_read_at
    FROM user_deck_read_status udrs
    WHERE udrs.user_id = v_user_id;
END;
$$;

-- =============================================================================
-- RPC: Toggle user's deck read status (admin only)
-- =============================================================================
CREATE OR REPLACE FUNCTION admin_toggle_deck_read_status(
    p_email TEXT,
    p_deck_id TEXT,
    p_mark_as_read BOOLEAN
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_caller_role TEXT;
    v_current_status RECORD;
BEGIN
    -- Check if caller is super_admin
    SELECT role INTO v_caller_role
    FROM profiles
    WHERE id = auth.uid();
    
    IF v_caller_role IS NULL OR v_caller_role != 'super_admin' THEN
        RAISE EXCEPTION 'Access denied: super_admin role required';
    END IF;
    
    -- Find user by email
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE LOWER(email) = LOWER(p_email);
    
    IF v_user_id IS NULL THEN
        RETURN 'user_not_found';
    END IF;
    
    -- Check if deck has been opened
    SELECT * INTO v_current_status
    FROM user_deck_read_status
    WHERE user_id = v_user_id AND deck_id = p_deck_id;
    
    IF v_current_status IS NULL THEN
        -- Deck not opened yet - create entry if marking as read
        IF p_mark_as_read THEN
            INSERT INTO user_deck_read_status (user_id, deck_id, opened_at, marked_read_at)
            VALUES (v_user_id, p_deck_id, NOW(), NOW());
            RETURN 'marked_read';
        ELSE
            RETURN 'not_opened';
        END IF;
    ELSE
        -- Update existing entry
        IF p_mark_as_read THEN
            UPDATE user_deck_read_status
            SET marked_read_at = NOW()
            WHERE user_id = v_user_id AND deck_id = p_deck_id;
            RETURN 'marked_read';
        ELSE
            UPDATE user_deck_read_status
            SET marked_read_at = NULL
            WHERE user_id = v_user_id AND deck_id = p_deck_id;
            RETURN 'marked_unread';
        END IF;
    END IF;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_user_deck_read_status_by_email(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION admin_toggle_deck_read_status(TEXT, TEXT, BOOLEAN) TO authenticated;
