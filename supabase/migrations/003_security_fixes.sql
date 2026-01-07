-- =============================================================================
-- ArrestDelta Security Fixes — Migration 003
-- Run this in Supabase SQL Editor AFTER previous migrations
-- =============================================================================

-- =============================================================================
-- FIX #1: Secure user_deck_access RLS policies
-- Remove overly permissive policies and replace with secure ones
-- =============================================================================

-- Drop the insecure policies
DROP POLICY IF EXISTS "Public read access for deck access" ON user_deck_access;
DROP POLICY IF EXISTS "Admin can manage deck access" ON user_deck_access;

-- Create secure read policy: Users can only view their own deck access
-- (matched via their email in the leads table)
CREATE POLICY "Users can view own deck access" ON user_deck_access
    FOR SELECT USING (
        lead_id IN (
            SELECT l.id FROM leads l 
            WHERE lower(l.email) = lower(auth.email())
        )
    );

-- Create secure admin policy: Only authenticated admin/owner users can manage access
CREATE POLICY "Admins can manage deck access" ON user_deck_access
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles p 
            WHERE p.id = auth.uid() 
            AND p.role IN ('owner', 'admin')
        )
    );

-- =============================================================================
-- FIX #2: Restrict project_tasks to authenticated users only
-- =============================================================================

-- Drop the public read policy
DROP POLICY IF EXISTS "Allow public read access" ON project_tasks;

-- Create secure read policy for authenticated users only
CREATE POLICY "Authenticated users can read tasks" ON project_tasks
    FOR SELECT USING (auth.role() = 'authenticated');

-- =============================================================================
-- SUCCESS!
-- Policies updated:
--   - user_deck_access: Now properly scoped to user's own data
--   - project_tasks: Now requires authentication to read
-- =============================================================================
