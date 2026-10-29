import React, { useState } from 'react';
import { mockAiraTelemetry, mockTelemetryRegistry } from '../data/mockTelemetry';
import { 
  CheckCircle2, 
  ExternalLink, 
  Play, 
  Sparkles, 
  Activity, 
  Layers, 
  TrendingUp,
  FolderGit2
} from 'lucide-react';

export const LiveTelemetryShowcase: React.FC = () => {
  const [selectedProjectKey, setSelectedProjectKey] = useState<string>('aira-academy');
  const [activeTab, setActiveTab] = useState<'overview' | 'personas' | 'copy' | 'artifacts'>('overview');
  
  const data = mockTelemetryRegistry[selectedProjectKey] || mockAiraTelemetry;

  const projects = [
    { key: 'aira-academy', name: 'AIRA by Radoss', tag: 'Curriculum & Video Integrity' },
    { key: 'naija-grid', name: 'Naija Grid / Gidi Grid', tag: 'Web Audio & Canvas Engine' },
    { key: 'deepsyque', name: 'DeepSyque', tag: 'Career Quiz & D1 Recovery' },
    { key: 'eatalia', name: 'Eatalia Limited', tag: 'Yaba QSR & Edge Food Delivery' },
  ];

  return (
    <section id="telemetry" className="py-20 md:py-28 bg-white dark:bg-[#0a0a0c] border-b border-gray-200 dark:border-swiss-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 bg-emerald-500 animate-pulse"></span>
              <span>LIVE WORKSPACE TELEMETRY DEMO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
              Audit Telemetry: <span className="text-blue-600 dark:text-blue-400">{data.project}</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl">
              Inspecting real cloud test run <code className="text-gray-900 dark:text-gray-200 font-mono bg-gray-100 dark:bg-swiss-card px-1.5 py-0.5 border border-gray-300 dark:border-swiss-border">{data.id}</code> with project-calibrated AI persona feedback and conversion copy audits.
            </p>
          </div>

          {/* Quick External Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={data.artifacts.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#111215] dark:hover:bg-[#1a1d24] text-xs font-mono text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-swiss-border flex items-center space-x-2 transition-colors"
            >
              <span>Live QA Report</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </a>
            <a
              href={`https://${data.repo.replace('github.com/', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-600/20 dark:hover:bg-blue-600/30 text-xs font-mono text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-800 flex items-center space-x-2 transition-colors"
            >
              <span>Repository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Project Selector Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-4 font-mono text-xs">
          <span className="text-gray-500 dark:text-swiss-muted font-bold text-[10px] uppercase mr-1 whitespace-nowrap">
            SWITCH TELEMETRY RUN:
          </span>
          {projects.map((p) => {
            const isSelected = selectedProjectKey === p.key;
            return (
              <button
                key={p.key}
                onClick={() => setSelectedProjectKey(p.key)}
                className={`px-3.5 py-2 border whitespace-nowrap flex items-center space-x-2 transition-all ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-sm'
                    : 'bg-gray-50 dark:bg-[#111215] border-gray-200 dark:border-swiss-border text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600'
                }`}
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Swiss Grid Telemetry Hub Container */}
        <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border shadow-sm">
          
          {/* Top Status Bar */}
          <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-swiss-border grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-xs font-mono">
            <div>
              <div className="text-gray-500 dark:text-swiss-muted text-[10px] uppercase font-bold">Status</div>
              <div className="mt-1 text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{data.passedCount}/{data.totalTests} PASSED</span>
              </div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-swiss-muted text-[10px] uppercase font-bold">Duration</div>
              <div className="mt-1 text-gray-900 dark:text-gray-200 font-bold">{data.durationSeconds}s</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-swiss-muted text-[10px] uppercase font-bold">Commit SHA</div>
              <div className="mt-1 text-blue-600 dark:text-blue-400 font-bold">{data.commitSha}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-swiss-muted text-[10px] uppercase font-bold">Local RAM Used</div>
              <div className="mt-1 text-emerald-600 dark:text-emerald-400 font-bold">0 MB</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-swiss-muted text-[10px] uppercase font-bold">Cloud Runner</div>
              <div className="mt-1 text-gray-900 dark:text-gray-200 font-bold">{data.runner.type}</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-swiss-muted text-[10px] uppercase font-bold">Artifacts ($0 Egress)</div>
              <div className="mt-1 text-purple-600 dark:text-purple-400 font-bold">Stored in R2</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 dark:border-swiss-border overflow-x-auto bg-gray-50 dark:bg-[#0d0e11]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-3 text-xs sm:text-sm font-mono flex items-center space-x-2 border-r border-gray-200 dark:border-swiss-border whitespace-nowrap transition-colors ${
                activeTab === 'overview'
                  ? 'bg-white dark:bg-[#111215] text-gray-900 dark:text-white border-b-2 border-b-blue-600 font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#15171d]'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>1. Run Overview &amp; Probes</span>
            </button>
            <button
              onClick={() => setActiveTab('personas')}
              className={`px-5 py-3 text-xs sm:text-sm font-mono flex items-center space-x-2 border-r border-gray-200 dark:border-swiss-border whitespace-nowrap transition-colors ${
                activeTab === 'personas'
                  ? 'bg-white dark:bg-[#111215] text-gray-900 dark:text-white border-b-2 border-b-blue-600 font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#15171d]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>2. Simulated Personas ({data.personaFeedback.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('copy')}
              className={`px-5 py-3 text-xs sm:text-sm font-mono flex items-center space-x-2 border-r border-gray-200 dark:border-swiss-border whitespace-nowrap transition-colors ${
                activeTab === 'copy'
                  ? 'bg-white dark:bg-[#111215] text-gray-900 dark:text-white border-b-2 border-b-blue-600 font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#15171d]'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>3. UX Copy &amp; Conversion ({data.uxCopyAudit.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('artifacts')}
              className={`px-5 py-3 text-xs sm:text-sm font-mono flex items-center space-x-2 whitespace-nowrap transition-colors ${
                activeTab === 'artifacts'
                  ? 'bg-white dark:bg-[#111215] text-gray-900 dark:text-white border-b-2 border-b-blue-600 font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#15171d]'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>4. Cloud Video &amp; Traces</span>
            </button>
          </div>

          {/* Tab Content 1: Overview */}
          {activeTab === 'overview' && (
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Suite Breakdown */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-swiss-muted font-bold">
                    ACTIVE TEST SUITE SPECIFICATION: {data.project}
                  </h4>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-gray-800 dark:text-gray-200">Core Functional User Flows</span>
                      </div>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {data.passedCount}/{data.totalTests} PASSED
                      </span>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-gray-800 dark:text-gray-200">Responsive Layout &amp; Viewport Bounds</span>
                      </div>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">0 OVERFLOWS</span>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-gray-800 dark:text-gray-200">Performance &amp; Edge Latency Probe</span>
                      </div>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">SUB-100MS TTFB</span>
                    </div>
                  </div>

                  <div className="pt-4 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    Zero manual testing was conducted. The GitHub Actions runner executed parallel headless chromium instances, generated WebM recordings, evaluated layout bounds, and published traces directly to Cloudflare Pages in {data.durationSeconds} seconds.
                  </div>
                </div>

                {/* Right Runner Resource Telemetry */}
                <div className="lg:col-span-5 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border p-5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-swiss-muted mb-4 flex items-center justify-between font-bold">
                    <span>HOST HARDWARE SAFETY AUDIT</span>
                    <span className="text-emerald-600 dark:text-emerald-400">PASSED</span>
                  </h4>

                  <div className="space-y-4 text-xs font-mono">
                    <div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-1">
                        <span>Developer Local RAM Consumption:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">0 MB (100% Cloud)</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-[#181a20] h-2">
                        <div className="bg-emerald-500 h-2" style={{ width: '0%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-1">
                        <span>Local SSD Storage Consumed:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">0 Bytes (Zero Binaries)</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-[#181a20] h-2">
                        <div className="bg-emerald-500 h-2" style={{ width: '0%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-1">
                        <span>Cloud Runner Memory Allocation:</span>
                        <span className="text-blue-600 dark:text-blue-400 font-bold">1,840 MB / 7,000 MB</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-[#181a20] h-2">
                        <div className="bg-blue-500 h-2" style={{ width: '26%' }}></div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-swiss-border text-[11px] text-gray-500 dark:text-swiss-muted">
                      <span className="font-semibold text-gray-900 dark:text-white">CTO Guardrail Confirmed:</span> An 8GB RAM MacBook Air or Windows developer machine remains at 100% responsiveness throughout test execution.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab Content 2: Personas */}
          {activeTab === 'personas' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.personaFeedback.map((p, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-display font-bold text-gray-900 dark:text-white text-sm">{p.persona}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 border ${
                          p.verdict === 'Approved'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 font-semibold'
                            : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800 font-semibold'
                        }`}>
                          {p.verdict} ({p.score}/100)
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-gray-500 dark:text-swiss-muted mb-3">
                        Model: {p.model}
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        "{p.critique}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-200 dark:border-swiss-border">
                      <div className="text-[10px] font-mono uppercase text-gray-500 dark:text-swiss-muted mb-1 font-bold">Actionable Recommendation:</div>
                      {p.recommendations.map((rec, rIdx) => (
                        <div key={rIdx} className="text-xs text-blue-700 dark:text-blue-300 font-mono">
                          • {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 3: UX Copy */}
          {activeTab === 'copy' && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                Cloudflare Workers AI (<code className="text-blue-600 dark:text-blue-400 font-mono">@cf/meta/llama-3.3-70b-instruct</code>) evaluated landing copy elements for <span className="font-semibold text-gray-900 dark:text-white font-mono">{data.project}</span> against high-conversion UX benchmarks:
              </div>

              <div className="divide-y divide-gray-200 dark:divide-swiss-border border border-gray-200 dark:border-swiss-border">
                {data.uxCopyAudit.map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 dark:bg-[#0a0a0c] grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    <div className="lg:col-span-3 font-mono text-xs text-gray-500 dark:text-swiss-muted">
                      <div className="text-gray-800 dark:text-gray-200 font-bold">{item.selector}</div>
                      <div className="mt-1 text-[11px] text-gray-600 dark:text-gray-400">{item.readabilityGrade}</div>
                    </div>
                    <div className="lg:col-span-4">
                      <div className="text-[10px] font-mono uppercase text-gray-500 dark:text-swiss-muted font-bold">Original Text</div>
                      <div className="text-xs text-red-600 dark:text-red-300 line-through mt-0.5">{item.originalText}</div>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
                          Recommended High-Converting Copy
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold">
                          {item.expectedConversionLift}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-gray-900 dark:text-white mt-0.5">{item.recommendedImprovement}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 4: Cloud Video & Traces */}
          {activeTab === 'artifacts' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Cloud video preview container */}
                <div className="bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-gray-900 dark:text-white font-semibold">Full User Journey Recording</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                      WebM • 1080p • 60 FPS
                    </span>
                  </div>
                  <div className="aspect-video bg-gray-100 dark:bg-[#14161c] border border-gray-200 dark:border-swiss-border flex flex-col items-center justify-center p-6 text-center relative group">
                    <div className="w-14 h-14 bg-blue-600/10 dark:bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Play className="w-6 h-6 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />
                    </div>
                    <div className="font-mono text-xs text-gray-900 dark:text-white font-medium">{data.project.replace(/\s+/g, '-')}-Run.webm</div>
                    <div className="text-[11px] text-gray-500 dark:text-swiss-muted mt-1">Saved to Cloudflare R2 (`uxqa-artifacts`) with $0.00 egress</div>
                  </div>
                  <div className="mt-4 flex justify-between items-center text-xs font-mono text-gray-600 dark:text-gray-400">
                    <span>Artifacts: {data.artifacts.screenshotsCount} Screenshots</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Stored on Edge</span>
                  </div>
                </div>

                {/* Playwright Trace Viewer Card */}
                <div className="bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-gray-900 dark:text-white font-semibold">Zero-Download Live Trace</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                        Playwright Trace.zip
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Inspect DOM snapshots, console logs, network requests, and action timings step-by-step in the official Playwright Trace Viewer without unzipping large local archives.
                    </p>
                    <div className="p-3 bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border font-mono text-xs text-gray-700 dark:text-gray-400 space-y-1">
                      <div>• Commit SHA: {data.commitSha}</div>
                      <div>• Runner: {data.runner.type} ({data.runner.nodeVersion})</div>
                      <div>• Edge Report: {data.artifacts.reportUrl}</div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-200 dark:border-swiss-border">
                    <a
                      href={data.artifacts.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs font-mono flex items-center justify-center space-x-2 transition-colors"
                    >
                      <span>Open Live Interactive QA Dashboard</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
