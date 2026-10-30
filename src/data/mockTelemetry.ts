import { TelemetryRun } from '../types';

export interface ProjectMeta {
  slug: string;
  name: string;
  description: string;
  repo: string;
  productionUrl: string;
  passRate: string;
  lastRunTimestamp: string;
}

export interface WorkspaceMeta {
  slug: string;
  name: string;
  owner: string;
  projects: ProjectMeta[];
}

export const mockWorkspaces: WorkspaceMeta[] = [
  {
    slug: 'radoss',
    name: 'Radoss Enterprise Workspace',
    owner: 'Uchenna Innocent (Super Admin)',
    projects: [
      {
        slug: 'aira-academy',
        name: 'AIRA by Radoss',
        description: 'Autonomous curriculum & agent training academy with 150 lessons across 3 tracks.',
        repo: 'github.com/radoss/aira-academy',
        productionUrl: 'https://aira.radoss.agency',
        passRate: '69/69 (100%)',
        lastRunTimestamp: '2026-10-28 23:15:12 UTC',
      },
      {
        slug: 'naija-grid',
        name: 'Naija Grid / Gidi Grid',
        description: 'Procedural Web Audio engine, Seed of Life canvas generator and commerce grid.',
        repo: 'github.com/radoss/naija-grid',
        productionUrl: 'https://naijagrid.com',
        passRate: '48/48 (100%)',
        lastRunTimestamp: '2026-10-27 00:52:10 UTC',
      },
      {
        slug: 'deepsyque',
        name: 'DeepSyque',
        description: 'Post-assessment career intelligence platform with D1 fallback snapshot engine.',
        repo: 'github.com/radoss/deepsyque',
        productionUrl: 'https://deepsyque.com',
        passRate: '34/34 (100%)',
        lastRunTimestamp: '2026-10-26 18:24:00 UTC',
      },
      {
        slug: 'eatalia',
        name: 'Eatalia Limited',
        description: 'Fast-casual QSR platform in Yaba, Lagos with Cloudflare proxy and edge menu cache.',
        repo: 'github.com/radoss/eatalia-web',
        productionUrl: 'https://eatalia.ng',
        passRate: '28/28 (100%)',
        lastRunTimestamp: '2026-10-25 14:10:30 UTC',
      },
    ],
  },
];

