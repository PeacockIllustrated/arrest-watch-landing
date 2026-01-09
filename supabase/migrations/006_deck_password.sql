-- =============================================================================
-- ArrestDelta Deck Password Authentication — Migration 006
-- Run this in Supabase SQL Editor
-- =============================================================================

-- Add password column to leads table for deck hub authentication
-- NOTE: For early launch MVP only. In production, use proper bcrypt hashing.

ALTER TABLE leads ADD COLUMN IF NOT EXISTS password TEXT;

-- Create index for faster email+password lookups
CREATE INDEX IF NOT EXISTS idx_leads_email_password ON leads(email, password);

-- =============================================================================
-- SUCCESS!
-- The leads table now supports password authentication for deck access.
-- Admins can set passwords when provisioning investors.
-- =============================================================================
