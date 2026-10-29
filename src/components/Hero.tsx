import React from 'react';
import { ArrowRight, Play, Cloud, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenWaitlist: () => void;
  onScrollToTelemetry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWaitlist, onScrollToTelemetry }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-swiss-border swiss-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 mb-8 bg-[#111215] border border-swiss-border font-mono text-xs text-gray-300">
          <span className="w-2 h-2 bg-blue-500"></span>
          <span className="font-semibold text-white">OSCAR Engine R1.1</span>
          <span className="text-swiss-muted">•</span>
          <span>Zero Human-in-the-Loop</span>
          <span className="text-swiss-muted">•</span>
          <span className="text-emerald-400">Zero Hardware Load</span>
        </div>

        {/* Main Grid: Copy on Left, Live Telemetry Snapshot on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
              Autonomous Product Testing for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
                Fast-Moving Founders.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              Ship flawless web applications without expensive QA departments or melting your laptop.
              UXQA runs cloud-native Playwright suites, records full-resolution user journeys, audits UX copy
              with AI personas, and extracts production-ready marketing assets directly from your git pushes.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onOpenWaitlist}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base flex items-center justify-center space-x-2 transition-all shadow-[0_0_25px_rgba(37,99,235,0.35)]"
              >
                <span>Join the Priority Waitlist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onScrollToTelemetry}
                className="px-6 py-3.5 bg-[#111215] hover:bg-[#181a1f] text-gray-200 hover:text-white border border-swiss-border font-semibold text-sm sm:text-base flex items-center justify-center space-x-2 transition-colors"
              >
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>Inspect Live Radoss Workspace</span>
              </button>
            </div>

            {/* Hardware Metrics Comparison Pill */}
            <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
              <div className="p-3 bg-[#111215] border border-swiss-border">
                <div className="text-[11px] font-mono text-swiss-muted uppercase">Local RAM Used</div>
                <div className="mt-1 text-xl font-bold font-mono text-emerald-400">0 MB</div>
                <div className="text-[10px] text-gray-400 mt-0.5">Never freezes 8GB laptop</div>
              </div>
              <div className="p-3 bg-[#111215] border border-swiss-border">
                <div className="text-[11px] font-mono text-swiss-muted uppercase">Execution Time</div>
                <div className="mt-1 text-xl font-bold font-mono text-blue-400">42.8s</div>
                <div className="text-[10px] text-gray-400 mt-0.5">Parallel cloud workers</div>
              </div>
              <div className="p-3 bg-[#111215] border border-swiss-border">
                <div className="text-[11px] font-mono text-swiss-muted uppercase">Egress Fee</div>
                <div className="mt-1 text-xl font-bold font-mono text-white">$0.00</div>
                <div className="text-[10px] text-gray-400 mt-0.5">Cloudflare R2 storage</div>
              </div>
            </div>

          </div>

          {/* Right Column: High-contrast Swiss Live Terminal & Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#111215] border border-swiss-border p-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-swiss-border">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500"></div>
                  <span className="font-mono text-xs font-semibold text-gray-200">AIRA Academy CI/CD Live Gate</span>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800">
                  PASSED 69/69
                </span>
              </div>

              {/* Terminal code snippet */}
              <div className="bg-[#0a0a0c] p-4 font-mono text-xs text-gray-300 space-y-2 border border-swiss-border overflow-x-auto">
                <div className="flex items-center text-swiss-muted text-[11px]">
                  <Cloud className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                  <span>Runner: github-actions-ubuntu (Node 24)</span>
                </div>
                <div className="text-gray-400">$ cto-cloud-qa --suite=all --ci=true</div>
                <div className="text-emerald-400">✓ 69 unit &amp; regression tests green</div>
                <div className="text-emerald-400">✓ 120/120 YouTube curriculum links verified</div>
                <div className="text-blue-400">✓ WebM user journey captured (14.2MB to R2)</div>
                <div className="text-indigo-300">✓ Workers AI Persona: 0 breaking conversion bugs</div>
                <div className="text-swiss-muted text-[10px] pt-1 border-t border-swiss-border">
                  Edge Report: https://aura-academy-qa.pages.dev
                </div>
              </div>

              {/* Workers AI Persona Quote */}
              <div className="mt-4 p-3 bg-blue-950/20 border border-blue-900/60">
                <div className="flex items-center space-x-1.5 text-blue-400 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Llama 3.3 Persona (Skeptical Buyer):</span>
                </div>
                <p className="mt-1 text-xs text-gray-300 italic">
                  "Track 1 lesson card CTA increased clarity by 23.4% after auto-suggesting 'Start Learning Now (Free)'."
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Ecosystem Proof Strip */}
        <div className="mt-16 pt-8 border-t border-swiss-border flex flex-col md:flex-row items-center justify-between text-xs text-swiss-muted gap-4">
          <span className="font-mono uppercase tracking-wider text-gray-400">
            PROVEN IN PRODUCTION ACROSS RADOSS ECOSYSTEM:
          </span>
          <div className="flex flex-wrap items-center gap-6 font-mono font-medium text-gray-300">
            <span className="flex items-center space-x-1.5 hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 bg-blue-500"></span>
              <span>AIRA Academy</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 bg-emerald-500"></span>
              <span>Naija Grid</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 bg-indigo-500"></span>
              <span>DeepSyque</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 bg-amber-500"></span>
              <span>Eatalia Limited</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