export const mockAiraTelemetry: TelemetryRun = {
  id: 'run_aira_20261028_2315',
  project: 'AIRA by Radoss',
  repo: 'github.com/radoss/aira-academy',
  branch: 'main',
  commitSha: '8d47b7164a9f',
  status: 'passed',
  durationSeconds: 42.8,
  totalTests: 69,
  passedCount: 69,
  failedCount: 0,
  skippedCount: 0,
  timestamp: '2026-10-28 23:15:12 UTC',
  runner: {
    type: 'github-actions-ubuntu',
    nodeVersion: 'v24.2.0',
    localRamUsedMb: 0,
    localCpuUsedPct: 0,
  },
  artifacts: {
    videoUrl: 'https://uxqa-artifacts.radoss.agency/runs/aira/video_full_flow.webm',
    traceUrl: 'https://aura-academy-qa.pages.dev',
    reportUrl: 'https://aura-academy-qa.pages.dev',
    screenshotsCount: 18,
    videoDuration: '00:42.8',
    videoSteps: [
      { timestamp: '00:03.2', seconds: 3.2, label: 'Auth Initialization', action: 'page.goto("/login") & PBKDF2 check', status: 'passed' },
      { timestamp: '00:08.4', seconds: 8.4, label: 'Cookie Dismissal', action: 'click("button.accept-cookies")', status: 'passed' },
      { timestamp: '00:15.1', seconds: 15.1, label: 'Curriculum Traversal', action: 'expect(locator(".track-card")).toHaveCount(3)', status: 'passed' },
      { timestamp: '00:27.6', seconds: 27.6, label: 'Cryptographic Badge', action: 'expect(locator(".commit-badge")).toBeVisible()', status: 'passed' },
      { timestamp: '00:42.8', seconds: 42.8, label: 'Clean Test Teardown', action: 'browserContext.close()', status: 'passed' },
    ],
    screenshots: [
      {
        id: 'aira-shot-1',
        title: 'Desktop 1920x1080: Curriculum & Tracks Hub',
        viewport: 'Desktop',
        dimensions: '1920x1080',
        timestamp: '00:15.1',
        sizeKb: 612,
        url: '/assets/dom-captures/aira-curriculum-desktop.svg',
        tag: 'Full Layout Pass',
        domSelector: 'main.curriculum-grid',
      },
      {
        id: 'aira-shot-2',
        title: 'iPhone 16: Mobile Navigation & Touch Targets',
        viewport: 'Mobile 390x844',
        dimensions: '390x844',
        timestamp: '00:08.4',
        sizeKb: 235,
        url: '/assets/dom-captures/aira-mobile-nav.svg',
        tag: 'Mobile A11y Pass',
        domSelector: '.mobile-nav-bar',
      },
      {
        id: 'aira-shot-3',
        title: 'Desktop: Cryptographic PBKDF2 Session Commit',
        viewport: 'Desktop',
        dimensions: '1920x1080',
        timestamp: '00:27.6',
        sizeKb: 480,
        url: '/assets/dom-captures/aira-pbkdf2-commit.svg',
        tag: 'DOM Inspection Pass',
        domSelector: '.commit-badge-container',
      },
      {
        id: 'aira-shot-4',
        title: 'Tablet iPad Mini: Interactive Lesson Scrobbler',
        viewport: 'Tablet 768x1024',
        dimensions: '768x1024',
        timestamp: '00:34.2',
        sizeKb: 395,
        url: '/assets/dom-captures/aira-tablet-scrobbler.svg',
        tag: 'Responsive Pass',
        domSelector: '.lesson-player-viewport',
      },
    ],
    files: [
      {
        name: 'aira-full-run.webm',
        category: 'Video',
        size: '3.4 MB',
        path: 'r2://uxqa-artifacts/runs/aira/video_full_flow.webm',
        downloadUrl: 'https://uxqa-artifacts.radoss.agency/runs/aira/video_full_flow.webm',
        description: 'Complete 42.8s Playwright browser session recording at 60fps',
      },
      {
        name: 'step-3-dom-snapshot.html',
        category: 'DOM Snapshot',
        size: '412 KB',
        path: 'r2://uxqa-artifacts/runs/aira/dom_snapshot_03.html',
        downloadUrl: 'https://uxqa-artifacts.radoss.agency/runs/aira/dom_snapshot_03.html',
        description: 'Sanitized full-page HTML DOM tree at verification checkpoint',
      },
      {
        name: 'network-waterfall.har',
        category: 'Network HAR',
        size: '824 KB',
        path: 'r2://uxqa-artifacts/runs/aira/network.har',
        downloadUrl: 'https://uxqa-artifacts.radoss.agency/runs/aira/network.har',
        description: 'HTTP/2 and WebSocket request timing waterfall and payload headers',
      },
      {
        name: 'runner-console.log',
        category: 'Console Logs',
        size: '92 KB',
        path: 'r2://uxqa-artifacts/runs/aira/console.log',
        downloadUrl: 'https://uxqa-artifacts.radoss.agency/runs/aira/console.log',
        description: 'Raw runner stdout, stderr, and test assertion logs from Ubuntu CI',
      },
      {
        name: 'telemetry-summary.json',
        category: 'Metrics JSON',
        size: '16 KB',
        path: 'r2://uxqa-artifacts/runs/aira/telemetry.json',
        downloadUrl: 'https://uxqa-artifacts.radoss.agency/runs/aira/telemetry.json',
        description: 'Machine-readable JSON telemetry for local AI agent consumption',
      },
      {
        name: 'desktop-fullpage-1920.png',
        category: 'Screenshot',
        size: '612 KB',
        path: 'r2://uxqa-artifacts/runs/aira/screenshots/desktop_hero.png',
        downloadUrl: '/assets/dom-captures/aira-curriculum-desktop.svg',
        description: 'Full page 1920x1080 desktop render captured after network idle',
      },
      {
        name: 'iphone16-viewport-390.png',
        category: 'Screenshot',
        size: '235 KB',
        path: 'r2://uxqa-artifacts/runs/aira/screenshots/mobile_hero.png',
        downloadUrl: '/assets/dom-captures/aira-mobile-nav.svg',
        description: 'Mobile portrait 390x844 viewport render verifying 48px tap targets',
      },
    ],
  },
  personaFeedback: [
    {
      persona: 'Novice Consumer',
      model: '@cf/meta/llama-3.2-11b-vision-instruct',
      verdict: 'Approved',
      score: 94,
      critique: 'Onboarding flow is effortless. The 3-track curriculum cards display clear duration indicators (<25 min). No technical jargon found on track selection.',
      recommendations: [
        'Add a tooltip explaining the difference between Track 1 and Track 2 on mobile portrait viewport.'
      ],
    },
    {
      persona: 'Speed Power User',
      model: '@cf/qwen/qwen2.5-coder-32b-instruct',
      verdict: 'Approved',
      score: 98,
      critique: 'Fast keyboard navigation (Tab/Shift+Tab) verified across all 150 lesson items. Zero layout jitter during rapid search filtering.',
      recommendations: [
        'Expose Command+K shortcut on the search bar for desktop power users.'
      ],
    },
    {
      persona: 'Skeptical Buyer',
      model: '@cf/meta/llama-3.3-70b-instruct',
      verdict: 'Friction Detected',
      score: 87,
      critique: 'The affiliate program disclosure in AFFILIATE_PROGRAMS.md is crystal clear, but the certificate validation link is subtly placed below the fold.',
      recommendations: [
        'Elevate the Nak / Uchenna / Tim certification badge higher on the primary landing viewport.'
      ],
    },
  ],
  uxCopyAudit: [
    {
      selector: 'header > .cta-primary',
      originalText: 'Initialize Agentic Curriculum',
      readabilityGrade: 'College (Flesch 42)',
      sentiment: 'High Friction',
      recommendedImprovement: 'Start Learning Now (Free)',
      expectedConversionLift: '+23.4% click-through',
    },
    {
      selector: '.track-card-2 > .time-badge',
      originalText: 'Est. 14hr commitment over 30 sessions',
      readabilityGrade: 'Grade 8 (Flesch 68)',
      sentiment: 'Neutral',
      recommendedImprovement: '30 bite-sized lessons • Under 25 mins daily',
      expectedConversionLift: '+14.1% enrollment rate',
    },
    {
      selector: '.auth-modal > .help-subtext',
      originalText: 'PBKDF2 encrypted credential verification',
      readabilityGrade: 'Post-graduate (Flesch 24)',
      sentiment: 'Confusing',
      recommendedImprovement: 'Bank-grade encrypted login. We never share your data.',
      expectedConversionLift: '+18.8% form completion',
    },
  ],
};

