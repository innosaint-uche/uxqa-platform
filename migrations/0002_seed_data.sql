-- UXQA Seed Migration: 0002_seed_data.sql
-- Seeds flagship Radoss enterprise workspace, projects, and active test runs into Cloudflare D1

INSERT OR IGNORE INTO workspaces (id, slug, name, owner_email) VALUES
('ws_radoss_01', 'radoss', 'Radoss Enterprise Workspace', 'uchenna@radossdigital.com');

INSERT OR IGNORE INTO projects (id, workspace_id, slug, name, repo_url, production_url) VALUES
('proj_aira_01', 'ws_radoss_01', 'aira-academy', 'AIRA by Radoss', 'github.com/radoss/aira-academy', 'https://aira.radoss.agency'),
('proj_grid_01', 'ws_radoss_01', 'naija-grid', 'Naija Grid / Gidi Grid', 'github.com/radoss/naija-grid', 'https://naijagrid.com'),
('proj_deep_01', 'ws_radoss_01', 'deepsyque', 'DeepSyque', 'github.com/radoss/deepsyque', 'https://deepsyque.com'),
('proj_eat_01', 'ws_radoss_01', 'eatalia', 'Eatalia Limited', 'github.com/radoss/eatalia-web', 'https://eatalia.ng');

INSERT OR IGNORE INTO test_runs (
  id, project_id, branch, commit_sha, status,
  duration_seconds, total_tests, passed_count, failed_count, skipped_count,
  runner_node_version, video_url, trace_url, report_url,
  persona_feedback_json, ux_copy_audit_json, created_at
) VALUES
(
  'run_aira_01',
  'proj_aira_01',
  'main',
  '8d47b7164a9f',
  'passed',
  42.8,
  69,
  69,
  0,
  0,
  'v24.2.0',
  'https://uxqa-artifacts.radoss.agency/runs/aira/video_full_flow.webm',
  'https://aura-academy-qa.pages.dev',
  'https://aura-academy-qa.pages.dev',
  '[{"persona":"Novice Consumer","model":"@cf/meta/llama-3.2-11b-vision-instruct","verdict":"Approved","score":94,"critique":"Onboarding flow is effortless. The 3-track curriculum cards display clear duration indicators (<25 min). No technical jargon found on track selection.","recommendations":["Add a tooltip explaining the difference between Track 1 and Track 2 on mobile portrait viewport."]},{"persona":"Speed Power User","model":"@cf/qwen/qwen2.5-coder-32b-instruct","verdict":"Approved","score":98,"critique":"Keyboard shortcuts for lesson progress (Cmd+Enter) respond in <12ms. Token estimation latency is negligible.","recommendations":[]},{"persona":"QA Executive","model":"@cf/meta/llama-3.3-70b-instruct","verdict":"Approved","score":96,"critique":"PBKDF2 iteration count verified at 100,000. State commit badges pass accessibility contrast ratios (7.2:1).","recommendations":["Ensure session expiration warning fires at 5 minutes remaining."]}]',
  '[{"selector":".curriculum-card > .cta-button","originalText":"Commit to Agentic Training Track","readabilityGrade":"Grade 10 (Flesch 62)","sentiment":"Neutral","recommendedImprovement":"Start 14-Day Free Agent Sandbox","expectedConversionLift":"+28.4% click-through"},{"selector":".lesson-modal > h3","originalText":"PBKDF2 Cryptographic Session Persistence Initialised","readabilityGrade":"Post-graduate (Flesch 18)","sentiment":"Confusing","recommendedImprovement":"Session Saved Securely","expectedConversionLift":"+14.2% completion rate"},{"selector":".pricing-tier > .annual-toggle","originalText":"Toggle Institutional SLA Billing Cycle","readabilityGrade":"College (Flesch 44)","sentiment":"High Friction","recommendedImprovement":"Switch to Annual (Save 20%)","expectedConversionLift":"+31.6% plan selection"}]',
  '2026-10-28 23:15:12'
),
(
  'run_grid_01',
  'proj_grid_01',
  'main',
  '4f92c10b7e81',
  'passed',
  18.4,
  48,
  48,
  0,
  0,
  'v24.2.0',
  'https://uxqa-artifacts.radoss.agency/runs/grid/audio_canvas_flow.webm',
  'https://uiqa-platform.pages.dev/radoss/naija-grid/',
  'https://uiqa-platform.pages.dev/radoss/naija-grid/',
  '[{"persona":"Novice Consumer","model":"@cf/meta/llama-3.2-11b-vision-instruct","verdict":"Approved","score":96,"critique":"The 1080x1920 WhatsApp Status Plug Pass generator cleanly renders in canvas and downloads with zero stutter on mobile viewport simulations.","recommendations":["Ensure the Web Share API fallback button is prominently highlighted for Android Chrome users."]},{"persona":"Speed Power User","model":"@cf/qwen/qwen2.5-coder-32b-instruct","verdict":"Approved","score":99,"critique":"Web Audio API synthesiser initialises in 14ms on user gesture. Zero audio underruns observed across 48 automated test loops.","recommendations":[]},{"persona":"QA Executive","model":"@cf/meta/llama-3.3-70b-instruct","verdict":"Approved","score":95,"critique":"Commerce grid responsive layout scales cleanly from 320px to 4K displays. Touch targets exceed 48px standard.","recommendations":["Add alt text to rasterised Seed of Life canvas previews."]}]',
  '[{"selector":".generator-panel > .render-cta","originalText":"Rasterise Algorithmic Canvas Vector Buffer","readabilityGrade":"Post-graduate (Flesch 22)","sentiment":"High Friction","recommendedImprovement":"Generate My Plug Pass","expectedConversionLift":"+42.1% generation rate"},{"selector":".share-dialog > .whatsapp-btn","originalText":"Transmit High-Resolution Bitmap to WhatsApp Client","readabilityGrade":"College (Flesch 38)","sentiment":"Confusing","recommendedImprovement":"Download for WhatsApp Status (HD)","expectedConversionLift":"+31.2% social shares"},{"selector":".audio-bar > .mode-label","originalText":"Toggle Visual Modes","readabilityGrade":"Grade 6 (Flesch 78)","sentiment":"Neutral","recommendedImprovement":"Switch to Sight Mode (Ledger)","expectedConversionLift":"+16.2% engagement"}]',
  '2026-10-27 00:52:10'
),
(
  'run_deep_01',
  'proj_deep_01',
  'main',
  '0c16aff10675',
  'passed',
  29.5,
  34,
  34,
  0,
  0,
  'v24.2.0',
  'https://uxqa-artifacts.radoss.agency/runs/deepsyque/assessment_flow.webm',
  'https://uiqa-platform.pages.dev/radoss/deepsyque/',
  'https://uiqa-platform.pages.dev/radoss/deepsyque/',
  '[{"persona":"Skeptical Buyer","model":"@cf/meta/llama-3.3-70b-instruct","verdict":"Approved","score":95,"critique":"Post-assessment fallback snapshot normaliser verified in D1. Zero client crash observed during intermittent network reconnects.","recommendations":["Provide an instant download button for the candidate summary card."]}]',
  '[{"selector":".hero-action > .assessment-cta","originalText":"Commence Psychometric Cognitive Evaluation","readabilityGrade":"Post-graduate (Flesch 19)","sentiment":"High Friction","recommendedImprovement":"Take Free 5-Min Career Quiz","expectedConversionLift":"+34.8% start rate"},{"selector":".recovery-banner > p","originalText":"Diagnostic state refreshed from cloud database","readabilityGrade":"High School (Flesch 55)","sentiment":"Clear","recommendedImprovement":"Your progress is saved securely. Ready to continue.","expectedConversionLift":"+19.4% completion rate"},{"selector":".pricing-card > .tier-subtext","originalText":"Access institutional-grade benchmark matrices","readabilityGrade":"College (Flesch 36)","sentiment":"Neutral","recommendedImprovement":"See salary & hiring benchmarks for your exact role","expectedConversionLift":"+22.1% upgrade rate"}]',
  '2026-10-26 18:24:00'
),
(
  'run_eat_01',
  'proj_eat_01',
  'main',
  '3a18e5b41f02',
  'passed',
  24.1,
  28,
  28,
  0,
  0,
  'v24.2.0',
  'https://uxqa-artifacts.radoss.agency/runs/eatalia/menu_order_flow.webm',
  'https://uiqa-platform.pages.dev/radoss/eatalia/',
  'https://uiqa-platform.pages.dev/radoss/eatalia/',
  '[{"persona":"Novice Consumer","model":"@cf/meta/llama-3.2-11b-vision-instruct","verdict":"Approved","score":97,"critique":"QSR meal combo selector is intuitive. Cloudflare edge proxy maintains sub-80ms TTFB across Nigeria local network routes.","recommendations":["Display estimated kitchen dispatch time on order confirmation banner."]}]',
  '[{"selector":".menu-hero > .order-cta","originalText":"Execute Remote Food Service Delivery Protocol","readabilityGrade":"Post-graduate (Flesch 15)","sentiment":"High Friction","recommendedImprovement":"Order Hot Meals Now","expectedConversionLift":"+38.5% order conversions"},{"selector":".checkout-sheet > .gateway-label","originalText":"Select Preferred Electronic Settlement Rails","readabilityGrade":"College (Flesch 32)","sentiment":"Confusing","recommendedImprovement":"Pay with Card, Bank Transfer, or OPay","expectedConversionLift":"+24.7% checkout completion"},{"selector":".status-tracker > .notification-toggle","originalText":"Enable SMS Operational Dispatch Notifications","readabilityGrade":"High School (Flesch 58)","sentiment":"Neutral","recommendedImprovement":"Text me when food leaves kitchen","expectedConversionLift":"+18.9% opt-in rate"}]',
  '2026-10-25 14:10:30'
);
