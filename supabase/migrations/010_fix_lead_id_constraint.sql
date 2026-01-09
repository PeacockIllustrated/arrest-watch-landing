-- =============================================================================
-- ArrestDelta Fix lead_id Constraint — Migration 010
-- Run this in Supabase SQL Editor
-- =============================================================================

-- The issue: user_deck_access.lead_id is NOT NULL but our new system uses user_id
-- Solution: Make lead_id nullable since we're transitioning to user_id

-- Make lead_id nullable
ALTER TABLE user_deck_access ALTER COLUMN lead_id DROP NOT NULL;

-- Verify the change
-- SELECT column_name, is_nullable FROM information_schema.columns 
-- WHERE table_name = 'user_deck_access' AND column_name = 'lead_id';

-- =============================================================================
-- SUCCESS! 
-- The lead_id column is now nullable, allowing the new user_id-based provisioning
-- =============================================================================
