-- =============================================================================
-- ArrestDelta Get Recent Users Function — Migration 011
-- Run this in Supabase SQL Editor
-- =============================================================================

-- Create a function to get recent users with their emails and deck access
-- This function uses SECURITY DEFINER to access auth.users
CREATE OR REPLACE FUNCTION get_recent_users_with_access(p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
    user_id UUID,
    email TEXT,
    name TEXT,
    created_at TIMESTAMPTZ,
    deck_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id as user_id,
        u.email::TEXT as email,
        p.name as name,
        p.created_at as created_at,
        COALESCE(COUNT(uda.deck_id), 0) as deck_count
    FROM auth.users u
    LEFT JOIN profiles p ON u.id = p.id
    LEFT JOIN user_deck_access uda ON u.id = uda.user_id
    GROUP BY u.id, u.email, p.name, p.created_at
    ORDER BY p.created_at DESC NULLS LAST
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- SUCCESS!
-- Call this with: SELECT * FROM get_recent_users_with_access(10);
-- =============================================================================
