# UXQA by Radoss. (OSCAR) : Single Unified Agent Authority (`AGENTS.md`)

This document is the **single, failproof instruction authority** for all AI coding agents, sub-agents, and IDE surfaces (`Antigravity`, `Claude Code`, `Codex`, `Hermes`) operating inside `/Users/radossagency/Documents/UXQA`.

---

## 1. Domain & Brand Authority
- **Project Name:** UXQA by Radoss. (Brand Code: `OSCAR` / `UXQA`)
- **Live Production Domain:** `https://uxqa.radoss.agency`
- **Cloudflare Edge Deployment:** `https://uiqa-platform.pages.dev`
- **Workspace Hierarchy:**
  - Landing & Product Showcase: `https://uiqa-platform.pages.dev/UXQA-app` (and `/`)
  - Authentication Gate: `https://uiqa-platform.pages.dev/login`
  - Onboarding & Intake Engine: `https://uiqa-platform.pages.dev/registration`
  - Workspace QA Telemetry: `https://uiqa-platform.pages.dev/<workspace-slug>/<project-slug>/`
  - Default Flagship Workspace: `https://uiqa-platform.pages.dev/radoss/aira-academy/`
- **Founder & Super Admin:** Uchenna Innocent (`uchenna@radossdigital.com` | Linked Cloudflare Account: `innosaint.uche@gmail.com` | Radoss ONE Business: Agency + Digital)
- **Positioning:** Autonomous, zero-human-in-the-loop product testing, simulated screen recording, UX copy review, and marketing collateral generation for tech founders, vibe coders, and digital teams at a fraction of traditional human QA costs.

---

## 2. Technical Stack & Architecture Contract
- **Frontend & Edge Gateway:** React 19 + TypeScript + Vite + Tailwind CSS + Swiss Grid (`0px` border radius) + shadcn-compatible accessible primitives.
- **Edge Runtime:** Cloudflare Pages Functions (`functions/api/*`) with Node.js compatibility enabled.
- **Data & Object Storage Tier:**
  - **Cloudflare R2 (`uxqa-artifacts`):** Heavy binary storage (Playwright WebM videos, trace archives, full DOM snapshots, high-resolution product screenshots) with zero egress fees.
  - **Cloudflare D1 (`uxqa-db`):** Relational edge data for users, workspaces, projects, test runs, waitlist subscribers, and onboarding profiles.
  - **Convex (Hybrid Realtime Bus):** Optional low-latency reactive state sync for live test telemetry and instant collaborative annotations.
- **AI Persona & Vision Layer (Cloudflare Workers AI - Free Tier):**
  - Vision & Layout Review: `@cf/meta/llama-3.2-11b-vision-instruct` (screenshot inspection, visual bug catches, responsive layout auditing).
  - UX Copy & Tone Analysis: `@cf/meta/llama-3.3-70b-instruct` (conversion friction, readability scoring, CTA audit).
  - Persona Simulation (Novice / Power User / QA Executive): `@cf/qwen/qwen2.5-coder-32b-instruct` and `@cf/deepseek-ai/deepseek-r1-distill-qwen-32b`.
- **External Tool Bus (Roadmap):** Composio (`composio.dev`) for orchestrating headless browser agents, issue tracker dispatches, and third-party CRM hooks.

---

## 3. Unbreakable CTO & CCO Guardrails

### 3.1 CTO Security, Hardware & Testing Mandates
1. **Zero Client Hardware Load (Universal Device Equality):** All test suites, headless browser processes, video captures, and trace generations run 100% on cloud runners. Whether a user is on an 8GB RAM Windows laptop, a budget Mac, or a developer workstation, UXQA consumes zero local RAM, CPU, or SSD storage.
2. **Super Admin Isolation:** Uchenna Innocent (`uchenna@radossdigital.com` | `innosaint.uche@gmail.com`) is the sole Super Admin with unrestricted dashboard access. All public visitors are routed to the interactive landing page and waitlist onboarding flow.
3. **Fail-Closed Verification:** Run `npm run verify` before any commit or deployment claim.

### 3.2 CCO Brand, Design & Visual Storytelling Mandates
1. **Radoss Swiss Grid (`0px` Border Radius):** Strictly enforce `--radius: 0px` (`rounded-none`) across all cards, badges, buttons, inputs, and modals per Radoss Design System.
2. **Visual, Modern & Interactive Experience:** High-contrast Swiss Grid, modern typography (`Inter` + `Manrope`), modular shadcn-style UI primitives, and real visual assets extracted from live test runs (e.g. real AIRA test telemetry cards, step-by-step trace views, error diffs, and DOM inspection panels).
3. **UX Writing Excellence:** Clear, high-signal copy that speaks directly to technical founders, vibe coders, and product teams who need institutional-grade product testing without hiring an expensive human QA department.

---

## 4. Multi-Agent Cross-Compatibility
- All ecosystem agents (`Antigravity`, `Claude Code`, `Hermes`, `Codex`) must append operational changes to `PROJECT_JOURNAL.md`.
- No scattered tracking files allowed (`OMISSIONS.md`, `ERRORS.md`, `EXECUTION_TRACKER.md` are banned).
