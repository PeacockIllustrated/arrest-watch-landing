-- =============================================================================
-- ArrestDelta Leads Migration Template — Migration 008
-- 
-- PURPOSE: Migrate existing leads table users to Supabase Auth
-- 
-- INSTRUCTIONS:
-- 1. First, run 007_unified_auth.sql to set up the new schema
-- 2. Fill in the user details below for each lead you want to migrate
-- 3. Run this script in Supabase SQL Editor
-- 4. Share the new password with each user (they should change it after first login)
--
-- NOTE: Supabase Auth requires users to be created via the Admin API or
-- the auth.users table cannot be directly inserted into for security reasons.
-- Instead, use the Supabase Dashboard OR the Admin API.
--
-- RECOMMENDED APPROACH:
-- 1. Use Supabase Dashboard → Authentication → Users → "Add user"
-- 2. Then run the deck access migration below
-- =============================================================================

-- =============================================================================
-- STEP 1: CREATE USERS VIA SUPABASE DASHBOARD
-- 
-- Go to: Supabase Dashboard → Authentication → Users → "Add user"
-- For each existing lead, create a user with:
--   - Email: (their email from leads table)
--   - Password: (generate a new secure password OR use their existing one)
--   - Email confirm: Check the box to auto-confirm
--
-- After creating users, copy their UUIDs for Step 2 below.
-- =============================================================================

-- =============================================================================
-- STEP 2: VIEW EXISTING LEADS TO MIGRATE
-- Run this query to see all leads with passwords (i.e., provisioned users)
-- =============================================================================

-- Uncomment to view leads that need migration:
-- SELECT id, email, name, organization, created_at
-- FROM leads
-- WHERE password IS NOT NULL
-- ORDER BY created_at DESC;

-- =============================================================================
-- STEP 3: MIGRATE DECK ACCESS
-- After creating auth users, migrate their deck access from lead_id to user_id
-- 
-- Replace the email addresses below with actual leads to migrate
-- =============================================================================

-- Template for migrating deck access from leads to auth.users
-- Repeat this block for each user

/*
-- Example: Migrate user "investor@example.com"
DO $$
DECLARE
    v_user_id UUID;
    v_lead_id BIGINT;
BEGIN
    -- Find the new auth user
    SELECT id INTO v_user_id FROM auth.users WHERE email = 'investor@example.com';
    
    -- Find the old lead
    SELECT id INTO v_lead_id FROM leads WHERE email = 'investor@example.com';
    
    IF v_user_id IS NOT NULL AND v_lead_id IS NOT NULL THEN
        -- Copy deck access from lead_id to user_id
        INSERT INTO user_deck_access (user_id, deck_id, granted_by, granted_at)
        SELECT v_user_id, deck_id, granted_by, granted_at
        FROM user_deck_access
        WHERE lead_id = v_lead_id
        ON CONFLICT (user_id, deck_id) DO NOTHING;
        
        RAISE NOTICE 'Migrated deck access for: investor@example.com';
    ELSE
        RAISE WARNING 'Could not find user or lead for: investor@example.com';
    END IF;
END $$;
*/

-- =============================================================================
-- STEP 4: BULK MIGRATION (ALTERNATIVE)
-- If you've created all auth users with the SAME emails as leads,
-- run this to migrate all deck access at once
-- =============================================================================

/*
-- Bulk migrate all deck access where lead email matches auth user email
INSERT INTO user_deck_access (user_id, deck_id, granted_by, granted_at)
SELECT 
    u.id as user_id,
    uda.deck_id,
    uda.granted_by,
    uda.granted_at
FROM user_deck_access uda
INNER JOIN leads l ON uda.lead_id = l.id
INNER JOIN auth.users u ON LOWER(l.email) = LOWER(u.email)
WHERE uda.user_id IS NULL  -- Only migrate entries not yet migrated
ON CONFLICT (user_id, deck_id) DO NOTHING;
*/

-- =============================================================================
-- STEP 5: VERIFY MIGRATION
-- Run these queries to verify the migration was successful
-- =============================================================================

-- Uncomment to check migrated users:
-- SELECT 
--     u.email,
--     COUNT(uda.deck_id) as deck_count,
--     ARRAY_AGG(uda.deck_id) as decks
-- FROM auth.users u
-- LEFT JOIN user_deck_access uda ON u.id = uda.user_id
-- GROUP BY u.email
-- ORDER BY u.email;

-- =============================================================================
-- STEP 6: CLEANUP (OPTIONAL - DO THIS LAST)
-- After confirming everything works, you may optionally:
-- 1. Remove the lead_id column from user_deck_access
-- 2. Archive or delete the leads table entries with passwords
-- 
-- WARNING: Only do this after thorough testing!
-- =============================================================================

/*
-- Remove old lead_id references (OPTIONAL - DESTRUCTIVE)
-- ALTER TABLE user_deck_access DROP COLUMN lead_id;

-- Archive provisioned leads (OPTIONAL)
-- CREATE TABLE leads_archive AS SELECT * FROM leads WHERE password IS NOT NULL;
-- DELETE FROM leads WHERE password IS NOT NULL;
*/

-- =============================================================================
-- SUCCESS CHECKLIST:
-- [ ] All provisioned leads have corresponding auth.users entries
-- [ ] All deck access entries have been migrated to use user_id
-- [ ] Users can log in with their new credentials
-- [ ] Users can access their previously granted decks
-- =============================================================================
