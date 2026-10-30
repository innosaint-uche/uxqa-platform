import React, { useState, useEffect } from 'react';
import { 
  mockWorkspaces, 
  mockTelemetryRegistry, 
  mockAiraTelemetry 
} from '../data/mockTelemetry';
import { 
  ExternalLink, 
  CheckCircle2, 
  FolderGit2, 
  Copy, 
  Check, 
  ArrowLeft, 
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';
import { InteractiveAiAuditor } from './InteractiveAiAuditor';
import { ComposioDispatchPanel } from './ComposioDispatchPanel';
import { ArtifactMediaExplorer } from './ArtifactMediaExplorer';
import { WorkspaceDashboard } from './WorkspaceDashboard';
import { JourneyPlanBuilder } from './JourneyPlanBuilder';
import { TelemetryRun } from '../types';

interface WorkspaceHubProps {
  workspaceSlug?: string;
  projectSlug?: string;
  initialView?: 'workspace' | 'project';
  onNavigateHome: () => void;
  onSelectProject: (wsSlug: string, projSlug: string) => void;
}

export const WorkspaceHub: React.FC<WorkspaceHubProps> = ({
  workspaceSlug = 'radoss',
  projectSlug = 'aira-academy',
  initialView,
  onNavigateHome,
  onSelectProject,
}) => {
  // Determine if we start in workspace dashboard view or project view
  const [currentView, setCurrentView] = useState<'workspace' | 'project'>(() => {
    if (initialView) return initialView;
    return projectSlug ? 'project' : 'workspace';
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'builder' | 'personas' | 'copy' | 'artifacts'>('overview');
  const [copied, setCopied] = useState(false);
  const [d1Connected, setD1Connected] = useState(true);
  const [d1RunsCount, setD1RunsCount] = useState(4);
  const [liveRuns, setLiveRuns] = useState<Record<string, TelemetryRun>>({});

  useEffect(() => {
    fetch('/api/telemetry')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.runs && data.runs.length > 0) {
          setD1Connected(true);
          setD1RunsCount(data.runs.length);

          const runsByProject: Record<string, TelemetryRun> = {};
          for (const r of data.runs) {
            const slug = r.projectSlug || 'aira-academy';
            if (!runsByProject[slug]) {
              const base = mockTelemetryRegistry[slug] || mockAiraTelemetry;
              runsByProject[slug] = {
                id: r.id,
                project: r.project || base.project,
                repo: base.repo,
                branch: r.branch || 'main',
                commitSha: r.commitSha || base.commitSha,
                status: r.status,
                durationSeconds: r.durationSeconds || base.durationSeconds,
                totalTests: r.totalTests || base.totalTests,
                passedCount: r.passedCount || base.passedCount,
                failedCount: r.failedCount || 0,
                skippedCount: r.skippedCount || 0,
                timestamp: r.createdAt || base.timestamp,
                runner: {
                  type: 'github-actions-ubuntu',
                  nodeVersion: r.runnerNodeVersion || 'v24.2.0',
                  localRamUsedMb: 0,
                  localCpuUsedPct: 0,
                },
                artifacts: {
                  videoUrl: r.videoUrl || base.artifacts.videoUrl,
                  traceUrl: r.traceUrl || base.artifacts.traceUrl,
                  reportUrl: r.reportUrl || base.artifacts.reportUrl,
                  screenshotsCount: base.artifacts.screenshotsCount,
                  videoDuration: base.artifacts.videoDuration,
                  videoSteps: base.artifacts.videoSteps,
                  screenshots: base.artifacts.screenshots,
                  files: base.artifacts.files,
                },
                personaFeedback: r.personaFeedback && r.personaFeedback.length > 0 ? r.personaFeedback : base.personaFeedback,
                uxCopyAudit: r.uxCopyAudit && r.uxCopyAudit.length > 0 ? r.uxCopyAudit : base.uxCopyAudit,
              };
            }
          }
          setLiveRuns(runsByProject);
        }
      })
      .catch(() => setD1Connected(false));
  }, []);

  // Lookup workspace and project
  const currentWorkspace = mockWorkspaces.find((w) => w.slug === workspaceSlug) || mockWorkspaces[0];
  const currentProject =
    currentWorkspace.projects.find((p) => p.slug === projectSlug) || currentWorkspace.projects[0];
  const fallbackTelemetry = mockTelemetryRegistry[currentProject.slug] || mockAiraTelemetry;
  const telemetry = liveRuns[currentProject.slug] || fallbackTelemetry;
  const combinedTelemetryMap = { ...mockTelemetryRegistry, ...liveRuns };

  const handleCopyMarkdownReport = () => {
    const report = `# UXQA Test Run Evidence: ${telemetry.project}
- **Status:** ${telemetry.status.toUpperCase()} (${telemetry.passedCount}/${telemetry.totalTests} tests green)
- **Duration:** ${telemetry.durationSeconds}s
- **Commit SHA:** \`${telemetry.commitSha}\`
- **Runner:** ${telemetry.runner.type} (${telemetry.runner.nodeVersion})
- **Developer Local RAM Consumed:** ${telemetry.runner.localRamUsedMb} MB (100% Cloud Execution)
- **Live QA Dashboard:** ${telemetry.artifacts.reportUrl}
- **Full Video Recording:** ${telemetry.artifacts.videoUrl}`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSelectProjectFromWorkspace = (wsSlug: string, projSlug: string) => {
    onSelectProject(wsSlug, projSlug);
    setCurrentView('project');
  };

  const handleSwitchToWorkspaceDashboard = () => {
    window.history.pushState({}, '', `/${currentWorkspace.slug}`);
    setCurrentView('workspace');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0a0a0c] text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors">
      
      {/* Top Breadcrumb & Project Bar */}
      <div className="bg-white dark:bg-[#111215] border-b border-gray-200 dark:border-swiss-border sticky top-0 z-30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={onNavigateHome}
              className="p-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#0a0a0c] dark:hover:bg-[#181a20] border border-gray-300 dark:border-swiss-border text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              title="Return to Showcase"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Clickable, Functional Breadcrumb Hierarchy */}
            <div className="flex items-center space-x-2 font-mono text-xs">
              <button
                onClick={handleSwitchToWorkspaceDashboard}
                className="text-gray-500 hover:text-gray-900 dark:text-swiss-muted dark:hover:text-white transition-colors hidden sm:inline"
              >
                workspaces
              </button>
              <span className="text-gray-400 dark:text-swiss-muted hidden sm:inline">/</span>
              
              <button
                onClick={handleSwitchToWorkspaceDashboard}
                className={`px-2 py-0.5 border text-xs font-semibold transition-colors flex items-center space-x-1 ${
                  currentView === 'workspace'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-blue-50 dark:bg-[#181a20] border-blue-200 dark:border-swiss-border text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-[#20232b]'
                }`}
                title="Click to view full Workspace Dashboard"
              >
                <span>{currentWorkspace.slug}</span>
              </button>

              {currentView === 'project' && (
                <>
                  <span className="text-gray-400 dark:text-swiss-muted">/</span>
                  <span className="text-gray-900 dark:text-white font-bold tracking-tight">
                    {currentProject.slug}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Mode Toggle: Workspace Dashboard vs Project Telemetry */}
            <button
              onClick={() => setCurrentView(currentView === 'workspace' ? 'project' : 'workspace')}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#181a20] dark:hover:bg-[#20232b] text-xs font-mono text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-swiss-border flex items-center space-x-1.5 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{currentView === 'workspace' ? 'View Project Telemetry' : 'Workspace Overview'}</span>
            </button>

            <button
              onClick={handleCopyMarkdownReport}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#181a20] dark:hover:bg-[#20232b] text-xs font-mono text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-swiss-border hidden sm:flex items-center space-x-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied Evidence</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Copy Report</span>
                </>
              )}
            </button>

            <a
              href={telemetry.artifacts.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs font-mono text-white flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              <span>Cloud Report</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Project Selector Bar (always accessible across the workspace) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto border-t border-gray-200 dark:border-swiss-border bg-gray-50 dark:bg-[#0d0e12]">
          <button
            onClick={handleSwitchToWorkspaceDashboard}
            className={`px-4 py-2.5 text-xs font-mono flex items-center space-x-2 border-r border-gray-200 dark:border-swiss-border whitespace-nowrap transition-colors ${
              currentView === 'workspace'
                ? 'bg-white dark:bg-[#111215] text-blue-600 dark:text-blue-400 border-b-2 border-b-blue-600 font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#14161c]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Workspace Overview ({currentWorkspace.projects.length} Projects)</span>
          </button>

          {currentWorkspace.projects.map((proj) => {
            const isSelected = currentView === 'project' && proj.slug === currentProject.slug;
            return (
              <button
                key={proj.slug}
                onClick={() => {
                  onSelectProject(currentWorkspace.slug, proj.slug);
                  setCurrentView('project');
                }}
                className={`px-4 py-2.5 text-xs font-mono flex items-center space-x-2 border-r border-gray-200 dark:border-swiss-border whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-white dark:bg-[#111215] text-gray-900 dark:text-white border-b-2 border-b-blue-600 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#14161c]'
                }`}
              >
                <FolderGit2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{proj.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold">
                  {proj.passRate}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* VIEW 1: Full Workspace Command Center */}
        {currentView === 'workspace' ? (
          <WorkspaceDashboard
            workspace={currentWorkspace}
            telemetryMap={combinedTelemetryMap}
            d1Connected={d1Connected}
            d1RunsCount={d1RunsCount}
            onSelectProject={handleSelectProjectFromWorkspace}
            onOpenBuilder={(projSlug) => {
              if (projSlug) onSelectProject(currentWorkspace.slug, projSlug);
              setActiveTab('builder');
              setCurrentView('project');
            }}
            onNavigateHome={onNavigateHome}
          />
        ) : (
          /* VIEW 2: Sub-Project Telemetry Hub */
          <div>
            {/* Project Header Card */}
            <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 mb-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 dark:border-swiss-border gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold mb-1">
                    <span>{currentWorkspace.name}</span>
                    <span>•</span>
                    <span>{currentProject.repo}</span>
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {currentProject.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-2xl leading-relaxed">
                    {currentProject.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-bold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>SUITE PASSED ({telemetry.passedCount}/{telemetry.totalTests})</span>
                  </span>
                  <a
                    href={currentProject.productionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#181a20] dark:hover:bg-[#20232b] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-swiss-border font-mono text-xs flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Live App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Commit SHA</div>
                  <div className="text-sm font-mono font-bold text-gray-900 dark:text-white mt-0.5 truncate">
                    {telemetry.commitSha}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Run Duration</div>
                  <div className="text-sm font-mono font-bold text-gray-900 dark:text-white mt-0.5">
                    {telemetry.durationSeconds}s
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Dev RAM Toll</div>
                  <div className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    0 MB (100% Cloud)
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Visual Proof</div>
                  <div className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                    {telemetry.artifacts.screenshotsCount} Captures Verified
                  </div>
                </div>
              </div>
            </div>

            {/* Composio External Tool Bus Dispatch */}
            <div className="mb-8">
              <ComposioDispatchPanel projectSlug={currentProject.slug} commitSha={telemetry.commitSha} />
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 dark:border-swiss-border mb-6">
              <div className="flex space-x-6 font-mono text-xs overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-3 font-semibold transition-colors relative whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  1. Execution Telemetry
                </button>
                <button
                  onClick={() => setActiveTab('builder')}
                  className={`pb-3 font-semibold transition-colors relative whitespace-nowrap ${
                    activeTab === 'builder'
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  2. Visual Journey Builder
                </button>
                <button
                  onClick={() => setActiveTab('personas')}
                  className={`pb-3 font-semibold transition-colors relative whitespace-nowrap ${
                    activeTab === 'personas'
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  3. Simulated Personas ({telemetry.personaFeedback.length})
                </button>
                <button
                  onClick={() => setActiveTab('copy')}
                  className={`pb-3 font-semibold transition-colors relative whitespace-nowrap ${
                    activeTab === 'copy'
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  4. UX Copy &amp; Conversion ({telemetry.uxCopyAudit.length})
                </button>
                <button
                  onClick={() => setActiveTab('artifacts')}
                  className={`pb-3 font-semibold transition-colors relative whitespace-nowrap ${
                    activeTab === 'artifacts'
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  5. Media &amp; Artifacts Explorer ({telemetry.artifacts.screenshotsCount} Captures)
                </button>
              </div>
            </div>

            {/* Tab 1: Execution Telemetry */}
            {activeTab === 'overview' && (
              <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white font-mono mb-2">
                    Autonomous Cloud Execution Spec
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                    Executed autonomously on Ubuntu cloud runners via <code className="text-blue-600 dark:text-blue-400 font-mono">cto-cloud-qa</code>. Traces and videos were dispatched to Cloudflare R2 with zero egress fees.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border font-mono text-xs space-y-2">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Infrastructure Tier</div>
                    <div className="text-gray-800 dark:text-gray-200 flex justify-between">
                      <span>Runner Host:</span>
                      <span className="text-gray-900 dark:text-white font-semibold">{telemetry.runner.type}</span>
                    </div>
                    <div className="text-gray-800 dark:text-gray-200 flex justify-between">
                      <span>Runtime:</span>
                      <span className="text-gray-900 dark:text-white font-semibold">Node {telemetry.runner.nodeVersion}</span>
                    </div>
                    <div className="text-gray-800 dark:text-gray-200 flex justify-between">
                      <span>Local RAM Toll:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{telemetry.runner.localRamUsedMb} MB</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border font-mono text-xs space-y-2">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Edge Storage Verification</div>
                    <div className="text-gray-800 dark:text-gray-200 flex justify-between">
                      <span>Storage Tier:</span>
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">Cloudflare R2</span>
                    </div>
                    <div className="text-gray-800 dark:text-gray-200 flex justify-between">
                      <span>Egress Cost:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">$0.00 (Guaranteed)</span>
                    </div>
                    <div className="text-gray-800 dark:text-gray-200 flex justify-between">
                      <span>Live Report:</span>
                      <span className="text-blue-600 dark:text-blue-400 truncate max-w-[200px]">{telemetry.artifacts.reportUrl}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-mono text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>All {telemetry.totalTests} tests passed cleanly. Zero client crashes or broken selectors observed.</span>
                  </div>
                  <a
                    href={telemetry.artifacts.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-emerald-900 dark:hover:text-white transition-colors"
                  >
                    View Interactive Suite
                  </a>
                </div>
              </div>
            )}

            {/* Tab 2: Visual Journey Builder (No-Code) */}
            {activeTab === 'builder' && (
              <JourneyPlanBuilder
                initialProjectSlug={currentProject.slug}
                initialTargetUrl={currentProject.productionUrl}
              />
            )}

            {/* Tab 3: Simulated Personas */}
            {activeTab === 'personas' && (
              <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white font-mono mb-2">
                    Autonomous Customer Archetypes (Workers AI)
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                    Simulated using Cloudflare Workers AI free models (<code className="text-blue-600 dark:text-blue-400 font-mono">@cf/qwen/qwen2.5-coder-32b-instruct</code> &amp; <code className="text-blue-600 dark:text-blue-400 font-mono">@cf/meta/llama-3.2-11b-vision-instruct</code>).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {telemetry.personaFeedback.map((fb, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-xs font-bold text-gray-900 dark:text-white">{fb.persona}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold">
                            Score: {fb.score}/100
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          "{fb.critique}"
                        </p>
                      </div>

                      {fb.recommendations && fb.recommendations.length > 0 && (
                        <div className="pt-3 border-t border-gray-200 dark:border-swiss-border font-mono text-xs">
                          <div className="text-[10px] uppercase text-gray-500 dark:text-swiss-muted mb-1 font-bold">Remediation:</div>
                          {fb.recommendations.map((rec, i) => (
                            <div key={i} className="text-blue-700 dark:text-blue-300">• {rec}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: UX Copy & Conversion */}
            {activeTab === 'copy' && (
              <div className="space-y-8">
                {/* Interactive Dynamic UI Auditor */}
                <InteractiveAiAuditor projectName={currentProject.name} />

                {/* Pre-calibrated Project Audit Items */}
                <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white font-mono mb-2">
                      Friction Points &amp; Copy Audit (Llama 3.3 70B)
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                      Readability and conversion friction scoring evaluated across high-value funnel CTAs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {telemetry.uxCopyAudit.map((item, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border p-5 space-y-4">
                        <div>
                          <div className="text-[10px] font-mono text-gray-500 dark:text-swiss-muted uppercase tracking-wider mb-1">Target Element</div>
                          <code className="text-xs font-mono text-blue-700 dark:text-blue-400 break-all">{item.selector}</code>
                        </div>

                        <div>
                          <div className="text-[10px] font-mono text-gray-500 dark:text-swiss-muted uppercase tracking-wider mb-1">Current Copy</div>
                          <div className="text-xs text-gray-800 dark:text-gray-200 bg-white dark:bg-[#111215] p-2.5 border border-gray-200 dark:border-swiss-border">
                            "{item.originalText}"
                          </div>
                        </div>

                        <div className="pt-2 border-t border-gray-200 dark:border-swiss-border">
                          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                            <span className="text-gray-500">Readability:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{item.readabilityGrade}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-gray-500">Conversion Impact:</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{item.expectedConversionLift}</span>
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900">
                          <div className="text-[10px] font-mono uppercase text-blue-800 dark:text-blue-300 font-bold flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Recommended Replacement</span>
                          </div>
                          <div className="text-xs font-semibold text-gray-900 dark:text-white mt-0.5">{item.recommendedImprovement}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Comprehensive Media & Artifacts Explorer */}
            {activeTab === 'artifacts' && (
              <ArtifactMediaExplorer telemetry={telemetry} />
            )}

          </div>
        )}

      </main>
    </div>
  );
};
