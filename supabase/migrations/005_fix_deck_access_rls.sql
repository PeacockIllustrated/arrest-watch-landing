-- =============================================================================
-- ArrestDelta Fix Deck Access RLS — Migration 005
-- Run this in Supabase SQL Editor to fix admin dashboard deck access
-- =============================================================================

-- =============================================================================
-- FIX: Update user_deck_access RLS policies for admin dashboard
-- The admin dashboard uses the anon key without Supabase Auth, so we need
-- to allow public access for CRUD operations on this table.
-- =============================================================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own deck access" ON user_deck_access;
DROP POLICY IF EXISTS "Admins can manage deck access" ON user_deck_access;
DROP POLICY IF EXISTS "Public deck access read" ON user_deck_access;
DROP POLICY IF EXISTS "Public deck access insert" ON user_deck_access;
DROP POLICY IF EXISTS "Public deck access delete" ON user_deck_access;

-- Policy 1: Allow public SELECT (for both admin dashboard and deck hub auth)
CREATE POLICY "Public deck access read" ON user_deck_access
    FOR SELECT USING (true);

-- Policy 2: Allow public INSERT (for admin dashboard to grant access)
CREATE POLICY "Public deck access insert" ON user_deck_access
    FOR INSERT WITH CHECK (true);

-- Policy 3: Allow public DELETE (for admin dashboard to revoke access)
CREATE POLICY "Public deck access delete" ON user_deck_access
    FOR DELETE USING (true);

-- =============================================================================
-- SUCCESS!
-- The admin dashboard can now manage deck access permissions.
-- =============================================================================