export const mockNaijaGridTelemetry: TelemetryRun = {
  id: 'run_grid_20261027_0052',
  project: 'Naija Grid / Gidi Grid',
  repo: 'github.com/radoss/naija-grid',
  branch: 'main',
  commitSha: '6f434683f94c',
  status: 'passed',
  durationSeconds: 38.2,
  totalTests: 48,
  passedCount: 48,
  failedCount: 0,
  skippedCount: 0,
  timestamp: '2026-10-27 00:52:10 UTC',
  runner: {
    type: 'github-actions-ubuntu',
    nodeVersion: 'v24.2.0',
    localRamUsedMb: 0,
    localCpuUsedPct: 0,
  },
  artifacts: {
    videoUrl: 'https://uxqa-artifacts.radoss.agency/runs/grid/audio_canvas_flow.webm',
    traceUrl: 'https://uiqa-platform.pages.dev/radoss/naija-grid/',
    reportUrl: 'https://uiqa-platform.pages.dev/radoss/naija-grid/',
    screenshotsCount: 12,
    videoDuration: '00:18.4',
    videoSteps: [
      { timestamp: '00:02.1', seconds: 2.1, label: 'Web Audio Synthesis', action: 'AudioContext.resume() & oscillator check', status: 'passed' },
      { timestamp: '00:06.8', seconds: 6.8, label: 'Seed of Life Canvas', action: 'canvas.toDataURL("image/png")', status: 'passed' },
      { timestamp: '00:12.3', seconds: 12.3, label: '1080x1920 Plug Pass', action: 'assert(blob.size > 250000)', status: 'passed' },
      { timestamp: '00:18.4', seconds: 18.4, label: 'Commerce Grid Assertion', action: 'expect(catalog).toHaveCount(16)', status: 'passed' },
    ],
    screenshots: [
      {
        id: 'grid-shot-1',
        title: '1080x1920 Canvas: WhatsApp Status Plug Pass',
        viewport: 'Mobile 1080x1920',
        dimensions: '1080x1920',
        timestamp: '00:12.3',
        sizeKb: 840,
        url: '/assets/dom-captures/deepsyque-profile-desktop.svg',
        tag: 'Canvas Render Pass',
        domSelector: 'canvas#plug-pass-generator',
      },
      {
        id: 'grid-shot-2',
        title: 'Desktop 1920x1080: Seed of Life Visualizer',
        viewport: 'Desktop',
        dimensions: '1920x1080',
        timestamp: '00:06.8',
        sizeKb: 520,
        url: '/assets/dom-captures/deepsyque-profile-desktop.svg',
        tag: 'Audio Reactive Pass',
        domSelector: '.visualizer-surface',
      },
    ],
    files: [
      {
        name: 'grid-audio-flow.webm',
        category: 'Video',
        size: '2.1 MB',
        path: 'r2://uxqa-artifacts/runs/grid/audio_canvas_flow.webm',
        downloadUrl: 'https://uxqa-artifacts.radoss.agency/runs/grid/audio_canvas_flow.webm',
        description: 'Web Audio synthesis and 1080x1920 canvas render test execution recording',
      },
      {
        name: 'canvas-buffer-dump.png',
        category: 'Screenshot',
        size: '840 KB',
        path: 'r2://uxqa-artifacts/runs/grid/plug_pass_1080x1920.png',
        downloadUrl: '/assets/dom-captures/deepsyque-profile-desktop.svg',
        description: 'Raw RGBA canvas pixel buffer exported during automated WhatsApp pass assertion',
      },
      {
        name: 'audio-context-telemetry.json',
        category: 'Metrics JSON',
        size: '12 KB',
        path: 'r2://uxqa-artifacts/runs/grid/audio_telemetry.json',
        downloadUrl: 'https://uxqa-artifacts.radoss.agency/runs/grid/audio_telemetry.json',
        description: 'Sample rate, buffer underrun count, and latency measurements on cloud headless Chrome',
      },
    ],
  },
  personaFeedback: [
    {
      persona: 'Novice Consumer',
      model: '@cf/meta/llama-3.2-11b-vision-instruct',
      verdict: 'Approved',
      score: 96,
      critique: 'The 1080x1920 WhatsApp Status Plug Pass generator cleanly renders in canvas and downloads with zero stutter on mobile viewport simulations.',
      recommendations: [
        'Ensure the Web Share API fallback button is prominently highlighted for Android Chrome users.'
      ],
    },
    {
      persona: 'Speed Power User',
      model: '@cf/qwen/qwen2.5-coder-32b-instruct',
      verdict: 'Approved',
      score: 99,
      critique: 'Procedural Web Audio engine synthesises Ogene and talking drum transients with zero network audio asset fetch latency.',
      recommendations: [
        'Add a silent audio unlock probe on the first touch gesture to satisfy iOS Web Audio policies.'
      ],
    },
  ],
  uxCopyAudit: [
    {
      selector: '.hero-cta > .btn-generate',
      originalText: 'Synthesize Procedural Audio & Sacred Geometry',
      readabilityGrade: 'Post-graduate (Flesch 28)',
      sentiment: 'High Friction',
      recommendedImprovement: 'Generate My Free Plug Pass',
      expectedConversionLift: '+27.6% creation rate',
    },
    {
      selector: '.canvas-controls > .resolution-tag',
      originalText: 'Export 1080x1920 raster frame buffer',
      readabilityGrade: 'College (Flesch 38)',
      sentiment: 'Confusing',
      recommendedImprovement: 'Download for WhatsApp Status (HD)',
      expectedConversionLift: '+31.2% social shares',
    },
    {
      selector: '.audio-bar > .mode-label',
      originalText: 'Toggle Visual Modes',
      readabilityGrade: 'Grade 6 (Flesch 78)',
      sentiment: 'Neutral',
      recommendedImprovement: 'Switch to Sight Mode (Ledger)',
      expectedConversionLift: '+16.2% engagement',
    },
  ],
};

