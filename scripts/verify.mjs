import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('=== UXQA VERIFICATION GATE (npm run verify) ===\n');

let failed = false;

function step(name, fn) {
  process.stdout.write(`[ ] ${name}... `);
  try {
    fn();
    console.log('✓ PASS');
  } catch (err) {
    console.log('✗ FAIL');
    console.error(err.message);
    failed = true;
  }
}

// 1. Check Authority Files
step('Authority files exist', () => {
  const required = [
    'AGENTS.md',
    'PROJECT_JOURNAL.md',
    'package.json',
    'docs/ARCHITECTURE.md',
    'docs/MCIA_PRODUCT_RESEARCH_AND_MARKET_STRATEGY.md',
    'docs/PARTNERSHIPS_AND_COMPETITIVE_RESEARCH.md',
    'docs/UX_WRITING_SYSTEM.md'
  ];
  for (const file of required) {
    if (!fs.existsSync(file)) {
      throw new Error(`Missing required authority file: ${file}`);
    }
  }
});

// 2. Anti-Bloat: Check for banned tracking files
step('Anti-bloat banned files check', () => {
  const banned = [
    'OMISSIONS.md',
    'ERRORS.md',
    'EXECUTION_TRACKER.md',
    'ROADMAP_AND_FIXES.md',
    'PROCESS_CONTINUITY.md',
    'walkthrough.md'
  ];
  for (const b of banned) {
    if (fs.existsSync(b)) {
      throw new Error(`Found banned tracking file: ${b}`);
    }
  }
});

// 3. Em Dash Audit
step('Zero em dash audit in markdown and source', () => {
  const checkDir = (dir) => {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      if (f.startsWith('.') || f === 'node_modules' || f === 'dist') continue;
      const full = path.join(dir, f);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        checkDir(full);
      } else if (f.endsWith('.md') || f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.json')) {
        const content = fs.readFileSync(full, 'utf-8');
        if (content.includes('—')) {
          throw new Error(`Found banned em dash in ${full}`);
        }
      }
    }
  };
  checkDir('.');
});

// 4. Swiss Grid Radius Check
step('Swiss Grid (0px radius) enforcement', () => {
  const indexCss = fs.readFileSync('src/index.css', 'utf-8');
  if (!indexCss.includes('--radius: 0px') || !indexCss.includes('border-radius: 0px !important')) {
    throw new Error('src/index.css does not strictly enforce 0px border radius');
  }
});

// 5. TypeScript Compilation & Vite Build
step('TypeScript typecheck and Vite production build', () => {
  execSync('npm run build', { stdio: 'pipe' });
});

// 6. Cloudflare Pages Functions Typecheck
step('Cloudflare Pages Functions typecheck', () => {
  execSync('npx tsc --project functions/tsconfig.json --noEmit', { stdio: 'pipe' });
});

console.log('\n----------------------------------------');
if (failed) {
  console.error('❌ VERIFICATION FAILED. Correct issues before proceeding.');
  process.exit(1);
} else {
  console.log('✅ ALL VERIFICATION GATES PASSED (100% CLEAN).');
  console.log('----------------------------------------\n');
}
