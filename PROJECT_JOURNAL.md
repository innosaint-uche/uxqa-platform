# UXQA by Radoss. (OSCAR) : Unified Project, Change & Request Journal (`PROJECT_JOURNAL.md`)

> **Authority:** Single canonical ledger for all architectural decisions, user requests, verification logs, and active roadmap milestones for **UXQA by Radoss.** (`https://uxqa.radoss.agency` / `https://uiqa-platform.pages.dev`).

---

## 1. Release & Change Ledger

### 2026-10-29: R1.9: Diversified Project Copy Audits & Dynamic Interactive Auditor Shipped
- **Audit Findings & Fixes:**
  - Resolved copy audit uniformity where `AIRA by Radoss` copy was hardcoded across the interactive auditor and mock registries.
  - Authored tailored, domain-specific 3-point copy audits in `src/data/mockTelemetry.ts` for all flagship projects:
    - **AIRA Academy:** Curriculum track onboarding, session commit badges, PBKDF2 encryption messaging.
    - **Naija Grid / Gidi Grid:** Procedural audio synthesis vs Plug Pass generation, 1080x1920 raster buffer vs WhatsApp Status HD download, and Ledger / Sight Mode switching.
    - **DeepSyque:** Psychometric evaluation jargon vs 5-minute career quiz, cloud state recovery messaging, and salary/hiring benchmark upgrade cards.
    - **Eatalia Limited:** Remote food order protocol vs 15-minute hot meal delivery, multi-rail checkout payment methods, and kitchen dispatch notifications.
  - Added project switcher pill bar directly in `LiveTelemetryShowcase.tsx` on the landing showcase, allowing visitors to instantly toggle between projects.
  - Updated `InteractiveAiAuditor.tsx` with dynamic `useEffect` synchronization, pre-populating project-calibrated elements and expected conversion lift metrics.
- **Verification:** 100% PASS (6/6 gates green). Deployed to Cloudflare Pages edge (`https://uiqa-platform.pages.dev/`).

### 2026-10-29: R1.8: Visual Evidence Overhaul & Default Light Theme Architecture Shipped
- **Shipped Scope:**
  - **Light Theme as Default:**
    - Set default `<html lang="en" class="light">` with persistent theme state stored in `localStorage` (`uxqa-theme`).
    - Configured Sun/Moon interactive theme toggle in `Navbar.tsx` switching between light and dark modes.
    - Updated `src/index.css` with light-mode Swiss Grid lines (`rgba(0,0,0,0.05)`), light scrollbars, and enforced `--radius: 0px !important`.
    - Adapted all core UI components (`Hero`, `LiveTelemetryShowcase`, `Pillars`, `CompetitorMatrix`, `Footer`, `WorkspaceHub`, `OnboardingModal`, `LoginModal`) with clean light/dark adaptive classes (`bg-white dark:bg-[#111215]`, `border-gray-200 dark:border-swiss-border`, `text-gray-900 dark:text-white`).
  - **Visual Evidence Overhaul (Replacing Synthetic Placeholders):**
    - `VisualStepScrobbler.tsx`: Interactive 4-step execution scrobbler with Play/Pause simulation, real Playwright action signatures, elapsed millisecond timings, and dynamic DOM mockups (Curriculum Tracks, Day 1-3 Lessons, YouTube link probes, Vision Persona overlay).
    - `VisualBugDiffViewer.tsx`: Interactive Before/After visual regression comparison demonstrating mobile viewport tap target obscured by floating toast vs fixed unobscured checkout button on iPhone 16 viewport.
    - `LiveReportEmbed.tsx`: Living iframe embed of `https://aura-academy-qa.pages.dev` with expand/contract and reload controls, allowing instant verification with zero downloads.
    - `MarketingAssetsGallery.tsx`: Auto-extracted marketing collaterals featuring iPhone 16 framed mockup for AIRA Academy and 1080x1920 WhatsApp Status Plug pass for Naija Grid with 1-click snippet copy.
  - **Compliance & Deployment:**
    - Passed 6/6 `npm run verify` gates (Authority files, anti-bloat, zero em dashes, 0px radius, TypeScript typecheck, Cloudflare Pages Functions typecheck).
    - Live deployed to Cloudflare Pages: `https://uiqa-platform.pages.dev/`.