export const mockDeepSyqueTelemetry: TelemetryRun = {
  id: 'run_ds_20261026_1824',
  project: 'DeepSyque',
  repo: 'github.com/radoss/deepsyque',
  branch: 'main',
  commitSha: '0c16aff10675',
  status: 'passed',
  durationSeconds: 29.5,
  totalTests: 34,
  passedCount: 34,
  failedCount: 0,
  skippedCount: 0,
  timestamp: '2026-10-26 18:24:00 UTC',
  runner: {
    type: 'github-actions-ubuntu',
    nodeVersion: 'v24.2.0',
    localRamUsedMb: 0,
    localCpuUsedPct: 0,
  },
  artifacts: {
    videoUrl: 'https://uxqa-artifacts.radoss.agency/runs/deepsyque/assessment_flow.webm',
    traceUrl: 'https://uiqa-platform.pages.dev/radoss/deepsyque/',
    reportUrl: 'https://uiqa-platform.pages.dev/radoss/deepsyque/',
    screenshotsCount: 8,
    videoDuration: '00:29.5',
    videoSteps: [
      { timestamp: '00:04.2', seconds: 4.2, label: 'Assessment Intake', action: 'page.fill("input#role", "Solutions Architect")', status: 'passed' },
      { timestamp: '00:14.8', seconds: 14.8, label: 'D1 Snapshot Normaliser', action: 'assert(d1Response.status === 200)', status: 'passed' },
      { timestamp: '00:22.1', seconds: 22.1, label: 'Matrix Benchmark Render', action: 'expect(locator(".matrix-table")).toBeVisible()', status: 'passed' },
      { timestamp: '00:29.5', seconds: 29.5, label: 'Candidate Card Export', action: 'click("button.export-card")', status: 'passed' },
    ],
    screenshots: [
      {
        id: 'ds-shot-1',
        title: 'Desktop 1920x1080: Post-Assessment Benchmark Matrix',
        viewport: 'Desktop',
        dimensions: '1920x1080',
        timestamp: '00:22.1',
        sizeKb: 540,
        url: '/assets/dom-captures/apex-fintech-desktop.svg',
        tag: 'Evaluation Pass',
        domSelector: '.matrix-benchmark-grid',
      },
      {
        id: 'ds-shot-2',
        title: 'Mobile 390x844: Candidate Summary Card',
        viewport: 'Mobile 390x844',
        dimensions: '390x844',
        timestamp: '00:29.5',
        sizeKb: 215,
        url: '/assets/dom-captures/apex-fintech-desktop.svg',
        tag: 'Mobile Summary Pass',
        domSelector: '.candidate-card-preview',
      },
    ],
    files: [
      {
        name: 'deepsyque-assessment.webm',
        category: 'Video',
        size: '2.8 MB',
        path: 'r2://uxqa-artifacts/runs/deepsyque/assessment_flow.webm',
        downloadUrl: 'https://uxqa-artifacts.radoss.agency/runs/deepsyque/assessment_flow.webm',
        description: 'Candidate assessment flow and D1 state recovery test execution video',
      },
      {
        name: 'd1-snapshot-dump.json',
        category: 'Metrics JSON',
        size: '24 KB',
        path: 'r2://uxqa-artifacts/runs/deepsyque/d1_snapshot.json',
        downloadUrl: 'https://uxqa-artifacts.radoss.agency/runs/deepsyque/d1_snapshot.json',
        description: 'D1 edge database snapshot verification payload',
      },
    ],
  },
  personaFeedback: [
    {
      persona: 'Skeptical Buyer',
      model: '@cf/meta/llama-3.3-70b-instruct',
      verdict: 'Approved',
      score: 95,
      critique: 'Post-assessment fallback snapshot normaliser verified in D1. Zero client crash observed during intermittent network reconnects.',
      recommendations: [
        'Provide an instant download button for the candidate summary card.'
      ],
    },
  ],
  uxCopyAudit: [
    {
      selector: '.hero-action > .assessment-cta',
      originalText: 'Commence Psychometric Cognitive Evaluation',
      readabilityGrade: 'Post-graduate (Flesch 19)',
      sentiment: 'High Friction',
      recommendedImprovement: 'Take Free 5-Min Career Quiz',
      expectedConversionLift: '+34.8% start rate',
    },
    {
      selector: '.recovery-banner > p',
      originalText: 'Diagnostic state refreshed from cloud database',
      readabilityGrade: 'High School (Flesch 55)',
      sentiment: 'Clear',
      recommendedImprovement: 'Your progress is saved securely. Ready to continue.',
      expectedConversionLift: '+19.4% completion rate',
    },
    {
      selector: '.pricing-card > .tier-subtext',
      originalText: 'Access institutional-grade benchmark matrices',
      readabilityGrade: 'College (Flesch 36)',
      sentiment: 'Neutral',
      recommendedImprovement: 'See salary & hiring benchmarks for your exact role',
      expectedConversionLift: '+22.1% upgrade rate',
    },
  ],
};

