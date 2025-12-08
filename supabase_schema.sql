-- Create the project_tasks table if it doesn't exist
CREATE TABLE IF NOT EXISTS project_tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending', -- pending, in_progress, completed
    phase TEXT DEFAULT 'Ad-hoc', -- Phase 1, Phase 2, etc. OR 'Ad-hoc' for dev tasks
    order_index INTEGER DEFAULT 0,
    technical_details JSONB -- Stores assignee, priority, category, etc.
);

-- Enable Row Level Security (RLS)
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies (Adjust based on your auth needs)
-- Allow read access to everyone (or authenticated users)
CREATE POLICY "Allow public read access" ON project_tasks
    FOR SELECT USING (true);

-- Allow authenticated users (admins) to insert/update/delete
CREATE POLICY "Allow authenticated insert" ON project_tasks
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON project_tasks
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON project_tasks
    FOR DELETE USING (auth.role() = 'authenticated');

-- Optional: Create an index for Phase to speed up filtering
CREATE INDEX IF NOT EXISTS idx_project_tasks_phase ON project_tasks(phase);
