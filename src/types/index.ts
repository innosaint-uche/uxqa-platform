export interface TelemetryRun {
  id: string;
  project: string;
  repo: string;
  branch: string;
  commitSha: string;
  status: 'passed' | 'failed' | 'running';
  durationSeconds: number;
  totalTests: number;
  passedCount: number;
  failedCount: number;
  skippedCount: number;
  timestamp: string;
  runner: {
    type: 'github-actions-ubuntu';
    nodeVersion: string;
    localRamUsedMb: 0;
    localCpuUsedPct: 0;
  };
  artifacts: {
    videoUrl: string;
    traceUrl: string;
    reportUrl: string;
    screenshotsCount: number;
    videoDuration?: string;
    videoSteps?: VideoActionStep[];
    screenshots?: TestScreenshot[];
    files?: TestArtifactFile[];
  };
  personaFeedback: PersonaReview[];
  uxCopyAudit: CopyAuditItem[];
}

export interface TestArtifactFile {
  name: string;
  category: 'Video' | 'DOM Snapshot' | 'Network HAR' | 'Console Logs' | 'Metrics JSON' | 'Screenshot';
  size: string;
  path: string;
  downloadUrl: string;
  description: string;
}

export interface TestScreenshot {
  id: string;
  title: string;
  viewport: string;
  dimensions: string;
  timestamp: string;
  sizeKb: number;
  url: string;
  tag: string;
  domSelector?: string;
}

export interface VideoActionStep {
  timestamp: string;
  seconds: number;
  label: string;
  action: string;
  status: 'passed' | 'failed';
}

export interface TestPlanStep {
  id: string;
  order: number;
  type: 'navigate' | 'click' | 'fill' | 'assert_text' | 'assert_visible' | 'check_a11y' | 'screenshot';
  targetSelector?: string;
  expectedValue?: string;
  description: string;
  timeoutMs?: number;
}

export interface TestPlan {
  id: string;
  projectId: string;
  projectSlug?: string;
  title: string;
  targetUrl: string;
  version: string;
  viewport: 'desktop' | 'mobile' | 'responsive';
  steps: TestPlanStep[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PersonaReview {
  persona: 'Novice Consumer' | 'Speed Power User' | 'Skeptical Buyer' | 'QA Executive';
  model: string;
  verdict: 'Approved' | 'Friction Detected' | 'Blocking Leak';
  score: number; // 0-100
  critique: string;
  recommendations: string[];
}

export interface CopyAuditItem {
  selector: string;
  originalText: string;
  readabilityGrade: string;
  sentiment: 'Neutral' | 'Confusing' | 'High Friction' | 'Clear';
  recommendedImprovement: string;
  expectedConversionLift: string;
}

export interface IntakeSubmission {
  fullName: string;
  workEmail: string;
  organization: string;
  role: 'Vibe Coder' | 'Solo Founder' | 'Product Marketer / Growth' | 'Engineering Lead' | 'Product Lead' | 'Agency Owner';
  productName: string;
  productionUrl: string;
  repoUrl: string;
  techStack: string;
  targetPersona: 'Non-technical Consumer' | 'B2B Professional' | 'Developer';
  topPainPoint: string;
  reviewRigor: 'Polish & Usability' | 'Strict Breakage & Security' | 'Full Executive Suite';
  referralSource: string;
}
