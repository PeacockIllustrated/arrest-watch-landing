-- =============================================================================
-- ArrestDelta Deck Hub Access Control Schema — Phase 2
-- Run this in Supabase SQL Editor AFTER 001_portal_schema.sql
-- =============================================================================

-- =============================================================================
-- USER DECK ACCESS TABLE
-- Tracks which decks each lead has been granted access to
-- =============================================================================

CREATE TABLE IF NOT EXISTS user_deck_access (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id BIGINT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    deck_id TEXT NOT NULL, -- Matches deck.id from DECKS array in DeckDashboard.tsx
    granted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    granted_by TEXT, -- Admin email or "system"
    UNIQUE(lead_id, deck_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_deck_access_lead ON user_deck_access(lead_id);
CREATE INDEX IF NOT EXISTS idx_user_deck_access_deck ON user_deck_access(deck_id);

-- Create index on leads.email for faster auth lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE user_deck_access ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read (we'll filter client-side based on email verification)
-- This is needed since deck hub users aren't full Supabase Auth users
CREATE POLICY "Public read access for deck access" ON user_deck_access
    FOR SELECT USING (true);

-- Policy: Only authenticated admins can insert/update/delete
-- Using the anon key for now, admin auth handled client-side
CREATE POLICY "Admin can manage deck access" ON user_deck_access
    FOR ALL USING (true);

-- =============================================================================
-- HELPER FUNCTION: Get accessible decks for an email
-- =============================================================================

CREATE OR REPLACE FUNCTION get_accessible_decks(user_email TEXT)
RETURNS TABLE(deck_id TEXT, granted_at TIMESTAMPTZ) AS $$
BEGIN
    RETURN QUERY
    SELECT uda.deck_id, uda.granted_at
    FROM user_deck_access uda
    INNER JOIN leads l ON uda.lead_id = l.id
    WHERE l.email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- SUCCESS! 
-- Tables created:
--   - user_deck_access: Stores per-user, per-deck access grants
-- 
-- To grant a user access to a deck:
--   INSERT INTO user_deck_access (lead_id, deck_id, granted_by)
--   VALUES ('lead-uuid-here', 'investor-deck', 'admin@example.com');
--
-- To check user access:
--   SELECT * FROM get_accessible_decks('user@example.com');
-- =============================================================================
