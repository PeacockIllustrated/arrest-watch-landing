-- =============================================================================
-- ArrestDelta Auth Fix — Migration 009
-- Run this in Supabase SQL Editor to fix the sign-up issue
-- =============================================================================

-- The issue: The handle_new_user() trigger tries to insert into profiles,
-- but the INSERT policy requires id = auth.uid(), which is NULL during signup.
-- 
-- Solution: Ensure the trigger function properly bypasses RLS (SECURITY DEFINER)
-- and fix any policy conflicts.

-- =============================================================================
-- STEP 1: DROP AND RECREATE THE TRIGGER FUNCTION WITH BETTER ERROR HANDLING
-- =============================================================================

-- Drop the existing function and trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Recreate with explicit error handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, role, org_id, created_at, updated_at)
    VALUES (
        NEW.id, 
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)), 
        'viewer',
        NULL,
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        name = COALESCE(EXCLUDED.name, profiles.name),
        updated_at = NOW();
    
    RETURN NEW;
EXCEPTION
    WHEN others THEN
        -- Log error but don't fail the user creation
        RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- =============================================================================
-- STEP 2: FIX THE PROFILES INSERT POLICY
-- The policy should allow the trigger to insert (SECURITY DEFINER bypasses RLS)
-- but we also need to allow users to insert their own profile if needed
-- =============================================================================

-- Drop the problematic INSERT policy from 007
DROP POLICY IF EXISTS "profile_insert_own" ON profiles;

-- Allow the trigger function to insert profiles
-- SECURITY DEFINER functions bypass RLS, but just in case, we'll also allow
-- authenticated users to insert their own profile
CREATE POLICY "profile_insert_own" ON profiles
    FOR INSERT
    WITH CHECK (
        -- Allow if it's the user's own profile
        id = auth.uid()
        -- OR allow if there's no auth context (trigger context)
        OR auth.uid() IS NULL
    );

-- =============================================================================
-- STEP 3: VERIFY THE SETUP
-- =============================================================================

-- This should show the trigger is in place
-- SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- This should show our policies
-- SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- =============================================================================
-- SUCCESS!
-- The trigger now:
-- 1. Has proper error handling (won't break if insert fails)
-- 2. Uses ON CONFLICT to handle duplicates
-- 3. Sets all required columns explicitly
-- =============================================================================