### 2026-10-29: R1.7: Cloudflare Edge Infrastructure Provisioned, Production Deployed & GitHub Origin Linked
- **Shipped Scope:**
  - Provisioned Cloudflare D1 Database `uxqa-db` (`2b9403c7-57d7-4aeb-804e-30a8f0a97163` in region WEUR) and executed full schema migrations (8 queries executed, tables and indices verified).
  - Provisioned Cloudflare R2 Object Storage Bucket `uxqa-artifacts` for zero-egress video recording and trace archive storage.
  - Configured `wrangler.json` with edge bindings (`DB`, `ARTIFACTS`, `AI`) and Node.js compatibility enabled.
  - Created Cloudflare Pages project `uiqa-platform` and executed production deployment:
    - Production Edge Domain: `https://uiqa-platform.pages.dev/`
    - Functions bundle uploaded and live.
  - Linked GitHub Remote Origin:
    - Created repository `https://github.com/innosaint-uche/uiqa-platform` under owner account `innosaint-uche`.
    - Set `origin/main` upstream and established byte-for-byte local-remote parity.
  - Executed Six-Probe Live Production Smoke:
    - Probe 1: `GET /` -> HTTP/2 200 OK
    - Probe 2: `GET /UXQA-app` -> HTTP/2 200 OK
    - Probe 3: `GET /radoss/aira-academy/` -> HTTP/2 200 OK
    - Probe 4: `GET /api/telemetry` -> HTTP/2 200 OK
    - Probe 5: `POST /api/intake` -> 200 OK (verified written to remote D1 `uxqa-db`)
    - Probe 6: `POST /api/composio` -> 200 OK (Linear defect dispatch verified)
  - Verification: 100% PASS (6/6 gates green).

### 2026-10-29: R1.6: Project URL Parity Corrected, Composio External Tool Bus Shipped (Milestone 6)
- **Corrections & Audit Resolution:**
  - Resolved report URL copy-paste anomaly in `src/data/mockTelemetry.ts`. `https://aura-academy-qa.pages.dev` is isolated strictly to AIRA Academy where its live Playwright dashboard resides. Corrected canonical edge routes for Naija Grid (`https://uiqa-platform.pages.dev/radoss/naija-grid/`), DeepSyque (`https://uiqa-platform.pages.dev/radoss/deepsyque/`), and Eatalia (`https://uiqa-platform.pages.dev/radoss/eatalia/`).
- **Shipped Scope:**
  - Implemented Composio external defect dispatch endpoint (`functions/api/composio.ts`):
    - Connects automated defect payloads to Linear (`linear_create_issue`), GitHub Issues (`github_create_issue`), and Slack (`slack_post_message`).
    - Structures comprehensive bug tickets embedding exact WebM video timestamps (`00:14.2`), Playwright trace archive URLs, failing DOM HTML snippets, and Workers AI persona remediation guidance.
    - Protected by `x-cto-api-key` header and Super Admin edge session tokens.
  - Engineered interactive dispatch console (`src/components/ComposioDispatchPanel.tsx`):
    - One-click tool action switcher (Linear, GitHub, Slack), severity selector (Critical, High, Medium, Low), ticket preview, and instant dispatch status badge.
    - Integrated directly into `src/components/WorkspaceHub.tsx` per Radoss Swiss Grid (`0px` radius).
  - Verification: 100% PASS (6/6 gates green).

### 2026-10-29: R1.5: Cloudflare Workers AI Persona & Copy Engine Shipped (Milestone 5)
- **Shipped Scope:**
  - Implemented Cloudflare Workers AI edge review handler in `functions/api/ai-review.ts`:
    - `@cf/meta/llama-3.3-70b-instruct` execution for microcopy readability analysis, conversion friction detection, and high-converting copy generation.
    - `@cf/qwen/qwen2.5-coder-32b-instruct` execution for simulated customer archetypes (Novice Consumer, Speed Power User, Skeptical Buyer, QA Executive) returning structured score (0-100), critique, and actionable recommendations.
    - Built-in heuristic engine fallback ensuring fast response in local environments without requiring local model weights.
  - Engineered `src/components/InteractiveAiAuditor.tsx` component:
    - Interactive UX Copy Evaluator with on-demand input, selector tagging, and expected conversion lift metrics.
    - Interactive Persona Simulator with one-click archetype switching and instant feedback card.
  - Integrated `InteractiveAiAuditor` into `src/components/WorkspaceHub.tsx` per Radoss Swiss Grid (`0px` border radius).
  - Verification: 100% PASS (6/6 gates green).

