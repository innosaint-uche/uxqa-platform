import React, { useState } from 'react';
import { 
  Play, 
  Save, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Globe, 
  ExternalLink,
  RefreshCw,
  Check
} from 'lucide-react';
import { TestPlanStep, TestPlan } from '../types';

interface JourneyPlanBuilderProps {
  initialProjectSlug?: string;
  initialTargetUrl?: string;
  onExecutionComplete?: (runId: string) => void;
}

const DEFAULT_STEPS: TestPlanStep[] = [
  {
    id: 'step-1',
    order: 1,
    type: 'navigate',
    description: 'Initialise session and handshake with target production edge',
    timeoutMs: 5000,
  },
  {
    id: 'step-2',
    order: 2,
    type: 'assert_visible',
    targetSelector: 'h1',
    expectedValue: 'visible',
    description: 'Verify primary conversion hero title is rendered in viewport',
  },
  {
    id: 'step-3',
    order: 3,
    type: 'check_a11y',
    targetSelector: 'meta[name=viewport]',
    expectedValue: 'width=device-width',
    description: 'Audit mobile viewport tag and tap target compliance',
  },
  {
    id: 'step-4',
    order: 4,
    type: 'screenshot',
    targetSelector: 'body',
    expectedValue: 'full_page',
    description: 'Record full-page visual regression frame into edge storage',
  },
];

