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
    traceUrl: 'https://trace.playwright.dev/?trace=https://uxqa-artifacts.radoss.agency/runs/aira/trace.zip',
    reportUrl: 'https://aura-academy-qa.pages.dev',
    screenshotsCount: 18,
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
    traceUrl: 'https://trace.playwright.dev/?trace=https://uxqa-artifacts.radoss.agency/runs/grid/trace.zip',
    reportUrl: 'https://aura-academy-qa.pages.dev',
    screenshotsCount: 12,
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
      selector: '.theme-toggle > span',
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
    traceUrl: 'https://trace.playwright.dev/?trace=https://uxqa-artifacts.radoss.agency/runs/deepsyque/trace.zip',
    reportUrl: 'https://aura-academy-qa.pages.dev',
    screenshotsCount: 8,
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
      selector: '.recovery-banner > p',
      originalText: 'Diagnostic state refreshed from cloud database',
      readabilityGrade: 'High School (Flesch 55)',
      sentiment: 'Clear',
      recommendedImprovement: 'Your progress is saved securely. Ready to continue.',
      expectedConversionLift: '+12.5% recovery rate',
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
    traceUrl: 'https://trace.playwright.dev/?trace=https://uxqa-artifacts.radoss.agency/runs/eatalia/trace.zip',
    reportUrl: 'https://aura-academy-qa.pages.dev',
    screenshotsCount: 6,
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
      selector: '.checkout-btn',
      originalText: 'Proceed to Payment Gateway',
      readabilityGrade: 'Grade 7 (Flesch 72)',
      sentiment: 'Neutral',
      recommendedImprovement: 'Order Now & Pay on Delivery / Card',
      expectedConversionLift: '+19.3% checkout conversions',
    },
  ],
};

export const mockTelemetryRegistry: Record<string, TelemetryRun> = {
  'aira-academy': mockAiraTelemetry,
  'naija-grid': mockNaijaGridTelemetry,
  'deepsyque': mockDeepSyqueTelemetry,
  'eatalia': mockEataliaTelemetry,
};