### 2026-10-29: R1.4: Multi-Tenant Workspace Router & Telemetry Hub Shipped (Milestone 4)
- **Shipped Scope:**
  - Engineered multi-tenant workspace telemetry view (`src/components/WorkspaceHub.tsx`) supporting path routing for `/:workspaceSlug/:projectSlug/`.
  - Expanded mock telemetry registry (`src/data/mockTelemetry.ts`) covering all flagship Radoss projects:
    - `radoss/aira-academy`: 69/69 passed (42.8s), Llama 3.2 curriculum visual checks, Llama 3.3 affiliate disclosure tone reviews.
    - `radoss/naija-grid`: 48/48 passed (38.2s), procedural Web Audio transients, 1080x1920 canvas Plug Pass verification.
    - `radoss/deepsyque`: 34/34 passed (29.5s), D1 fallback snapshot normaliser verification, zero client crash guarantee.
    - `radoss/eatalia`: 28/28 passed (24.1s), Cloudflare proxy edge latency verification, meal combo responsive flow.
  - Built Workspace Navigation Bar: breadcrumb path navigation, project selector with real-time pass rate badges, and one-click "Copy Report" button generating markdown test evidence for AI agents and founder changelogs.
  - Wired client route listener in `src/App.tsx` handling `window.history.pushState` across showcase (`/` or `/UXQA-app`) and workspace views (`/:ws/:proj/`).
  - Verification: 100% PASS (6/6 gates green).

### 2026-10-29: R1.3: Cloudflare Pages Edge Functions, D1 Schema & Intake Persistence Shipped
- **Shipped Scope:**
  - Designed canonical Cloudflare D1 SQL relational schema (`migrations/0001_initial_schema.sql`): `waitlist_subscribers`, `workspaces`, `projects`, and `test_runs` with high-performance indices.
  - Implemented Cloudflare Pages Functions edge API tier in `functions/`:
    - `functions/api/_middleware.ts`: Global CORS handling and security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`).
    - `functions/api/intake.ts`: POST endpoint persisting onboarding CRM submissions to D1 with conflict updates and GET export endpoint protected by Super Admin credentials.
    - `functions/api/telemetry.ts`: GET endpoint streaming test runs and POST ingestion endpoint receiving telemetry from GitHub Actions cloud runners via `cto-cloud-qa` API key.
    - `functions/api/auth.ts`: Authentication verification gate enforcing Super Admin RBAC for `uchenna@radossdigital.com` and `innosaint.uche@gmail.com`.
    - `functions/types.ts` & `functions/tsconfig.json`: Isolated Cloudflare Workers types environment.
  - Connected React frontend modals (`OnboardingModal` and `LoginModal`) to `/api/intake` and `/api/auth` with graceful local preview fallbacks.
  - Upgraded verification suite (`scripts/verify.mjs` / `npm run verify`) with Gate 6: Cloudflare Pages Functions typecheck.
  - Verification: 100% PASS (6/6 gates green).

### 2026-10-29: R1.2: React 19 Swiss Grid Scaffold Shipped, M2 Landing Showcase & Verification Gate
- **Shipped Scope:**
  - Initialised local Git repository with hardened `.gitignore`.
  - Engineered production React 19 + TypeScript + Vite + Tailwind CSS scaffold with strict Radoss Swiss Grid (`--radius: 0px` across all cards, badges, inputs, buttons, and modals).
  - Shipped M2 Landing Page (`/` and `/UXQA-app`):
    - Swiss Grid Header with live runner badge (0MB Local RAM indicator).
    - Hero section with high-converting value proposition and hardware comparison metrics.
    - The 4 Core Product Pillars (Zero-Hardware Cloud QA, Simulated Personas, Copy Audits, Marketing Collaterals).
    - Interactive Flagship Telemetry Hub showcasing real AIRA by Radoss test runs (42.8s duration, 69/69 green, Llama 3.2 vision reviews, Llama 3.3 tone critique, Cloudflare R2 zero-egress links, and live Playwright report integration).
    - Competitive Intelligence Benchmark Matrix (UXQA vs BrowserStack vs UserTesting vs Local CLI).
    - 6-Step Onboarding CRM Intake Modal (`/registration` route support).
    - Super Admin RBAC Gate Modal (`/login` route support for `uchenna@radossdigital.com` and `innosaint.uche@gmail.com`).
  - Implemented automated fail-closed verification gate (`scripts/verify.mjs` / `npm run verify`):
    - Validates authority files, checks for banned tracking files, audits zero em dashes, verifies `--radius: 0px`, and runs full `tsc -b` + `vite build`.
    - Verification: 100% PASS (5/5 gates green).

### 2026-10-29: R1.1: MCIA Market Research, Universal Hardware Equality & Super Admin Credential Parity
- **User Feedback & Architectural Elevation:**
  - Corrected Super Admin identity: `uchenna@radossdigital.com` (Cloudflare account linked to `innosaint.uche@gmail.com`).
  - Elevated the hardware constraint from a personal dev rule to a **core product value proposition**: Universal Zero Client Hardware Load. In a world where UK/global tech firms laid off human QA testers and vibe-coders build on standard 8GB RAM laptops (Windows/Mac), UXQA executes 100% in the cloud with zero local CPU, RAM, or disk bloat.
  - Applied the **M.C.I.A framework** (Map, Connect, Implement, Analyse):
    - Authored `docs/MCIA_PRODUCT_RESEARCH_AND_MARKET_STRATEGY.md` detailing the collapse of manual QA, the 3 ICP profiles (Vibe Coder, Startup CTO, Digital Agency), AIEO/GEO/LLMEO search citation vectors, and viral referral loops.
    - Updated `docs/UX_WRITING_SYSTEM.md` with complete on-page copy, technical SEO metadata, the 4 product pillars, and the 6-question CRM intake engine for `/registration`.
  - Visual Design Strategy: Incorporating real AIRA Academy test telemetry cards, step-by-step trace views, error diffs, and shadcn-style accessible Swiss Grid components to create an authentic, high-converting product showcase without heavy video lag.

### 2026-10-29: R1: Project Inception, Authority Baseline & Architecture Blueprint
- **User Request:**
  - Create dedicated project workspace at `/Users/radossagency/Documents/UXQA`.
  - Brand as **UXQA by Radoss.** (Code name: `OSCAR`), targeting `https://uxqa.radoss.agency` and edge fallback `https://uiqa-platform.pages.dev`.
  - Serve both as a central QA repository for internal projects (AIRA, Naija Grid, etc.) and a commercial SaaS platform for founders and vibe coders needing autonomous, decentralized UI/UX testing.
  - Route structure:
    - Showcase: `/UXQA-app` and `/`
    - Auth gate: `/login`
    - Onboarding & CRM intake: `/registration`
    - Workspace telemetry: `/<workspace-slug>/<project-slug>/` (default `/radoss/aira-academy/`)
  - Map generous free-tier Cloudflare Workers AI models for vision QA and UX copy analysis.
  - Super Admin isolation for Uchenna Innocent (`uchenna@radossdigital.com` | `innosaint.uche@gmail.com`) with public waitlist capture.
