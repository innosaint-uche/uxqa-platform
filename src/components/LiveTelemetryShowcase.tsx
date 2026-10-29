import React, { useState } from 'react';
import { mockAiraTelemetry } from '../data/mockTelemetry';
import { 
  CheckCircle2, 
  ExternalLink, 
  Play, 
  Sparkles, 
  Activity, 
  Layers, 
  TrendingUp
} from 'lucide-react';

export const LiveTelemetryShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'personas' | 'copy' | 'artifacts'>('overview');
  const data = mockAiraTelemetry;

  return (
    <section id="telemetry" className="py-20 md:py-28 bg-[#0a0a0c] border-b border-swiss-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 bg-emerald-500 animate-pulse"></span>
              <span>LIVE WORKSPACE TELEMETRY DEMO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Flagship Telemetry Hub: <span className="text-blue-400">AIRA by Radoss.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl">
              Inspecting production test run <code className="text-gray-200 font-mono bg-swiss-card px-1.5 py-0.5 border border-swiss-border">run_aira_20261028_2315</code> deployed on Cloudflare Pages.
            </p>
          </div>

          {/* Quick External Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://aura-academy-qa.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#111215] hover:bg-[#1a1d24] text-xs font-mono text-gray-200 border border-swiss-border flex items-center space-x-2 transition-colors"
            >
              <span>Live Playwright Report</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            </a>
            <a
              href="https://aira.radoss.agency"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-xs font-mono text-blue-400 border border-blue-800 flex items-center space-x-2 transition-colors"
            >
              <span>Production App (AIRA)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Swiss Grid Telemetry Hub Container */}
        <div className="bg-[#111215] border border-swiss-border">
          
          {/* Top Status Bar */}
          <div className="p-4 sm:p-5 border-b border-swiss-border grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-xs font-mono">
            <div>
              <div className="text-swiss-muted text-[10px] uppercase">Status</div>
              <div className="mt-1 text-emerald-400 font-bold flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>69/69 PASSED</span>
              </div>
            </div>
            <div>
              <div className="text-swiss-muted text-[10px] uppercase">Duration</div>
              <div className="mt-1 text-gray-200 font-bold">{data.durationSeconds}s</div>
            </div>
            <div>
              <div className="text-swiss-muted text-[10px] uppercase">Commit SHA</div>
              <div className="mt-1 text-blue-400 font-bold">{data.commitSha}</div>
            </div>
            <div>
              <div className="text-swiss-muted text-[10px] uppercase">Local RAM Used</div>
              <div className="mt-1 text-emerald-400 font-bold">0 MB</div>
            </div>
            <div>
              <div className="text-swiss-muted text-[10px] uppercase">Cloud Runner</div>
              <div className="mt-1 text-gray-200 font-bold">Ubuntu (Node 24)</div>
            </div>
            <div>
              <div className="text-swiss-muted text-[10px] uppercase">Video / Traces</div>
              <div className="mt-1 text-purple-400 font-bold">Stored in R2 ($0)</div>
            </div>
          </div>

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
              <span>2. Simulated Personas ({data.personaFeedback.length})</span>
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
              <span>3. UX Copy &amp; Conversion ({data.uxCopyAudit.length})</span>
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

          {/* Tab Content 1: Overview */}
          {activeTab === 'overview' && (
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Suite Breakdown */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-swiss-muted">
                    ACTIVE TEST SUITE SPECIFICATION
                  </h4>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 bg-[#0a0a0c] border border-swiss-border flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-gray-200">Track 1: Foundations &amp; Architecture (50 lessons)</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">23/23 PASSED</span>
                    </div>

                    <div className="p-3 bg-[#0a0a0c] border border-swiss-border flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-gray-200">Track 2: AI Workflows &amp; Multi-Agent Systems (50 lessons)</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">25/25 PASSED</span>
                    </div>

                    <div className="p-3 bg-[#0a0a0c] border border-swiss-border flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-gray-200">Track 3: Capstone, Production &amp; Certification (50 lessons)</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">21/21 PASSED</span>
                    </div>

                    <div className="p-3 bg-[#0a0a0c] border border-swiss-border flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-gray-200">YouTube Content Integrity Probe</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">120/120 LIVE (0 DEAD LINKS)</span>
                    </div>
                  </div>

                  <div className="pt-4 text-xs text-gray-400 leading-relaxed">
                    Zero manual testing was conducted. The GitHub Actions runner executed parallel headless chromium instances, generated WebM recordings, evaluated layout bounds, and published traces directly to Cloudflare Pages in 42.8 seconds.
                  </div>
                </div>

                {/* Right Runner Resource Telemetry */}
                <div className="lg:col-span-5 bg-[#0a0a0c] border border-swiss-border p-5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-swiss-muted mb-4 flex items-center justify-between">
                    <span>HOST HARDWARE SAFETY AUDIT</span>
                    <span className="text-emerald-400">PASSED</span>
                  </h4>

                  <div className="space-y-4 text-xs font-mono">
                    <div>
                      <div className="flex justify-between text-gray-400 mb-1">
                        <span>Developer Local RAM Consumption:</span>
                        <span className="text-emerald-400 font-bold">0 MB (100% Cloud)</span>
                      </div>
                      <div className="w-full bg-[#181a20] h-2">
                        <div className="bg-emerald-500 h-2" style={{ width: '0%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-gray-400 mb-1">
                        <span>Local SSD Storage Consumed:</span>
                        <span className="text-emerald-400 font-bold">0 Bytes (Zero Binaries)</span>
                      </div>
                      <div className="w-full bg-[#181a20] h-2">
                        <div className="bg-emerald-500 h-2" style={{ width: '0%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-gray-400 mb-1">
                        <span>Cloud Runner Memory Allocation:</span>
                        <span className="text-blue-400 font-bold">1,840 MB / 7,000 MB</span>
                      </div>
                      <div className="w-full bg-[#181a20] h-2">
                        <div className="bg-blue-500 h-2" style={{ width: '26%' }}></div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-swiss-border text-[11px] text-swiss-muted">
                      <span className="font-semibold text-white">CTO Guardrail Confirmed:</span> An 8GB RAM MacBook Air or Windows developer machine remains at 100% responsiveness throughout test execution.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab Content 2: Personas */}
          {activeTab === 'personas' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.personaFeedback.map((p, idx) => (
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
                      <div className="text-[10px] font-mono uppercase text-swiss-muted mb-1">Actionable Recommendation:</div>
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

          {/* Tab Content 3: UX Copy */}
          {activeTab === 'copy' && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="text-xs text-gray-400 mb-4">
                Cloudflare Workers AI (<code className="text-blue-400 font-mono">@cf/meta/llama-3.3-70b-instruct</code>) evaluated all landing view copy elements against high-conversion UX benchmarks:
              </div>

              <div className="divide-y divide-swiss-border border border-swiss-border">
                {data.uxCopyAudit.map((item, idx) => (
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
                          Recommended High-Converting Copy
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

          {/* Tab Content 4: Cloud Video & Traces */}
          {activeTab === 'artifacts' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Simulated WebM video preview container */}
                <div className="bg-[#0a0a0c] border border-swiss-border p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-white font-semibold">Full User Journey Recording</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-purple-950 text-purple-300 border border-purple-800">
                      WebM • 1080p • 60 FPS
                    </span>
                  </div>
                  <div className="aspect-video bg-[#14161c] border border-swiss-border flex flex-col items-center justify-center p-6 text-center relative group">
                    <div className="w-14 h-14 bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Play className="w-6 h-6 text-blue-400 fill-blue-400" />
                    </div>
                    <div className="font-mono text-xs text-white font-medium">AIRA-Academy-Full-Run.webm</div>
                    <div className="text-[11px] text-swiss-muted mt-1">Saved to Cloudflare R2 (`uxqa-artifacts`) with $0.00 egress</div>
                  </div>
                  <div className="mt-4 flex justify-between items-center text-xs font-mono text-gray-400">
                    <span>Size: 14.2 MB</span>
                    <span className="text-emerald-400">Stored on Edge</span>
                  </div>
                </div>

                {/* Playwright Trace Viewer Card */}
                <div className="bg-[#0a0a0c] border border-swiss-border p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-white font-semibold">Zero-Download Live Trace</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800">
                        Playwright Trace.zip
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed mb-4">
                      Inspect DOM snapshots, console logs, network requests, and action timings step-by-step in the official Playwright Trace Viewer without unzipping large local archives.
                    </p>
                    <div className="p-3 bg-[#111215] border border-swiss-border font-mono text-xs text-gray-400 space-y-1">
                      <div>• Step 1: Navigated to /aura-academy/</div>
                      <div>• Step 2: Clicked [Track 1 Card] -&gt; DOM Render 12ms</div>
                      <div>• Step 3: Verified 120 YouTube Embeds Active</div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-swiss-border">
                    <a
                      href="https://aura-academy-qa.pages.dev"
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
