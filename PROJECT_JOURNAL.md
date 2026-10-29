# UXQA by Radoss. (OSCAR) : Unified Project, Change & Request Journal (`PROJECT_JOURNAL.md`)

> **Authority:** Single canonical ledger for all architectural decisions, user requests, verification logs, and active roadmap milestones for **UXQA by Radoss.** (`https://uxqa.radoss.agency` / `https://uiqa-platform.pages.dev`).

---

## 1. Release & Change Ledger

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
| **M5: Workers AI Persona & Copy Engine** | Vision screenshot auditing, copy readability analysis, simulated user feedback | Next |
| **M6: Composio & External Tool Bus** | Automated issue filing, CRM hooks, headless browser persona dispatch | Queued |
