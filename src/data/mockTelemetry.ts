import { TelemetryRun } from '../types';

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
      ]
    },
    {
      persona: 'Speed Power User',
      model: '@cf/qwen/qwen2.5-coder-32b-instruct',
      verdict: 'Approved',
      score: 98,
      critique: 'Fast keyboard navigation (Tab/Shift+Tab) verified across all 150 lesson items. Zero layout jitter during rapid search filtering.',
      recommendations: [
        'Expose Command+K shortcut on the search bar for desktop power users.'
      ]
    },
    {
      persona: 'Skeptical Buyer',
      model: '@cf/meta/llama-3.3-70b-instruct',
      verdict: 'Friction Detected',
      score: 87,
      critique: 'The affiliate program disclosure in AFFILIATE_PROGRAMS.md is crystal clear, but the certificate validation link is subtly placed below the fold.',
      recommendations: [
        'Elevate the Nak / Uchenna / Tim certification badge higher on the primary landing viewport.'
      ]
    }
  ],
  uxCopyAudit: [
    {
      selector: 'header > .cta-primary',
      originalText: 'Initialize Agentic Curriculum',
      readabilityGrade: 'College (Flesch 42)',
      sentiment: 'High Friction',
      recommendedImprovement: 'Start Learning Now (Free)',
      expectedConversionLift: '+23.4% click-through'
    },
    {
      selector: '.track-card-2 > .time-badge',
      originalText: 'Est. 14hr commitment over 30 sessions',
      readabilityGrade: 'Grade 8 (Flesch 68)',
      sentiment: 'Neutral',
      recommendedImprovement: '30 bite-sized lessons • Under 25 mins daily',
      expectedConversionLift: '+14.1% enrollment rate'
    },
    {
      selector: '.auth-modal > .help-subtext',
      originalText: 'PBKDF2 encrypted credential verification',
      readabilityGrade: 'Post-graduate (Flesch 24)',
      sentiment: 'Confusing',
      recommendedImprovement: 'Bank-grade encrypted login. We never share your data.',
      expectedConversionLift: '+18.8% form completion'
    }
  ]
};
