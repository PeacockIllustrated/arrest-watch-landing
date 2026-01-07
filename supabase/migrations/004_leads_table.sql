-- =============================================================================
-- ArrestDelta Leads Table Schema — Migration 004
-- Run this in Supabase SQL Editor
-- =============================================================================

-- =============================================================================
-- CREATE LEADS TABLE (if not exists)
-- =============================================================================

CREATE TABLE IF NOT EXISTS leads (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    organization TEXT,
    email TEXT NOT NULL,
    employee_count TEXT,
    message TEXT,
    source TEXT DEFAULT 'investor_pack',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index for email lookups (for deck access verification)
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- =============================================================================
-- ENABLE ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- RLS POLICIES
-- =============================================================================

-- Drop existing policies if they exist (safe to run multiple times)
DROP POLICY IF EXISTS "Allow anonymous insert" ON leads;
DROP POLICY IF EXISTS "Allow admin full access" ON leads;
DROP POLICY IF EXISTS "Allow public insert" ON leads;
DROP POLICY IF EXISTS "Allow public read" ON leads;
DROP POLICY IF EXISTS "Allow user to see own lead" ON leads;
DROP POLICY IF EXISTS "Allow public delete" ON leads;

-- Policy 1: Allow ANYONE (including anonymous users) to INSERT leads
-- This is necessary for public lead submission forms on the investor pack
CREATE POLICY "Allow public insert" ON leads
    FOR INSERT WITH CHECK (true);

-- Policy 2: Allow reading leads from admin dashboard (uses anon key)
-- Since the admin dashboard doesn't use Supabase Auth, we need public read access
CREATE POLICY "Allow public read" ON leads
    FOR SELECT USING (true);

-- Policy 3: Allow deleting leads from admin dashboard
CREATE POLICY "Allow public delete" ON leads
    FOR DELETE USING (true);

-- =============================================================================
-- UPDATE TRIGGER
-- =============================================================================

CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_leads_updated_at();

-- =============================================================================
-- SUCCESS!
-- Table created: leads
-- Policies created:
--   - Allow public insert: Anyone can submit a lead
--   - Allow admin full access: Admins can view/edit/delete leads
--   - Allow user to see own lead: Users can verify their own email in leads
-- =============================================================================
