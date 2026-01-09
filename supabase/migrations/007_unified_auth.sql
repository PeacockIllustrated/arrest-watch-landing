-- =============================================================================
-- ArrestDelta Unified Auth Migration — Migration 007
-- Run this in Supabase SQL Editor
-- =============================================================================

-- =============================================================================
-- STEP 1: UPDATE user_deck_access TABLE
-- Add user_id column that references auth.users instead of leads.id
-- =============================================================================

-- Add user_id column (UUID) to reference Supabase Auth users
ALTER TABLE user_deck_access ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for faster lookups by user_id
CREATE INDEX IF NOT EXISTS idx_user_deck_access_user_id ON user_deck_access(user_id);

-- Create unique constraint to prevent duplicate deck access entries per user
-- (Only if the user_id is not null - legacy lead_id entries are still allowed)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'unique_user_deck_access'
    ) THEN
        ALTER TABLE user_deck_access ADD CONSTRAINT unique_user_deck_access UNIQUE (user_id, deck_id);
    END IF;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- =============================================================================
-- STEP 2: CREATE RLS POLICIES FOR user_deck_access
-- Allow users to read their own deck access
-- =============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own deck access" ON user_deck_access;
DROP POLICY IF EXISTS "Admins can manage deck access" ON user_deck_access;
DROP POLICY IF EXISTS "Public read for deck access" ON user_deck_access;

-- Enable RLS on user_deck_access if not already enabled
ALTER TABLE user_deck_access ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can read their own deck access
CREATE POLICY "Users can read own deck access" ON user_deck_access
    FOR SELECT
    USING (user_id = auth.uid());

-- Policy 2: Allow public read for admin dashboard (using anon key)
-- This is needed for the admin provisioning page to list existing access
CREATE POLICY "Public read for deck access" ON user_deck_access
    FOR SELECT
    USING (true);

-- Policy 3: Allow public insert/update/delete for admin operations
-- (Admin dashboard uses anon key, proper auth happens at app level)
CREATE POLICY "Public manage deck access" ON user_deck_access
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- =============================================================================
-- STEP 3: CREATE HELPER FUNCTIONS FOR PROVISIONING
-- =============================================================================

-- Function to grant deck access by email
-- Returns: 'success', 'user_not_found', or 'already_granted'
CREATE OR REPLACE FUNCTION grant_deck_access_by_email(
    p_email TEXT,
    p_deck_id TEXT,
    p_granted_by TEXT DEFAULT 'admin'
)
RETURNS TEXT AS $$
DECLARE
    v_user_id UUID;
    v_existing BOOLEAN;
BEGIN
    -- Normalize email and find user
    SELECT id INTO v_user_id 
    FROM auth.users 
    WHERE email = LOWER(TRIM(p_email));
    
    IF v_user_id IS NULL THEN
        RETURN 'user_not_found';
    END IF;
    
    -- Check if access already exists
    SELECT EXISTS(
        SELECT 1 FROM user_deck_access 
        WHERE user_id = v_user_id AND deck_id = p_deck_id
    ) INTO v_existing;
    
    IF v_existing THEN
        RETURN 'already_granted';
    END IF;
    
    -- Grant access
    INSERT INTO user_deck_access (user_id, deck_id, granted_by)
    VALUES (v_user_id, p_deck_id, p_granted_by);
    
    RETURN 'success';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to revoke deck access by email
CREATE OR REPLACE FUNCTION revoke_deck_access_by_email(
    p_email TEXT,
    p_deck_id TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    v_user_id UUID;
BEGIN
    -- Find user by email
    SELECT id INTO v_user_id 
    FROM auth.users 
    WHERE email = LOWER(TRIM(p_email));
    
    IF v_user_id IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Revoke access
    DELETE FROM user_deck_access 
    WHERE user_id = v_user_id AND deck_id = p_deck_id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get all deck access for a user by email
CREATE OR REPLACE FUNCTION get_user_deck_access(p_email TEXT)
RETURNS TABLE (deck_id TEXT, granted_at TIMESTAMPTZ, granted_by TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT uda.deck_id, uda.granted_at, uda.granted_by
    FROM user_deck_access uda
    INNER JOIN auth.users u ON uda.user_id = u.id
    WHERE u.email = LOWER(TRIM(p_email));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if a user exists by email
CREATE OR REPLACE FUNCTION check_user_exists(p_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS(
        SELECT 1 FROM auth.users WHERE email = LOWER(TRIM(p_email))
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- STEP 4: UPDATE profiles TABLE INSERT POLICY
-- Allow profile creation during signup
-- =============================================================================

-- Drop and recreate the insert policy for profiles
DROP POLICY IF EXISTS "profile_insert_own" ON profiles;
CREATE POLICY "profile_insert_own" ON profiles
    FOR INSERT
    WITH CHECK (id = auth.uid());

-- =============================================================================
-- SUCCESS!
-- 
-- Changes made:
-- 1. Added user_id column to user_deck_access (references auth.users)
-- 2. Created RLS policies for user_deck_access
-- 3. Created helper functions for provisioning:
--    - grant_deck_access_by_email(email, deck_id, granted_by)
--    - revoke_deck_access_by_email(email, deck_id)
--    - get_user_deck_access(email)
--    - check_user_exists(email)
-- 4. Updated profiles insert policy
--
-- Next steps:
-- 1. Run the migration script to migrate existing leads users
-- 2. Update the frontend to use Supabase Auth
-- =============================================================================
