-- =============================================================================
-- ArrestDelta Fix RLS Recursion — Migration 013
-- Run this in Supabase SQL Editor to fix "infinite recursion" errors
-- =============================================================================

-- =============================================================================
-- STEP 1: CREATE SECURITY DEFINER FUNCTIONS
-- These functions bypass RLS constraints to safely look up user data
-- without triggering infinite loops in policies.
-- =============================================================================

-- Function to check if the current user is a super_admin
CREATE OR REPLACE FUNCTION auth_is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role = 'super_admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get the current user's organization ID
CREATE OR REPLACE FUNCTION auth_get_org_id()
RETURNS UUID AS $$
BEGIN
    RETURN (
        SELECT org_id FROM profiles 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- STEP 2: FIX PROFILES POLICIES
-- Drop potentially recursive policies and replace with safe function calls
-- =============================================================================

DROP POLICY IF EXISTS "profile_select_org" ON profiles;

-- Allow users to view profiles in their own organization (fixed)
CREATE POLICY "profile_select_org" ON profiles
    FOR SELECT
    USING (org_id = auth_get_org_id());

-- Allow super_admin to view ALL profiles
DROP POLICY IF EXISTS "super_admin_read_all" ON profiles;
CREATE POLICY "super_admin_read_all" ON profiles
    FOR SELECT
    USING (auth_is_super_admin());

-- =============================================================================
-- STEP 3: SUCCESS
-- =============================================================================
