-- UXQA D1 Migration: 0003_test_plans.sql
-- Writable test plans table for vibe coders and non-technical founders

CREATE TABLE IF NOT EXISTS test_plans (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  target_url TEXT NOT NULL,
  version TEXT DEFAULT 'v1.0',
  viewport TEXT DEFAULT 'desktop', -- desktop, mobile, responsive
  steps_json TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_test_plans_project ON test_plans(project_id);
