-- Migration: Add table for tracking deck read status per user
-- This enables the "mark as read" checkmark feature in the Data Room

-- Create the user_deck_read_status table
CREATE TABLE IF NOT EXISTS user_deck_read_status (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    deck_id TEXT NOT NULL,
    opened_at TIMESTAMPTZ DEFAULT NOW(),  -- When deck was first opened
    marked_read_at TIMESTAMPTZ,           -- When user marked as read (nullable)
    PRIMARY KEY (user_id, deck_id)
);

-- Add index for faster lookups by user
CREATE INDEX IF NOT EXISTS idx_deck_read_status_user_id 
    ON user_deck_read_status(user_id);

-- Enable Row Level Security
ALTER TABLE user_deck_read_status ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only SELECT their own read status
CREATE POLICY "Users can view own read status"
    ON user_deck_read_status
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Users can only INSERT their own read status
CREATE POLICY "Users can insert own read status"
    ON user_deck_read_status
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only UPDATE their own read status
CREATE POLICY "Users can update own read status"
    ON user_deck_read_status
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only DELETE their own read status
CREATE POLICY "Users can delete own read status"
    ON user_deck_read_status
    FOR DELETE
    USING (auth.uid() = user_id);

-- Grant access to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON user_deck_read_status TO authenticated;
