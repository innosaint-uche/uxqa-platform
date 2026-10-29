import React from 'react';
import { AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export const VisualBugDiffViewer: React.FC = () => {

  return (
    <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 shadow-sm mb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-gray-200 dark:border-swiss-border gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-red-500"></span>
            <span className="font-mono text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              VISUAL REGRESSION DIFF: MOBILE VIEWPORT TAP-TARGET LEAK
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Real Playwright screenshot diff catching an obscured checkout button on iPhone 16 viewport (390px).
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="flex items-center space-x-1 text-red-600 dark:text-red-400">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Before (Defect)</span>
          </span>
          <span className="text-gray-400">vs</span>
          <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>After (Fixed)</span>
          </span>
        </div>
      </div>

      {/* Interactive Comparison Split Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Left: Defect Caught */}
        <div className="bg-red-50/50 dark:bg-red-950/20 border-2 border-red-500/80 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-tight">
                Defect Flagged by Cloud Runner
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-800 font-bold">
                POINTER BLOCKED (403)
              </span>
            </div>

            {/* Mobile Viewport Simulation with Defect */}
            <div className="mx-auto max-w-[260px] bg-white dark:bg-[#0a0a0c] border border-gray-300 dark:border-swiss-border p-4 shadow-md relative">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 mb-3 mx-auto"></div>
              <div className="h-2 w-32 bg-gray-200 dark:bg-gray-800 mb-2"></div>
              <div className="h-2 w-24 bg-gray-200 dark:bg-gray-800 mb-6"></div>

              {/* The Obscuring Floating Toast */}
              <div className="p-2.5 bg-gray-900 text-white text-[10px] font-mono border-2 border-red-500 shadow-xl relative z-20">
                <div className="flex items-center justify-between">
                  <span>Cookie Policy Active</span>
                  <span className="text-red-400 font-bold text-[9px]">Z-INDEX 99999</span>
                </div>
              </div>

              {/* The Obscured CTA */}
              <div className="mt-[-12px] p-2 bg-blue-600 text-white text-center text-xs font-bold opacity-30 border border-dashed border-red-500 relative z-10">
                Proceed to Checkout ($49)
              </div>
              <div className="text-[9px] text-red-600 dark:text-red-400 font-mono text-center mt-2 font-bold">
                [X] Tap Target Obscured by Overlay
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-red-200 dark:border-red-900/60 font-mono text-xs text-red-700 dark:text-red-300 space-y-1">
            <div>• Locator: <code className="text-[11px] bg-red-100 dark:bg-red-900/40 px-1">button.checkout-btn</code></div>
            <div>• Issue: Overlay catches pointer-events. Zero mobile checkout possible.</div>
          </div>
        </div>

        {/* Right: Corrected Production State */}
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-emerald-500/80 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tight">
                Verified Clean State (PR Approved)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold">
                TAP AREA 48x48PX OK
              </span>
            </div>

            {/* Mobile Viewport Simulation Clean */}
            <div className="mx-auto max-w-[260px] bg-white dark:bg-[#0a0a0c] border border-gray-300 dark:border-swiss-border p-4 shadow-md relative">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 mb-3 mx-auto"></div>
              <div className="h-2 w-32 bg-gray-200 dark:bg-gray-800 mb-2"></div>
              <div className="h-2 w-24 bg-gray-200 dark:bg-gray-800 mb-4"></div>

              {/* The Corrected Banner positioned non-intrusively */}
              <div className="p-1.5 bg-gray-100 dark:bg-[#1a1d24] text-gray-700 dark:text-gray-300 text-[9px] font-mono border border-gray-200 dark:border-swiss-border mb-3">
                Cookie banner dock: bottom edge
              </div>

              {/* The Unobscured CTA */}
              <div className="p-2.5 bg-blue-600 text-white text-center text-xs font-bold shadow-md border border-blue-500 flex items-center justify-center space-x-1.5">
                <span>Proceed to Checkout ($49)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono text-center mt-2 font-bold">
                [OK] Click Event Dispatched (0ms delay)
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-200 dark:border-emerald-900/60 font-mono text-xs text-emerald-700 dark:text-emerald-300 space-y-1">
            <div>• Fix: Toast repositioned to bottom dock with <code className="text-[11px] bg-emerald-100 dark:bg-emerald-900/40 px-1">pointer-events: none</code> when idle.</div>
            <div>• Result: Conversion leak eliminated before customer deployment.</div>
          </div>
        </div>

      </div>
    </div>
  );
};
