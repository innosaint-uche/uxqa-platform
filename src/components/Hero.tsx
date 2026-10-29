import React from 'react';
import { ArrowRight, Play, Cloud, Sparkles } from 'lucide-react';
import { InstantUrlScanner } from './InstantUrlScanner';

interface HeroProps {
  onOpenWaitlist: () => void;
  onScrollToTelemetry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWaitlist, onScrollToTelemetry }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-gray-200 dark:border-swiss-border swiss-grid-pattern bg-white dark:bg-[#0a0a0c] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 mb-8 bg-gray-50 dark:bg-[#111215] border border-gray-200 dark:border-swiss-border font-mono text-xs text-gray-700 dark:text-gray-300">
          <span className="w-2 h-2 bg-blue-600"></span>
          <span className="font-bold text-gray-900 dark:text-white">OSCAR Engine R1.2</span>
          <span className="text-gray-400 dark:text-swiss-muted">•</span>
          <span>Zero Human-in-the-Loop</span>
          <span className="text-gray-400 dark:text-swiss-muted">•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Zero Hardware Load</span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.08]">
              You shipped 2,000 lines of AI code this weekend.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 dark:from-blue-400 dark:via-indigo-300 dark:to-emerald-400">
                Are you sure checkout still works?
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
              Vibe coding is 10x faster until a broken mobile tap target or silent auth redirect costs you your first 50 paying customers.
              UXQA executes cloud-native Playwright suites on every git push, records frame-accurate user journeys, audits UX microcopy with AI personas, and extracts pristine marketing collaterals without melting your laptop.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onOpenWaitlist}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <span>Deploy Autonomous QA on Next Push</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onScrollToTelemetry}
                className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#111215] dark:hover:bg-[#181a1f] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-swiss-border font-semibold text-sm sm:text-base flex items-center justify-center space-x-2 transition-colors"
              >
                <Play className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400" />
                <span>Inspect AIRA Academy Run</span>
              </button>
            </div>

            {/* Instant App URL Scanner */}
            <InstantUrlScanner onOpenWaitlistWithUrl={onOpenWaitlist} />

            {/* Hardware Metrics Comparison Pill */}
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl">
              <div className="p-3 bg-gray-50 dark:bg-[#111215] border border-gray-200 dark:border-swiss-border">
                <div className="text-[11px] font-mono text-gray-500 dark:text-swiss-muted uppercase">Local RAM Used</div>
                <div className="mt-1 text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">0 MB</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Never freezes 8GB laptop</div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-[#111215] border border-gray-200 dark:border-swiss-border">
                <div className="text-[11px] font-mono text-gray-500 dark:text-swiss-muted uppercase">Execution Time</div>
                <div className="mt-1 text-xl font-bold font-mono text-blue-600 dark:text-blue-400">42.8s</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Parallel cloud workers</div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-[#111215] border border-gray-200 dark:border-swiss-border">
                <div className="text-[11px] font-mono text-gray-500 dark:text-swiss-muted uppercase">Egress Fee</div>
                <div className="mt-1 text-xl font-bold font-mono text-gray-900 dark:text-white">$0.00</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Cloudflare R2 storage</div>
              </div>
            </div>

          </div>

          {/* Right Column: High-contrast Swiss Live Terminal & Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 dark:bg-[#111215] border border-gray-300 dark:border-swiss-border p-5 shadow-lg relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200 dark:border-swiss-border">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500"></div>
                  <span className="font-mono text-xs font-bold text-gray-900 dark:text-gray-200">
                    AIRA Academy CI/CD Live Gate
                  </span>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold">
                  PASSED 69/69
                </span>
              </div>

              {/* Terminal code snippet */}
              <div className="bg-white dark:bg-[#0a0a0c] p-4 font-mono text-xs text-gray-800 dark:text-gray-300 space-y-2 border border-gray-200 dark:border-swiss-border overflow-x-auto shadow-inner">
                <div className="flex items-center text-gray-500 dark:text-swiss-muted text-[11px]">
                  <Cloud className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400" />
                  <span>Runner: github-actions-ubuntu (Node 24)</span>
                </div>
                <div className="text-gray-500">$ cto-cloud-qa --suite=all --ci=true</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold">✓ 69 unit &amp; regression tests green</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold">✓ 120/120 YouTube curriculum links verified</div>
                <div className="text-blue-600 dark:text-blue-400">✓ WebM user journey captured (14.2MB to R2)</div>
                <div className="text-indigo-600 dark:text-indigo-300">✓ Workers AI Persona: 0 breaking conversion bugs</div>
                <div className="text-gray-400 dark:text-swiss-muted text-[10px] pt-1 border-t border-gray-200 dark:border-swiss-border">
                  Edge Report: https://aura-academy-qa.pages.dev
                </div>
              </div>

              {/* Workers AI Persona Quote */}
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60">
                <div className="flex items-center space-x-1.5 text-blue-700 dark:text-blue-400 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Llama 3.3 Persona (Skeptical Buyer):</span>
                </div>
                <p className="mt-1 text-xs text-gray-700 dark:text-gray-300 italic">
                  "Track 1 lesson card CTA increased clarity by 23.4% after auto-suggesting 'Start Learning Now (Free)'."
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Ecosystem Proof Strip */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-swiss-border flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 dark:text-swiss-muted gap-4">
          <span className="font-mono uppercase tracking-wider text-gray-700 dark:text-gray-400 font-bold">
            PROVEN IN PRODUCTION ACROSS RADOSS ECOSYSTEM:
          </span>
          <div className="flex flex-wrap items-center gap-6 font-mono font-medium text-gray-700 dark:text-gray-300">
            <span className="flex items-center space-x-1.5 hover:text-black dark:hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 bg-blue-500"></span>
              <span>AIRA Academy</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-black dark:hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 bg-emerald-500"></span>
              <span>Naija Grid</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-black dark:hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 bg-indigo-500"></span>
              <span>DeepSyque</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-black dark:hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 bg-amber-500"></span>
              <span>Eatalia Limited</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
