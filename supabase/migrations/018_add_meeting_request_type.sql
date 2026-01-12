-- =============================================================================
-- Migration 018: Add 'meeting_request' to admin_notifications type
-- =============================================================================

-- Drop the existing check constraint
ALTER TABLE admin_notifications 
DROP CONSTRAINT IF EXISTS admin_notifications_type_check;

-- Add the new check constraint including 'meeting_request'
ALTER TABLE admin_notifications 
ADD CONSTRAINT admin_notifications_type_check 
CHECK (type IN ('new_signup', 'deck_access_request', 'system', 'meeting_request'));

-- Create RPC function to request a meeting
CREATE OR REPLACE FUNCTION request_meeting(message TEXT DEFAULT NULL)
RETURNS TEXT AS $$
DECLARE
    v_user_id UUID;
    v_user_email TEXT;
BEGIN
    -- Get current user
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RETURN 'unauthorized';
    END IF;

    SELECT email INTO v_user_email FROM auth.users WHERE id = v_user_id;

    INSERT INTO admin_notifications (type, title, message, user_id, user_email, metadata)
    VALUES (
        'meeting_request',
        'Book Meeting Request',
        COALESCE(message, 'User requested to book a meeting'),
        v_user_id,
        v_user_email,
        jsonb_build_object('source', 'deck_dashboard')
    );

    RETURN 'success';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