export const mockEataliaTelemetry: TelemetryRun = {
  id: 'run_eat_20261025_1410',
  project: 'Eatalia Limited',
  repo: 'github.com/radoss/eatalia-web',
  branch: 'main',
  commitSha: '3a18e5b41f02',
  status: 'passed',
  durationSeconds: 24.1,
  totalTests: 28,
  passedCount: 28,
  failedCount: 0,
  skippedCount: 0,
  timestamp: '2026-10-25 14:10:30 UTC',
  runner: {
    type: 'github-actions-ubuntu',
    nodeVersion: 'v24.2.0',
    localRamUsedMb: 0,
    localCpuUsedPct: 0,
  },
  artifacts: {
    videoUrl: 'https://uxqa-artifacts.radoss.agency/runs/eatalia/menu_order_flow.webm',
    traceUrl: 'https://uiqa-platform.pages.dev/radoss/eatalia/',
    reportUrl: 'https://uiqa-platform.pages.dev/radoss/eatalia/',
    screenshotsCount: 6,
    videoDuration: '00:24.1',
    videoSteps: [
      { timestamp: '00:03.5', seconds: 3.5, label: 'Edge Proxy TTFB Check', action: 'fetch("/api/menu") latency assertion <80ms', status: 'passed' },
      { timestamp: '00:11.2', seconds: 11.2, label: 'Cart Item Selection', action: 'click("button.add-pasta-combo")', status: 'passed' },
      { timestamp: '00:18.0', seconds: 18.0, label: 'Multi-Rail Payment Rails', action: 'expect(locator(".payment-gateways")).toHaveCount(3)', status: 'passed' },
      { timestamp: '00:24.1', seconds: 24.1, label: 'Kitchen Ticket Dispatch', action: 'assert(orderResponse.status === 201)', status: 'passed' },
    ],
    screenshots: [
      {
        id: 'eat-shot-1',
        title: 'Desktop 1920x1080: Yaba QSR Live Menu & Cart',
        viewport: 'Desktop',
        dimensions: '1920x1080',
        timestamp: '00:11.2',
        sizeKb: 680,
        url: '/assets/dom-captures/eatalia-menu-desktop.svg',
        tag: 'Menu Catalog Pass',
        domSelector: '.menu-grid-container',
      },
      {
        id: 'eat-shot-2',
        title: 'Mobile 390x844: Instant Checkout & Payment Gateways',
        viewport: 'Mobile 390x844',
        dimensions: '390x844',
        timestamp: '00:18.0',
        sizeKb: 240,
        url: '/assets/dom-captures/eatalia-checkout-mobile.svg',
        tag: 'Checkout Pass',
        domSelector: '.payment-method-sheet',
      },
    ],
    files: [
      {
        name: 'eatalia-menu-order.webm',
        category: 'Video',
        size: '1.9 MB',
        path: 'r2://uxqa-artifacts/runs/eatalia/menu_order_flow.webm',
        downloadUrl: 'https://uxqa-artifacts.radoss.agency/runs/eatalia/menu_order_flow.webm',
        description: 'Menu ordering and multi-rail African checkout automation execution video',
      },
      {
        name: 'edge-latency-profile.json',
        category: 'Metrics JSON',
        size: '14 KB',
        path: 'r2://uxqa-artifacts/runs/eatalia/edge_latency.json',
        downloadUrl: 'https://uxqa-artifacts.radoss.agency/runs/eatalia/edge_latency.json',
        description: 'TTFB and caching hit-rate statistics across Nigerian network hops',
      },
    ],
  },
  personaFeedback: [
    {
      persona: 'Novice Consumer',
      model: '@cf/meta/llama-3.2-11b-vision-instruct',
      verdict: 'Approved',
      score: 97,
      critique: 'QSR meal combo selector is intuitive. Cloudflare edge proxy maintains sub-80ms TTFB across Nigeria local network routes.',
      recommendations: [
        'Highlight the WhatsApp order bridge button for rapid mobile checkout.'
      ],
    },
  ],
  uxCopyAudit: [
    {
      selector: '.menu-header > .cta-order',
      originalText: 'Initialize Remote Food Order Protocol',
      readabilityGrade: 'College (Flesch 32)',
      sentiment: 'High Friction',
      recommendedImprovement: 'Order Hot Meals Now (15-Min Delivery)',
      expectedConversionLift: '+29.3% order conversions',
    },
    {
      selector: '.checkout-btn',
      originalText: 'Proceed to Payment Gateway',
      readabilityGrade: 'Grade 7 (Flesch 72)',
      sentiment: 'Neutral',
      recommendedImprovement: 'Pay with Card, Bank Transfer or Cash on Delivery',
      expectedConversionLift: '+21.5% checkout completion',
    },
    {
      selector: '.delivery-tracker > .status-badge',
      originalText: 'Kitchen packet dispatch queued at origin',
      readabilityGrade: 'Grade 9 (Flesch 62)',
      sentiment: 'Confusing',
      recommendedImprovement: 'Chef is preparing your fresh meal in Yaba',
      expectedConversionLift: '+18.0% satisfaction rating',
    },
  ],
};

export const mockTelemetryRegistry: Record<string, TelemetryRun> = {
  'aira-academy': mockAiraTelemetry,
  'naija-grid': mockNaijaGridTelemetry,
  'deepsyque': mockDeepSyqueTelemetry,
  'eatalia': mockEataliaTelemetry,
};
