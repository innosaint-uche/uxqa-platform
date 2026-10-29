export interface Env {
  DB: D1Database;
  ARTIFACTS?: R2Bucket;
  AI?: any;
  CTO_API_KEY?: string;
  SUPER_ADMIN_EMAILS?: string;
}

export interface WaitlistPayload {
  fullName: string;
  workEmail: string;
  organization?: string;
  role: string;
  productName: string;
  productionUrl?: string;
  repoUrl?: string;
  techStack?: string;
  targetPersona: string;
  topPainPoint: string;
  reviewRigor: string;
  referralSource?: string;
}

export interface TelemetryPayload {
  projectId: string;
  branch: string;
  commitSha: string;
  status: 'passed' | 'failed' | 'running';
  durationSeconds: number;
  totalTests: number;
  passedCount: number;
  failedCount: number;
  skippedCount: number;
  runnerNodeVersion: string;
  videoUrl?: string;
  traceUrl?: string;
  reportUrl?: string;
  personaFeedback?: any[];
  uxCopyAudit?: any[];
}
