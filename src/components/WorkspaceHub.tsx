import React, { useState } from 'react';
import { 
  mockWorkspaces, 
  mockTelemetryRegistry, 
  mockAiraTelemetry 
} from '../data/mockTelemetry';
import { 
  CheckCircle2, 
  ExternalLink, 
  Play, 
  Sparkles, 
  Activity, 
  Layers, 
  TrendingUp, 
  Copy, 
  Check, 
  ArrowLeft, 
  ShieldCheck,
  FolderGit2
} from 'lucide-react';

interface WorkspaceHubProps {
  workspaceSlug?: string;
  projectSlug?: string;
  onNavigateHome: () => void;
  onSelectProject: (wsSlug: string, projSlug: string) => void;
}

export const WorkspaceHub: React.FC<WorkspaceHubProps> = ({
  workspaceSlug = 'radoss',
  projectSlug = 'aira-academy',
  onNavigateHome,
  onSelectProject,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'personas' | 'copy' | 'artifacts'>('overview');
  const [copied, setCopied] = useState(false);

  // Lookup workspace and project
  const currentWorkspace = mockWorkspaces.find((w) => w.slug === workspaceSlug) || mockWorkspaces[0];
  const currentProject =
    currentWorkspace.projects.find((p) => p.slug === projectSlug) || currentWorkspace.projects[0];
  const telemetry = mockTelemetryRegistry[currentProject.slug] || mockAiraTelemetry;

  const handleCopyMarkdownReport = () => {
    const report = `# UXQA Test Run Evidence: ${telemetry.project}
- **Status:** ${telemetry.status.toUpperCase()} (${telemetry.passedCount}/${telemetry.totalTests} tests green)
- **Duration:** ${telemetry.durationSeconds}s
- **Commit SHA:** \`${telemetry.commitSha}\`
- **Runner:** ${telemetry.runner.type} (${telemetry.runner.nodeVersion})
- **Developer Local RAM Consumed:** ${telemetry.runner.localRamUsedMb} MB (100% Cloud Execution)
- **Live QA Dashboard:** ${telemetry.artifacts.reportUrl}
- **Trace Viewer:** ${telemetry.artifacts.traceUrl}
- **Full Video Recording:** ${telemetry.artifacts.videoUrl}`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-gray-100 flex flex-col font-sans">
      {/* Top Breadcrumb & Project Bar */}
      <div className="bg-[#111215] border-b border-swiss-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={onNavigateHome}
              className="p-1.5 bg-[#0a0a0c] hover:bg-[#181a20] border border-swiss-border text-gray-400 hover:text-white transition-colors"
              title="Return to Showcase"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 font-mono text-xs">
              <span className="text-swiss-muted hidden sm:inline">workspaces</span>
              <span className="text-swiss-muted hidden sm:inline">/</span>
              <span className="px-2 py-0.5 bg-[#181a20] border border-swiss-border text-blue-400 font-semibold">
                {currentWorkspace.slug}
              </span>
              <span className="text-swiss-muted">/</span>
              <span className="text-white font-bold tracking-tight">
                {currentProject.slug}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopyMarkdownReport}
              className="px-3 py-1.5 bg-[#181a20] hover:bg-[#20232b] text-xs font-mono text-gray-200 border border-swiss-border flex items-center space-x-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Evidence</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-blue-400" />
                  <span>Copy Report</span>
                </>
              )}
            </button>

            <a
              href={telemetry.artifacts.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs font-mono text-white flex items-center space-x-1.5 transition-colors shadow-[0_0_12px_rgba(37,99,235,0.3)]"
            >
              <span>Cloud Report</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Project Selector Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto border-t border-swiss-border bg-[#0d0e12]">
          {currentWorkspace.projects.map((proj) => {
            const isSelected = proj.slug === currentProject.slug;
            return (
              <button
                key={proj.slug}
                onClick={() => onSelectProject(currentWorkspace.slug, proj.slug)}
                className={`px-4 py-2.5 text-xs font-mono flex items-center space-x-2 border-r border-swiss-border whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-[#111215] text-white border-b-2 border-b-blue-500 font-semibold'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#14161c]'
                }`}
              >
                <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{proj.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {proj.passRate}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Project Header Card */}
        <div className="bg-[#111215] border border-swiss-border p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-swiss-muted mb-1">
                <span>Repository: {currentProject.repo}</span>
                <span>•</span>
                <span className="text-emerald-400 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Cloud Verified</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {currentProject.name}
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                {currentProject.description}
              </p>
            </div>

            <div className="flex items-center space-x-3 font-mono text-xs">
              <a
                href={currentProject.productionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-[#181a20] hover:bg-[#20232b] text-gray-200 border border-swiss-border flex items-center space-x-1.5 transition-colors"
              >
                <span>Live Domain</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </a>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-6 pt-5 border-t border-swiss-border grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-xs font-mono">
            <div>
              <div className="text-swiss-muted text-[10px] uppercase">Telemetry Run</div>
              <div className="mt-1 text-blue-400 font-bold truncate">{telemetry.id}</div>
            </div>
            <div>
              <div className="text-swiss-muted text-[10px] uppercase">Suite Outcome</div>
              <div className="mt-1 text-emerald-400 font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{telemetry.passedCount}/{telemetry.totalTests} PASSED</span>
              </div>
            </div>
            <div>
              <div className="text-swiss-muted text-[10px] uppercase">Execution Time</div>
              <div className="mt-1 text-white font-bold">{telemetry.durationSeconds}s</div>
            </div>
            <div>
              <div className="text-swiss-muted text-[10px] uppercase">Local RAM Consumed</div>
              <div className="mt-1 text-emerald-400 font-bold">0 MB</div>
            </div>
            <div>
              <div className="text-swiss-muted text-[10px] uppercase">Cloud Runner Node</div>
              <div className="mt-1 text-gray-200 font-bold">{telemetry.runner.nodeVersion}</div>
            </div>
            <div>
              <div className="text-swiss-muted text-[10px] uppercase">Cloud Artifacts</div>
              <div className="mt-1 text-purple-400 font-bold">Stored in R2 ($0)</div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs Container */}
        <div className="bg-[#111215] border border-swiss-border">
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-swiss-border overflow-x-auto bg-[#0d0e11]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-3 text-xs sm:text-sm font-mono flex items-center space-x-2 border-r border-swiss-border whitespace-nowrap transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#111215] text-white border-b-2 border-b-blue-500 font-semibold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#15171d]'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>1. Run Overview &amp; Probes</span>
            </button>
            <button
              onClick={() => setActiveTab('personas')}
              className={`px-5 py-3 text-xs sm:text-sm font-mono flex items-center space-x-2 border-r border-swiss-border whitespace-nowrap transition-colors ${
                activeTab === 'personas'
                  ? 'bg-[#111215] text-white border-b-2 border-b-blue-500 font-semibold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#15171d]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>2. Simulated Personas ({telemetry.personaFeedback.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('copy')}
              className={`px-5 py-3 text-xs sm:text-sm font-mono flex items-center space-x-2 border-r border-swiss-border whitespace-nowrap transition-colors ${
                activeTab === 'copy'
                  ? 'bg-[#111215] text-white border-b-2 border-b-blue-500 font-semibold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#15171d]'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span>3. UX Copy &amp; Conversion ({telemetry.uxCopyAudit.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('artifacts')}
              className={`px-5 py-3 text-xs sm:text-sm font-mono flex items-center space-x-2 whitespace-nowrap transition-colors ${
                activeTab === 'artifacts'
                  ? 'bg-[#111215] text-white border-b-2 border-b-blue-500 font-semibold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#15171d]'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>4. Cloud Video &amp; Traces</span>
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-swiss-muted">
                    SUITE ASSERTION BREAKDOWN
                  </h4>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 bg-[#0a0a0c] border border-swiss-border flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-gray-200">Core Functional User Flows</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">
                        {telemetry.passedCount}/{telemetry.totalTests} PASSED
                      </span>
                    </div>

                    <div className="p-3 bg-[#0a0a0c] border border-swiss-border flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-gray-200">Responsive Layout &amp; Viewport Overflow</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">0 OVERFLOWS</span>
                    </div>

                    <div className="p-3 bg-[#0a0a0c] border border-swiss-border flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-gray-200">Authentication &amp; State Fallback Probes</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">CLEAN</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed pt-2">
                    Executed autonomously on Ubuntu cloud runners via <code className="text-blue-400 font-mono">cto-cloud-qa</code>. Traces and videos were dispatched to Cloudflare R2 with zero egress fees.
                  </p>
                </div>

                <div className="lg:col-span-5 bg-[#0a0a0c] border border-swiss-border p-5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-swiss-muted mb-4">
                    ZERO HARDWARE LOAD TELEMETRY
                  </h4>

                  <div className="space-y-4 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-gray-400 mb-1">
                        <span>Developer Machine Local RAM:</span>
                        <span className="text-emerald-400 font-bold">0 MB</span>
                      </div>
                      <div className="w-full bg-[#181a20] h-2">
                        <div className="bg-emerald-500 h-2" style={{ width: '0%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-gray-400 mb-1">
                        <span>Cloud Runner Memory Allocation:</span>
                        <span className="text-blue-400 font-bold">1,620 MB</span>
                      </div>
                      <div className="w-full bg-[#181a20] h-2">
                        <div className="bg-blue-500 h-2" style={{ width: '23%' }}></div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-swiss-border text-[11px] text-swiss-muted">
                      Your local developer machine (whether Mac, Windows, or Linux) remains completely responsive with zero memory throttling.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 2: Personas */}
          {activeTab === 'personas' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {telemetry.personaFeedback.map((p, idx) => (
                  <div key={idx} className="bg-[#0a0a0c] border border-swiss-border p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-display font-bold text-white text-sm">{p.persona}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 border ${
                          p.verdict === 'Approved'
                            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                            : 'bg-amber-950/60 text-amber-400 border-amber-800'
                        }`}>
                          {p.verdict} ({p.score}/100)
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-swiss-muted mb-3">
                        Model: {p.model}
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed mb-4">
                        "{p.critique}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-swiss-border">
                      <div className="text-[10px] font-mono uppercase text-swiss-muted mb-1">Recommendations:</div>
                      {p.recommendations.map((rec, rIdx) => (
                        <div key={rIdx} className="text-xs text-blue-300 font-mono">
                          • {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Copy */}
          {activeTab === 'copy' && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="divide-y divide-swiss-border border border-swiss-border">
                {telemetry.uxCopyAudit.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#0a0a0c] grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    <div className="lg:col-span-3 font-mono text-xs text-swiss-muted">
                      <div>{item.selector}</div>
                      <div className="mt-1 text-[11px] text-gray-400">{item.readabilityGrade}</div>
                    </div>
                    <div className="lg:col-span-4">
                      <div className="text-[10px] font-mono uppercase text-swiss-muted">Original Text</div>
                      <div className="text-xs text-red-300 line-through mt-0.5">{item.originalText}</div>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
                          Recommended Copy
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {item.expectedConversionLift}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-white mt-0.5">{item.recommendedImprovement}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Artifacts */}
          {activeTab === 'artifacts' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-[#0a0a0c] border border-swiss-border p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-white font-semibold">Recorded User Journey</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-purple-950 text-purple-300 border border-purple-800">
                      Cloudflare R2 ($0 Egress)
                    </span>
                  </div>
                  <div className="aspect-video bg-[#14161c] border border-swiss-border flex flex-col items-center justify-center p-6 text-center group">
                    <div className="w-14 h-14 bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Play className="w-6 h-6 text-blue-400 fill-blue-400" />
                    </div>
                    <div className="font-mono text-xs text-white font-medium">{currentProject.slug}-full-run.webm</div>
                  </div>
                </div>

                <div className="bg-[#0a0a0c] border border-swiss-border p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-white font-semibold">Zero-Download Playwright Trace</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800">
                        Interactive Trace
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed mb-4">
                      Step through actions, inspect DOM snapshots, verify network requests and inspect timing waterfalls.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-swiss-border">
                    <a
                      href={telemetry.artifacts.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs font-mono flex items-center justify-center space-x-2 transition-colors"
                    >
                      <span>Open Live Cloudflare Pages Report</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
};