export const JourneyPlanBuilder: React.FC<JourneyPlanBuilderProps> = ({
  initialProjectSlug = 'aira-academy',
  initialTargetUrl = 'https://aira.radoss.agency',
  onExecutionComplete,
}) => {
  const [projectSlug, setProjectSlug] = useState(initialProjectSlug);
  const [targetUrl, setTargetUrl] = useState(initialTargetUrl);
  const [journeyTitle, setJourneyTitle] = useState('Core Buyer Conversion Flow');
  const [viewport, setViewport] = useState<'desktop' | 'mobile' | 'responsive'>('responsive');
  const [steps, setSteps] = useState<TestPlanStep[]>(DEFAULT_STEPS);

  // Persistence State
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Execution State
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<any | null>(null);
  const [executionError, setExecutionError] = useState<string | null>(null);

  // Add a new step
  const handleAddStep = (type: TestPlanStep['type'] = 'assert_visible') => {
    const nextOrder = steps.length + 1;
    const newStep: TestPlanStep = {
      id: `step-${Date.now().toString(36)}`,
      order: nextOrder,
      type,
      description: 
        type === 'assert_visible' ? 'Verify element is present in DOM' :
        type === 'assert_text' ? 'Verify conversion copy matches assertion' :
        type === 'click' ? 'Click conversion CTA button' :
        type === 'check_a11y' ? 'Verify responsive layout and image alt tags' :
        type === 'screenshot' ? 'Capture visual screenshot frame' : 'Navigate to route',
      targetSelector: type === 'assert_visible' ? 'button, a' : undefined,
      expectedValue: type === 'assert_text' ? 'Get Started' : undefined,
    };
    setSteps([...steps, newStep]);
  };

  // Remove a step
  const handleRemoveStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index).map((s, idx) => ({
      ...s,
      order: idx + 1,
    }));
    setSteps(updated);
  };

  // Move step up
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...steps];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setSteps(updated.map((s, idx) => ({ ...s, order: idx + 1 })));
  };

  // Move step down
  const handleMoveDown = (index: number) => {
    if (index === steps.length - 1) return;
    const updated = [...steps];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setSteps(updated.map((s, idx) => ({ ...s, order: idx + 1 })));
  };

  // Update step field
  const handleUpdateStep = (index: number, field: keyof TestPlanStep, value: any) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  // Vibe Coder Auto-Assistant: One-click generate realistic test journey
  const handleAutoGenerateJourney = () => {
    let urlHint = targetUrl.toLowerCase();
    let siteName = 'Application';
    if (urlHint.includes('aira')) siteName = 'AIRA Academy';
    else if (urlHint.includes('naija')) siteName = 'Naija Grid';
    else if (urlHint.includes('deepsyque')) siteName = 'DeepSyque';
    else if (urlHint.includes('eatalia')) siteName = 'Eatalia';

    setJourneyTitle(`${siteName} Critical Conversion & Layout Journey`);
    setSteps([
      {
        id: `step-${Date.now()}-1`,
        order: 1,
        type: 'navigate',
        description: `Fetch ${siteName} production URL and verify edge handshake latency`,
        timeoutMs: 5000,
      },
      {
        id: `step-${Date.now()}-2`,
        order: 2,
        type: 'assert_visible',
        targetSelector: 'h1',
        expectedValue: 'visible',
        description: 'Verify primary value proposition heading is rendered above the fold',
      },
      {
        id: `step-${Date.now()}-3`,
        order: 3,
        type: 'assert_visible',
        targetSelector: 'button',
        expectedValue: 'visible',
        description: 'Validate presence of interactive call-to-action buttons',
      },
      {
        id: `step-${Date.now()}-4`,
        order: 4,
        type: 'check_a11y',
        targetSelector: 'meta[name=viewport]',
        expectedValue: 'width=device-width',
        description: 'Inspect mobile viewport declaration and tap target boundaries',
      },
      {
        id: `step-${Date.now()}-5`,
        order: 5,
        type: 'screenshot',
        targetSelector: 'body',
        expectedValue: 'full_page',
        description: 'Capture full-page baseline image for visual bug regression tracking',
      },
    ]);
  };

  // Save Test Plan to D1
  const handleSaveToD1 = async () => {
    setIsSaving(true);
    setSaveSuccess(null);
    setSaveError(null);

    const planPayload: TestPlan = {
      id: `plan_${projectSlug}_${Date.now().toString(36)}`,
      projectId: projectSlug,
      projectSlug,
      title: journeyTitle,
      targetUrl,
      version: 'v1.1',
      viewport,
      steps,
    };

    try {
      const res = await fetch('/api/test-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planPayload),
      });

      const data = await res.json();
      if (data.success) {
        setSaveSuccess(`Journey plan saved to Cloudflare D1 ledger (${data.planId})`);
        setTimeout(() => setSaveSuccess(null), 4000);
      } else {
        setSaveError(data.error || 'Failed to save test plan to edge database.');
      }
    } catch (err: any) {
      setSaveError(err.message || 'Network error communicating with D1.');
    } finally {
      setIsSaving(false);
    }
  };

  // Run Journey Live on Cloudflare Edge
  const handleRunJourneyLive = async () => {
    setIsRunning(true);
    setExecutionResult(null);
    setExecutionError(null);

    try {
      const res = await fetch('/api/run-journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectSlug,
          targetUrl,
          title: journeyTitle,
          viewport,
          steps,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setExecutionResult(data);
        if (onExecutionComplete && data.runId) {
          onExecutionComplete(data.runId);
        }
      } else {
        setExecutionError(data.error || 'Failed to execute live journey.');
      }
    } catch (err: any) {
      setExecutionError(err.message || 'Execution request failed.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Builder Header Card */}
      <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 dark:border-swiss-border gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold mb-1">
              <span>VISUAL JOURNEY &amp; TEST PLAN BUILDER</span>
              <span>•</span>
              <span className="text-gray-500 font-normal">Zero-Code Vibe Coder Architecture</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Compose &amp; Execute Autonomous Test Journeys
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-3xl leading-relaxed">
              Define user journeys visually without touching Next.js or Playwright code. Saved versioned plans persist directly into Cloudflare D1 with zero local client RAM consumed.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAutoGenerateJourney}
              className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-mono text-xs font-semibold flex items-center space-x-1.5 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              title="Auto-draft journey based on target URL"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>AI Auto-Draft</span>
            </button>
            <button
              onClick={handleSaveToD1}
              disabled={isSaving}
              className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#181a20] dark:hover:bg-[#20232b] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-swiss-border font-mono text-xs font-semibold flex items-center space-x-1.5 transition-colors disabled:opacity-50"
            >
              {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />}
              <span>{isSaving ? 'Saving...' : 'Save plan'}</span>
            </button>
            <button
              onClick={handleRunJourneyLive}
              disabled={isRunning}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm disabled:opacity-50"
            >
              {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isRunning ? 'Running on Edge...' : 'Run Journey Live'}</span>
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        {saveSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-mono flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{saveSuccess}</span>
          </div>
        )}
        {saveError && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 text-xs font-mono flex items-center space-x-2">
            <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{saveError}</span>
          </div>
        )}
        {executionError && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 text-xs font-mono flex items-center space-x-2">
            <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{executionError}</span>
          </div>
        )}

        {/* Configuration Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6">
          <div>
            <label className="block text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-1">
              Target Project
            </label>
            <select
              value={projectSlug}
              onChange={(e) => setProjectSlug(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#0a0a0c] border border-gray-300 dark:border-swiss-border px-3 py-2 text-xs font-mono text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
            >
              <option value="aira-academy">AIRA Academy (radoss/aira-academy)</option>
              <option value="naija-grid">Naija Grid (radoss/naija-grid)</option>
              <option value="deepsyque">DeepSyque (radoss/deepsyque)</option>
              <option value="eatalia-ng">Eatalia Limited (radoss/eatalia-ng)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-1">
              Journey Title
            </label>
            <input
              type="text"
              value={journeyTitle}
              onChange={(e) => setJourneyTitle(e.target.value)}
              placeholder="e.g. Critical Buyer Checkout Flow"
              className="w-full bg-gray-50 dark:bg-[#0a0a0c] border border-gray-300 dark:border-swiss-border px-3 py-2 text-xs font-mono text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-1">
              Production Target URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-gray-50 dark:bg-[#0a0a0c] border border-gray-300 dark:border-swiss-border px-3 py-2 text-xs font-mono text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 pl-7"
              />
              <Globe className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-1">
              Test Viewport Simulation
            </label>
            <select
              value={viewport}
              onChange={(e) => setViewport(e.target.value as any)}
              className="w-full bg-gray-50 dark:bg-[#0a0a0c] border border-gray-300 dark:border-swiss-border px-3 py-2 text-xs font-mono text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
            >
              <option value="desktop">Desktop Workstation (1920x1080)</option>
              <option value="mobile">Mobile Handheld (iPhone 16: 390x844)</option>
              <option value="responsive">Responsive (Fluid Width)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step Sequence Editor */}
      <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 transition-colors">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-swiss-border">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white font-mono">
              Journey Steps Sequence ({steps.length} Actions)
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              Drag, reorder, or customize individual browser assertions and actions executed on the Cloudflare edge runner.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleAddStep('assert_visible')}
              className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-[#181a20] dark:hover:bg-[#222630] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-swiss-border font-mono flex items-center space-x-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Add Assertion</span>
            </button>
            <button
              onClick={() => handleAddStep('check_a11y')}
              className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-[#181a20] dark:hover:bg-[#222630] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-swiss-border font-mono flex items-center space-x-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Add A11y Check</span>
            </button>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="p-4 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
            >
              {/* Order Badge & Type */}
              <div className="flex items-center space-x-3 min-w-[200px]">
                <span className="w-6 h-6 bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {step.order}
                </span>
                <div>
                  <select
                    value={step.type}
                    onChange={(e) => handleUpdateStep(index, 'type', e.target.value)}
                    className="bg-white dark:bg-[#111215] border border-gray-300 dark:border-swiss-border text-xs font-mono font-bold text-gray-900 dark:text-white px-2 py-1 focus:outline-none"
                  >
                    <option value="navigate">Check Page Loads (HTTP 200)</option>
                    <option value="assert_visible">Check Element Appears</option>
                    <option value="assert_text">Verify Text / Copy</option>
                    <option value="click">Click a Button or Link</option>
                    <option value="fill">Enter Form Text</option>
                    <option value="check_a11y">Audit Mobile Viewport &amp; Images</option>
                    <option value="screenshot">Capture Screen State</option>
                  </select>
                </div>
              </div>

              {/* Step Parameters */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 uppercase">Action Description</label>
                  <input
                    type="text"
                    value={step.description}
                    onChange={(e) => handleUpdateStep(index, 'description', e.target.value)}
                    className="w-full bg-white dark:bg-[#111215] border border-gray-300 dark:border-swiss-border text-xs font-mono px-2 py-1 text-gray-900 dark:text-white"
                  />
                </div>

                {step.type !== 'navigate' && step.type !== 'screenshot' && (
                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <label className="block text-[10px] font-mono text-gray-500 uppercase">Target Element</label>
                      <div className="flex space-x-1 text-[9px] font-mono text-blue-600 dark:text-blue-400">
                        <button type="button" onClick={() => handleUpdateStep(index, 'targetSelector', 'h1')} className="hover:underline">h1</button>
                        <span>•</span>
                        <button type="button" onClick={() => handleUpdateStep(index, 'targetSelector', 'button')} className="hover:underline">button</button>
                        <span>•</span>
                        <button type="button" onClick={() => handleUpdateStep(index, 'targetSelector', 'input')} className="hover:underline">input</button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={step.targetSelector || ''}
                      onChange={(e) => handleUpdateStep(index, 'targetSelector', e.target.value)}
                      placeholder="e.g. button, h1, a, or .cta-button"
                      className="w-full bg-white dark:bg-[#111215] border border-gray-300 dark:border-swiss-border text-xs font-mono px-2 py-1 text-gray-900 dark:text-white"
                    />
                  </div>
                )}

                {(step.type === 'assert_text' || step.type === 'fill' || step.type === 'check_a11y') && (
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase">Expected Value</label>
                    <input
                      type="text"
                      value={step.expectedValue || ''}
                      onChange={(e) => handleUpdateStep(index, 'expectedValue', e.target.value)}
                      placeholder="Expected string or constraint"
                      className="w-full bg-white dark:bg-[#111215] border border-gray-300 dark:border-swiss-border text-xs font-mono px-2 py-1 text-gray-900 dark:text-white"
                    />
                  </div>
                )}
              </div>

              {/* Step Controls */}
              <div className="flex items-center space-x-1.5 flex-shrink-0">
                <button
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1.5 bg-white dark:bg-[#111215] border border-gray-300 dark:border-swiss-border text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30"
                  title="Move Step Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMoveDown(index)}
                  disabled={index === steps.length - 1}
                  className="p-1.5 bg-white dark:bg-[#111215] border border-gray-300 dark:border-swiss-border text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30"
                  title="Move Step Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleRemoveStep(index)}
                  className="p-1.5 bg-white dark:bg-[#111215] border border-gray-300 dark:border-swiss-border text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                  title="Remove Step"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Execution Telemetry Results (Appears after execution) */}
      {executionResult && (
        <div className="bg-white dark:bg-[#111215] border-2 border-blue-600 dark:border-blue-500 p-6 sm:p-8 space-y-6 transition-colors shadow-lg">
          
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 dark:border-swiss-border gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold mb-1">
                <span>LIVE EDGE TELEMETRY RECORD</span>
                <span>•</span>
                <span className="text-gray-500">{executionResult.runId}</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Live Journey Results: {executionResult.pageTitle || executionResult.targetUrl}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Target URL: <code className="text-blue-600 dark:text-blue-400">{executionResult.targetUrl}</code> • Edge Latency: <span className="font-bold text-gray-900 dark:text-white">{executionResult.edgeLatencyMs}ms</span>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1.5 font-mono text-xs font-bold border flex items-center space-x-1.5 ${
                executionResult.status === 'passed'
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                  : 'bg-red-50 dark:bg-red-950/80 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800'
              }`}>
                {executionResult.status === 'passed' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span>{executionResult.status.toUpperCase()} ({executionResult.passedCount}/{executionResult.totalSteps} PASS)</span>
              </span>

              {executionResult.d1Recorded && (
                <span className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-mono text-xs font-semibold flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>D1 Ledger Committed</span>
                </span>
              )}
            </div>
          </div>

          {/* KPI Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
              <div className="text-[10px] font-mono text-gray-500 uppercase">HTTP Handshake</div>
              <div className="text-base font-mono font-bold text-gray-900 dark:text-white mt-0.5">
                {executionResult.httpStatus} OK
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Total Edge Time</div>
              <div className="text-base font-mono font-bold text-gray-900 dark:text-white mt-0.5">
                {executionResult.durationSeconds}s
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Local RAM Toll</div>
              <div className="text-base font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                0.0 MB (Cloud)
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Interactive Elements</div>
              <div className="text-base font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                {executionResult.meta?.buttonCount || 0} Buttons • {executionResult.meta?.linkCount || 0} Links
              </div>
            </div>
          </div>

          {/* Step Execution Telemetry Table */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
              Step Execution Breakdown
            </h4>
            <div className="overflow-x-auto border border-gray-200 dark:border-swiss-border">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-gray-100 dark:bg-[#0a0a0c] text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-swiss-border uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3">Observed Telemetry</th>
                    <th className="py-2.5 px-3">Duration</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-swiss-border">
                  {executionResult.stepsExecuted.map((s: any) => (
                    <tr key={s.stepId} className="hover:bg-gray-50 dark:hover:bg-[#14161c]">
                      <td className="py-2.5 px-3 font-bold">{s.order}</td>
                      <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">{s.type}</td>
                      <td className="py-2.5 px-3 text-gray-800 dark:text-gray-200">{s.description}</td>
                      <td className="py-2.5 px-3 text-gray-600 dark:text-gray-400">{s.details}</td>
                      <td className="py-2.5 px-3 text-gray-500">{s.durationMs}ms</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className={`px-2 py-0.5 text-[10px] font-bold border ${
                          s.status === 'passed'
                            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                            : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800'
                        }`}>
                          {s.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Persona Audit Card */}
          {executionResult.personaFeedback && executionResult.personaFeedback.length > 0 && (
            <div className="pt-4 border-t border-gray-200 dark:border-swiss-border">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Workers AI Persona Evaluation (@cf/meta/llama-3.3-70b-instruct)</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {executionResult.personaFeedback.map((pf: any, idx: number) => (
                  <div key={idx} className="p-4 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-gray-900 dark:text-white">{pf.persona}</span>
                      <span className="text-xs font-mono text-emerald-600 font-bold">{pf.verdict} ({pf.score}/100)</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{pf.critique}</p>
                    <div className="space-y-1">
                      {pf.recommendations.map((rec: string, rIdx: number) => (
                        <div key={rIdx} className="text-[11px] font-mono text-blue-600 dark:text-blue-400 flex items-start space-x-1.5">
                          <span>→</span>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-swiss-border">
            <a
              href={executionResult.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-blue-600 dark:text-blue-400 flex items-center space-x-1 hover:underline"
            >
              <span>Visit Target Page in Browser</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => {
                setExecutionResult(null);
                handleRunJourneyLive();
              }}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Re-run Journey</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
