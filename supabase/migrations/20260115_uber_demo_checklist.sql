-- Migration: Setup Uber Demo Checklist in Tasks Tab
-- Description: Clears existing Ad-hoc tasks and populates the table with the Uber Demo flow steps.

-- 1. Clear existing Ad-hoc tasks to start fresh
DELETE FROM project_tasks WHERE phase = 'Ad-hoc';

-- 2. Insert Uber Demo Checklist steps
-- Note: TasksPage.tsx sorts by created_at DESC (Newest First).
-- To get Step 1 at the top, it must be the newest (inserted last).
-- To get Step 10 at the bottom, it must be the oldest (inserted first).

-- Step 10
INSERT INTO project_tasks (title, description, status, phase, created_at, technical_details)
VALUES (
    'Flip Sim Mode ON (burst realistic arrests)',
    'Activate the simulation engine to generate burst traffic of realistic arrest events for load testing.',
    'pending',
    'Ad-hoc',
    NOW() - INTERVAL '9 minutes',
    '{"priority": "medium", "category": "technical", "assignee": "me"}'
);

-- Step 9
INSERT INTO project_tasks (title, description, status, phase, created_at, technical_details)
VALUES (
    'Mark Reviewed / Escalated (audit log written)',
    'Manual review step to verify that audit logs are correctly written when an agent takes action.',
    'pending',
    'Ad-hoc',
    NOW() - INTERVAL '8 minutes',
    '{"priority": "medium", "category": "general", "assignee": "me"}'
);

-- Step 8
INSERT INTO project_tasks (title, description, status, phase, created_at, technical_details)
VALUES (
    'Click-through evidence: raw snapshot + parsed fields',
    'Verify that the UI correctly links the parsed record back to the immutable raw snapshot.',
    'pending',
    'Ad-hoc',
    NOW() - INTERVAL '7 minutes',
    '{"priority": "high", "category": "technical", "assignee": "me"}'
);

-- Step 7
INSERT INTO project_tasks (title, description, status, phase, created_at, technical_details)
VALUES (
    'Surface alert in dashboard (live feed)',
    'Check that high-confidence changes appear immediately in the admin alerts feed.',
    'pending',
    'Ad-hoc',
    NOW() - INTERVAL '6 minutes',
    '{"priority": "high", "category": "technical", "assignee": "me"}'
);

-- Step 6
INSERT INTO project_tasks (title, description, status, phase, created_at, technical_details)
VALUES (
    'Compute confidence score + top reasons',
    'Run the confidence scoring engine and verify that explainable reasons are attached to the payload.',
    'pending',
    'Ad-hoc',
    NOW() - INTERVAL '5 minutes',
    '{"priority": "critical", "category": "technical", "assignee": "me"}'
);

-- Step 5
INSERT INTO project_tasks (title, description, status, phase, created_at, technical_details)
VALUES (
    'Emit a verified Change Event (before/after)',
    'Ensure the delta engine correctly emits a structured change event with before/after states.',
    'pending',
    'Ad-hoc',
    NOW() - INTERVAL '4 minutes',
    '{"priority": "critical", "category": "technical", "assignee": "me"}'
);

-- Step 4
INSERT INTO project_tasks (title, description, status, phase, created_at, technical_details)
VALUES (
    'Diff latest vs previous snapshot',
    'Execute the diffing algorithm between the new capture and the previous version.',
    'pending',
    'Ad-hoc',
    NOW() - INTERVAL '3 minutes',
    '{"priority": "high", "category": "technical", "assignee": "me"}'
);

-- Step 3
INSERT INTO project_tasks (title, description, status, phase, created_at, technical_details)
VALUES (
    'Parse into canonical fields (versioned parser)',
    'Test individual field extraction using the versioned parser schema.',
    'pending',
    'Ad-hoc',
    NOW() - INTERVAL '2 minutes',
    '{"priority": "high", "category": "technical", "assignee": "me"}'
);

-- Step 2
INSERT INTO project_tasks (title, description, status, phase, created_at, technical_details)
VALUES (
    'Capture raw snapshots (HTML/PDF/text) every run',
    'Verify that the scraper layer is correctly storing raw evidence formats for provenance.',
    'pending',
    'Ad-hoc',
    NOW() - INTERVAL '1 minutes',
    '{"priority": "high", "category": "technical", "assignee": "me"}'
);

-- Step 1 (Newest - appears first)
INSERT INTO project_tasks (title, description, status, phase, created_at, technical_details)
VALUES (
    'Pick 2 jurisdictions (1 easy, 1 hard)',
    'Select the target jurisdictions for the demo flow. Suggestion: Fulton County (Easy) vs. Cook County (Hard).',
    'pending',
    'Ad-hoc',
    NOW(),
    '{"priority": "critical", "category": "general", "assignee": "me"}'
);
