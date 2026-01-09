-- =============================================================================
-- ArrestDelta Super Admin Role — Migration 012
-- Run this in Supabase SQL Editor
-- =============================================================================

-- =============================================================================
-- STEP 1: UPDATE ROLE CONSTRAINT
-- =============================================================================

DO $$
BEGIN
    -- Drop existing constraint if it exists
    ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
    ALTER TABLE memberships DROP CONSTRAINT IF EXISTS memberships_role_check;

    -- Add new constraint including 'super_admin'
    ALTER TABLE profiles 
        ADD CONSTRAINT profiles_role_check 
        CHECK (role IN ('super_admin', 'owner', 'admin', 'analyst', 'viewer'));
        
    ALTER TABLE memberships 
        ADD CONSTRAINT memberships_role_check 
        CHECK (role IN ('super_admin', 'owner', 'admin', 'analyst', 'viewer'));

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error updating constraints: %', SQLERRM;
END $$;

-- =============================================================================
-- STEP 2: CREATE HELPER FUNCTION TO PROMOTE USER
-- =============================================================================

CREATE OR REPLACE FUNCTION set_super_admin(p_email TEXT)
RETURNS TEXT AS $$
DECLARE
    v_user_id UUID;
    v_current_role TEXT;
BEGIN
    -- Find user by email
    SELECT id INTO v_user_id 
    FROM auth.users 
    WHERE email = LOWER(TRIM(p_email));
    
    IF v_user_id IS NULL THEN
        RETURN 'user_not_found';
    END IF;
    
    -- Update profile
    UPDATE profiles 
    SET role = 'super_admin', updated_at = NOW()
    WHERE id = v_user_id
    RETURNING role INTO v_current_role;
    
    IF v_current_role = 'super_admin' THEN
        RETURN 'success';
    ELSE
        -- If update didn't happen (e.g. profile doesn't exist), try insert
        INSERT INTO profiles (id, name, role)
        VALUES (v_user_id, (SELECT raw_user_meta_data->>'name' FROM auth.users WHERE id = v_user_id), 'super_admin')
        ON CONFLICT (id) DO UPDATE SET role = 'super_admin';
        
        RETURN 'success_created';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- STEP 3: CREATE HELPER FUNCTION TO DEMOTE USER
-- =============================================================================

CREATE OR REPLACE FUNCTION remove_super_admin(p_email TEXT)
RETURNS TEXT AS $$
DECLARE
    v_user_id UUID;
BEGIN
    -- Find user by email
    SELECT id INTO v_user_id 
    FROM auth.users 
    WHERE email = LOWER(TRIM(p_email));
    
    IF v_user_id IS NULL THEN
        RETURN 'user_not_found';
    END IF;
    
    -- Update profile to default 'viewer'
    UPDATE profiles 
    SET role = 'viewer', updated_at = NOW()
    WHERE id = v_user_id;
    
    RETURN 'success';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- SUCCESS!
-- 
-- How to serve as Super Admin:
-- SELECT set_super_admin('your-email@example.com');
-- =============================================================================
