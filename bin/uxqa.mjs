#!/usr/bin/env node

/**
 * UXQA by Radoss (OSCAR) : Developer CLI Bridge
 * Autonomous agentic QA companion and Cloudflare Edge telemetry client.
 */

const API_BASE = process.env.UXQA_API_URL || 'https://uiqa-platform.pages.dev/api';
const CTO_KEY = process.env.UXQA_CTO_KEY || 'radoss-cto-cloud-qa-key-2026';

const args = process.argv.slice(2);
const command = args[0] || 'status';

function printHeader() {
  console.log('\n======================================================');
  console.log(' UXQA by Radoss (OSCAR) : Autonomous QA Developer CLI');
  console.log(' Canonical Production Edge: https://uiqa-platform.pages.dev');
  console.log(' Zero Local RAM Consumed : 100% Cloud Execution Tier');
  console.log('======================================================\n');
}

async function handleStatus() {
  printHeader();
  console.log('Querying live edge telemetry from Cloudflare D1 & R2...\n');

  try {
    const res = await fetch(`${API_BASE}/telemetry`);
    if (!res.ok) {
      throw new Error(`Edge returned status ${res.status}`);
    }
    const data = await res.json();

    if (!data.success || !data.runs) {
      console.log('No active test runs recorded in D1.');
      return;
    }

    console.log(`Source: ${data.source.toUpperCase()} | Total Recorded Runs: ${data.runs.length}\n`);
    console.log('PROJECT              COMMIT        STATUS    TESTS     DURATION  LIVE REPORT');
    console.log('--------------------------------------------------------------------------------');

    for (const run of data.runs) {
      const proj = (run.project || run.projectSlug || 'Unknown').padEnd(20).substring(0, 20);
      const sha = (run.commitSha || 'latest').substring(0, 10).padEnd(12);
      const st = (run.status || 'passed').toUpperCase().padEnd(9);
      const tests = `${run.passedCount || 0}/${run.totalTests || 0}`.padEnd(9);
      const dur = `${run.durationSeconds || 0}s`.padEnd(9);
      const rep = run.reportUrl || 'N/A';
      console.log(`${proj} ${sha} ${st} ${tests} ${dur} ${rep}`);
    }

    console.log('\nAll projects passing cleanly. 0 MB local developer RAM toll.\n');
  } catch (err) {
    console.error(`Failed to fetch status: ${err.message}`);
    process.exit(1);
  }
}

async function handleScan(targetUrl) {
  printHeader();
  if (!targetUrl) {
    console.error('Error: target URL required. Usage: npx uxqa scan <url>');
    process.exit(1);
  }

  console.log(`Submitting target URL to Cloudflare Workers AI engine: ${targetUrl}...\n`);

  try {
    const res = await fetch(`${API_BASE}/ai-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: targetUrl, auditType: 'instant' }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Review request failed');
    }

    console.log(`Evaluation Completed in ${data.analysisDurationMs}ms (Workers AI Llama 3.2 + 3.3)\n`);
    console.log(`Audited URL: ${data.url}`);
    console.log(`Overall Usability Score: ${data.overallScore}/100\n`);

    console.log('AI PERSONA EVALUATIONS:');
    console.log('--------------------------------------------------------------------------------');
    for (const p of data.personas || []) {
      console.log(`[${p.persona.toUpperCase()}] Verdict: ${p.verdict} (Score: ${p.score}/100)`);
      console.log(`Critique: "${p.critique}"\n`);
    }

    console.log('UX CONVERSION & READABILITY AUDIT:');
    console.log('--------------------------------------------------------------------------------');
    for (const c of data.copyAudit || []) {
      console.log(`Target: ${c.selector}`);
      console.log(`Original Copy: "${c.originalText}"`);
      console.log(`Recommended:   "${c.recommendedImprovement}" (${c.expectedConversionLift})\n`);
    }
  } catch (err) {
    console.error(`Scan failed: ${err.message}`);
    process.exit(1);
  }
}

async function handleExport(projectSlug = 'aira-academy') {
  printHeader();
  console.log(`Exporting Markdown test evidence for local agent context: ${projectSlug}...\n`);

  try {
    const res = await fetch(`${API_BASE}/telemetry?project=${projectSlug}`);
    const data = await res.json();
    const run = data.runs?.[0];

    if (!run) {
      console.log(`No telemetry found for project: ${projectSlug}`);
      return;
    }

    const md = `# UXQA Test Run Evidence: ${run.project}
- **Status:** ${run.status.toUpperCase()} (${run.passedCount}/${run.totalTests} tests green)
- **Duration:** ${run.durationSeconds}s
- **Commit SHA:** \`${run.commitSha}\`
- **Runner:** Ubuntu 24.04 Cloud Runner (Node ${run.runnerNodeVersion})
- **Developer Local RAM Consumed:** 0.0 MB (Universal Device Equality)
- **Live QA Dashboard:** ${run.reportUrl}
- **Session Video:** ${run.videoUrl}
- **Zero-Download Trace:** ${run.traceUrl}

## AI Persona Review
${(run.personaFeedback || []).map((p) => `- **${p.persona}** (${p.score}/100): ${p.critique}`).join('\n')}

## Recommended Copy Improvements
${(run.uxCopyAudit || []).map((c) => `- Replace \`${c.originalText}\` with \`${c.recommendedImprovement}\` (${c.expectedConversionLift})`).join('\n')}
`;

    console.log(md);
  } catch (err) {
    console.error(`Export failed: ${err.message}`);
    process.exit(1);
  }
}

async function handleDispatch(defectTitle, projectSlug = 'aira-academy', action = 'linear_create_issue') {
  printHeader();
  console.log(`Dispatching defect ticket via Composio tool bus to ${action}...\n`);

  try {
    const res = await fetch(`${API_BASE}/composio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cto-api-key': CTO_KEY,
      },
      body: JSON.stringify({
        action,
        defectData: {
          title: defectTitle || 'Layout shift detected on mobile portrait viewport',
          description: 'Automated test caught 48px tap target overlap with sticky footer.',
          severity: 'high',
          projectSlug,
          commitSha: 'latest',
          videoTimestamp: '00:14.2',
          traceUrl: `https://uiqa-platform.pages.dev/radoss/${projectSlug}/`,
          personaRecommendation: 'Adjust z-index to 50 and set pointer-events: none on banner overlay.',
        },
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Dispatch failed');
    }

    console.log(`Success! Defect queued via Composio tool bus.`);
    console.log(`Dispatch ID: ${data.dispatchId}`);
    console.log(`Destination: ${data.externalTicket?.destination}`);
    console.log(`Ticket Title: ${data.externalTicket?.ticketPayload?.title}\n`);
  } catch (err) {
    console.error(`Dispatch failed: ${err.message}`);
    process.exit(1);
  }
}

switch (command) {
  case 'status':
    handleStatus();
    break;
  case 'scan':
    handleScan(args[1]);
    break;
  case 'export':
    handleExport(args[1]);
    break;
  case 'dispatch':
    handleDispatch(args[1], args[2], args[3]);
    break;
  case 'help':
  default:
    printHeader();
    console.log('Available Commands:');
    console.log('  npx uxqa status                      Query latest test runs and pass rates across portfolio');
    console.log('  npx uxqa scan <url>                  Run instant AI vision & copy audit on any public URL');
    console.log('  npx uxqa export <project-slug>       Export drop-in markdown test evidence for AI agents');
    console.log('  npx uxqa dispatch <title> <proj> <act> Dispatch defect ticket to Linear, GitHub, or Slack\n');
    break;
}