- **Architectural Resolutions:**
  - Established root `AGENTS.md` and `PROJECT_JOURNAL.md`.
  - Structured storage tier: Cloudflare R2 for zero-egress video/trace files + Cloudflare D1 for relational user/workspace records + optional Convex reactive bus.
  - Mapped Workers AI free catalog: `@cf/meta/llama-3.2-11b-vision-instruct`, `@cf/meta/llama-3.3-70b-instruct`, `@cf/qwen/qwen2.5-coder-32b-instruct`.
  - Scaffolding plan drafted for multi-persona simulation and reusable marketing asset generation.

---

## 2. Active Roadmap Milestones

| Milestone | Target Scope | Status |
| :--- | :--- | :--- |
| **M1: Core Authority & Blueprint** | `AGENTS.md`, `PROJECT_JOURNAL.md`, architecture and UX writing specs | Completed |
| **M2: Landing Page & Micro-Interactions** | Silicon Valley minimal showcase, Swiss Grid, waitlist capture, zero heavy video | Completed |
| **M3: Auth & Intake System** | OAuth gateway, `/login`, `/registration` questionnaire, Super Admin RBAC | Completed |
| **M4: Telemetry Hub & R2 Storage** | Edge router for `/<workspace>/<project>/`, Playwright HTML report integration | Completed |
| **M5: Workers AI Persona & Copy Engine** | Vision screenshot auditing, copy readability analysis, simulated user feedback | Completed |
| **M6: Composio & External Tool Bus** | Automated issue filing, CRM hooks, headless browser persona dispatch | Completed |
