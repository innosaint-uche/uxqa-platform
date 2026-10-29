-- UXQA D1 Initial Schema: uxqa-db
-- Canonical Edge Database for Workspaces, Projects, Test Runs, and Waitlist Subscribers

-- 1. Waitlist & CRM Intake Table
CREATE TABLE IF NOT EXISTS waitlist_subscribers (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  work_email TEXT NOT NULL UNIQUE,
  organization TEXT,
  role TEXT NOT NULL,
  product_name TEXT NOT NULL,
  production_url TEXT,
  repo_url TEXT,
  tech_stack TEXT,
  target_persona TEXT NOT NULL,
  top_pain_point TEXT NOT NULL,
  review_rigor TEXT NOT NULL,
  referral_source TEXT,
  status TEXT DEFAULT 'pending', -- pending, invited, active, rejected
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Workspaces Table
CREATE TABLE IF NOT EXISTS workspaces (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  repo_url TEXT,
  production_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(workspace_id, slug)
);

-- 4. Test Runs Telemetry Table
CREATE TABLE IF NOT EXISTS test_runs (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  branch TEXT NOT NULL,
  commit_sha TEXT NOT NULL,
  status TEXT NOT NULL, -- passed, failed, running
  duration_seconds REAL NOT NULL,
  total_tests INTEGER NOT NULL,
  passed_count INTEGER NOT NULL,
  failed_count INTEGER NOT NULL,
  skipped_count INTEGER NOT NULL,
  runner_node_version TEXT NOT NULL,
  video_url TEXT,
  trace_url TEXT,
  report_url TEXT,
  persona_feedback_json TEXT, -- Serialised JSON of AI persona critiques
  ux_copy_audit_json TEXT,    -- Serialised JSON of copy audit items
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indices for rapid lookup
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_subscribers(work_email);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_projects_workspace ON projects(workspace_id);
CREATE INDEX IF NOT EXISTS idx_test_runs_project ON test_runs(project_id);
