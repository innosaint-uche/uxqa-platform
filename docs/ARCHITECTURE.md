# UXQA Technical Architecture & AI Engine Specification

## 1. System Overview

UXQA (`OSCAR`) bridges modern AI agent development loops (`cto-cloud-qa`, Antigravity, Claude Code, GitHub Actions) with a high-performance web platform that renders interactive test evidence, visual screen recordings, simulated persona audits, and exportable marketing collateral.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DEVELOPER / AGENT ENTRY                         │
│  - GitHub Actions Cloud Runner (e.g. AIRA, Naija Grid, Customer Repos) │
│  - Antigravity / IDE Direct Ingestion via cto-cloud-qa CLI            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│             EDGE API & WORKSPACE ROUTER (Cloudflare Pages)             │
│  - Custom Domain: `https://uxqa.radoss.agency`                         │
│  - Edge URL: `https://uiqa-platform.pages.dev`                         │
│  - Routes: `/`, `/UXQA-app`, `/login`, `/registration`, `/:ws/:proj/`  │
└──────────────────┬─────────────────┬───────────────────┬───────────────┘
                   │                 │                   │
                   ▼                 ▼                   ▼
┌────────────────────────┐  ┌────────────────┐  ┌────────────────────────┐
│    Cloudflare R2       │  │ Cloudflare D1  │  │  Cloudflare Workers AI │
│  (`uxqa-artifacts`)    │  │  (`uxqa-db`)   │  │    (Free 10k Neurons)  │
│ - WebM Screen Videos   │  │ - Workspaces   │  │ - Vision QA: Llama 3.2 │
│ - Playwright Traces    │  │ - Projects     │  │ - Copy Audit: Llama 3.3│
│ - Full DOM Snapshots   │  │ - Test Runs    │  │ - Persona Reasoning:   │
│ - Exported Screenshots │  │ - Waitlist/CRM │  │   Qwen 2.5 Coder 32B   │
└────────────────────────┘  └────────────────┘  └────────────────────────┘
```

---

## 2. Cloudflare Free-Tier Storage & Compute Fact Sheet

### A. Cloudflare R2 (`uxqa-artifacts`)
* **Monthly Free Allowance:** 10 GB of storage, 1 million Class A operations (writes), 10 million Class B operations (reads).
* **Egress Cost:** \$0.00 forever.
* **Role:** Stores large test videos (`.webm`), interactive traces (`trace.zip`), and high-resolution marketing screenshots.

### B. Cloudflare D1 (`uxqa-db`)
* **Daily Free Allowance:** 5 million read rows per day, 100,000 write rows per day, 5 GB total database storage.
* **Role:** Stores users, sessions, workspaces, projects, test telemetry metadata, and waitlist signups.

### C. Cloudflare Workers AI (Generous Free Allocation)
* **Daily Free Allowance:** 10,000 Neurons per day across state-of-the-art open models.
* **Model Mapping for UXQA:**
  1. **Visual QA & Layout Inspector:** `@cf/meta/llama-3.2-11b-vision-instruct`
     - Evaluates responsive screenshots for layout overflow, broken images, and visual contrast defects.
  2. **UX Copy & Tone Reviewer:** `@cf/meta/llama-3.3-70b-instruct`
     - Audits landing pages and microcopy for clarity, tone consistency, and conversion friction.
  3. **Simulated User Personas:** `@cf/qwen/qwen2.5-coder-32b-instruct` & `@cf/deepseek-ai/deepseek-r1-distill-qwen-32b`
     - Assumes specific user personas (e.g. Non-technical Founder, Mobile Power User, Enterprise Buyer) and writes constructive feedback notes based on test telemetry.

---

## 3. Composio Tool Bus & External Integration (Roadmap)

Composio (`composio.dev`) will connect UXQA to external ecosystems:
* **Automated Issue Tracking:** Automatically creates detailed Linear, GitHub, or Jira tickets when an E2E test fails, attaching the exact WebM timestamp and DOM snippet.
* **Browser Sandbox Agents:** Spawns autonomous browser agents with simulated human delays to probe edge cases beyond scripted Playwright tests.
* **CRM & Notification Webhooks:** Pushes onboarding insights and test summary digests to Slack, Discord, or email.
