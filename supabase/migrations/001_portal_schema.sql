-- =============================================================================
-- ArrestDelta Portal Schema — Phase 1
-- Run this ENTIRE file in Supabase SQL Editor
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- STEP 1: DROP EXISTING TABLES (CASCADE removes triggers/policies)
-- =============================================================================

DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS alerts CASCADE;
DROP TABLE IF EXISTS watchlist_items CASCADE;
DROP TABLE IF EXISTS watchlists CASCADE;
DROP TABLE IF EXISTS entities CASCADE;
DROP TABLE IF EXISTS memberships CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS organisations CASCADE;

-- Drop functions separately
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at() CASCADE;

-- =============================================================================
-- STEP 2: CREATE ALL TABLES
-- =============================================================================

CREATE TABLE organisations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT,
    role TEXT DEFAULT 'viewer' CHECK (role IN ('owner', 'admin', 'analyst', 'viewer')),
    org_id UUID REFERENCES organisations(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE memberships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    org_id UUID REFERENCES organisations(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT DEFAULT 'viewer' CHECK (role IN ('owner', 'admin', 'analyst', 'viewer')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(org_id, user_id)
);

CREATE TABLE entities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    org_id UUID REFERENCES organisations(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('person', 'vehicle', 'location')),
    display_name TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE watchlists (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    org_id UUID REFERENCES organisations(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE watchlist_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    watchlist_id UUID REFERENCES watchlists(id) ON DELETE CASCADE NOT NULL,
    entity_id UUID REFERENCES entities(id) ON DELETE CASCADE NOT NULL,
    added_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(watchlist_id, entity_id)
);

CREATE TABLE alerts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    org_id UUID REFERENCES organisations(id) ON DELETE CASCADE NOT NULL,
    entity_id UUID REFERENCES entities(id) ON DELETE SET NULL,
    severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'acknowledged', 'resolved')),
    alert_type TEXT NOT NULL,
    message TEXT,
    payload JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    acknowledged_at TIMESTAMPTZ,
    acknowledged_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    resolved_at TIMESTAMPTZ,
    resolved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE TABLE audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    org_id UUID REFERENCES organisations(id) ON DELETE CASCADE NOT NULL,
    actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id UUID,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =============================================================================
-- STEP 3: CREATE INDEXES
-- =============================================================================

CREATE INDEX idx_profiles_org ON profiles(org_id);
CREATE INDEX idx_entities_org_type ON entities(org_id, type);
CREATE INDEX idx_entities_display_name ON entities(display_name);
CREATE INDEX idx_watchlists_org ON watchlists(org_id);
CREATE INDEX idx_watchlist_items_watchlist ON watchlist_items(watchlist_id);
CREATE INDEX idx_watchlist_items_entity ON watchlist_items(entity_id);
CREATE INDEX idx_alerts_org_status ON alerts(org_id, status);
CREATE INDEX idx_alerts_entity ON alerts(entity_id);
CREATE INDEX idx_alerts_created ON alerts(created_at DESC);
CREATE INDEX idx_audit_logs_org ON audit_logs(org_id);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- =============================================================================
-- STEP 4: ENABLE RLS
-- =============================================================================

ALTER TABLE organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- STEP 5: CREATE RLS POLICIES
-- =============================================================================

-- Organisations
CREATE POLICY "org_select" ON organisations FOR SELECT 
    USING (id IN (SELECT p.org_id FROM profiles p WHERE p.id = auth.uid()));

-- Profiles  
CREATE POLICY "profile_select_own" ON profiles FOR SELECT 
    USING (id = auth.uid());

CREATE POLICY "profile_select_org" ON profiles FOR SELECT 
    USING (org_id IN (SELECT p.org_id FROM profiles p WHERE p.id = auth.uid()));

CREATE POLICY "profile_update_own" ON profiles FOR UPDATE 
    USING (id = auth.uid());

-- Memberships
CREATE POLICY "membership_select" ON memberships FOR SELECT 
    USING (user_id = auth.uid());

-- Entities
CREATE POLICY "entity_select" ON entities FOR SELECT 
    USING (org_id IN (SELECT p.org_id FROM profiles p WHERE p.id = auth.uid()));

CREATE POLICY "entity_insert" ON entities FOR INSERT 
    WITH CHECK (org_id IN (
        SELECT p.org_id FROM profiles p 
        WHERE p.id = auth.uid() AND p.role IN ('owner', 'admin', 'analyst')
    ));

-- Watchlists
CREATE POLICY "watchlist_select" ON watchlists FOR SELECT 
    USING (org_id IN (SELECT p.org_id FROM profiles p WHERE p.id = auth.uid()));

CREATE POLICY "watchlist_all" ON watchlists FOR ALL 
    USING (org_id IN (
        SELECT p.org_id FROM profiles p 
        WHERE p.id = auth.uid() AND p.role IN ('owner', 'admin', 'analyst')
    ));

-- Watchlist Items
CREATE POLICY "watchlist_item_select" ON watchlist_items FOR SELECT 
    USING (watchlist_id IN (
        SELECT w.id FROM watchlists w WHERE w.org_id IN (
            SELECT p.org_id FROM profiles p WHERE p.id = auth.uid()
        )
    ));

-- Alerts
CREATE POLICY "alert_select" ON alerts FOR SELECT 
    USING (org_id IN (SELECT p.org_id FROM profiles p WHERE p.id = auth.uid()));

CREATE POLICY "alert_update" ON alerts FOR UPDATE 
    USING (org_id IN (
        SELECT p.org_id FROM profiles p 
        WHERE p.id = auth.uid() AND p.role IN ('owner', 'admin', 'analyst')
    ));

-- Audit Logs
CREATE POLICY "audit_select" ON audit_logs FOR SELECT 
    USING (org_id IN (
        SELECT p.org_id FROM profiles p 
        WHERE p.id = auth.uid() AND p.role IN ('owner', 'admin')
    ));

CREATE POLICY "audit_insert" ON audit_logs FOR INSERT 
    WITH CHECK (true);

-- =============================================================================
-- STEP 6: FUNCTIONS AND TRIGGERS
-- =============================================================================

CREATE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, name, role)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), 'viewer');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

CREATE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_organisations_updated_at
    BEFORE UPDATE ON organisations FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_entities_updated_at
    BEFORE UPDATE ON entities FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_watchlists_updated_at
    BEFORE UPDATE ON watchlists FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================================
-- SUCCESS! Next steps:
-- 1. Go to Authentication → Users → Add user (email + password)
-- 2. Run this to make yourself admin:
--    SELECT id, email FROM auth.users;
--    UPDATE profiles SET role = 'admin' WHERE id = 'paste-your-id-here';
-- =============================================================================
