import React from 'react';
import { Check, X } from 'lucide-react';

export const CompetitorMatrix: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#0c0e12] border-b border-swiss-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2">
            STRATEGIC VALUE BENCHMARK
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Why Modern Builders Choose UXQA over Legacy Alternatives.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed">
            Legacy test clouds charge thousands for raw execution scripts, while human testing takes a week.
            UXQA delivers instant, multi-perspective QA and marketing collaterals on every git push.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto border border-swiss-border">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#111215] text-gray-300 border-b border-swiss-border uppercase text-[11px]">
              <tr>
                <th className="p-4 sm:p-5">Capability / Dimension</th>
                <th className="p-4 sm:p-5 bg-blue-950/40 text-blue-400 border-x border-swiss-border">
                  UXQA (OSCAR)
                </th>
                <th className="p-4 sm:p-5">BrowserStack / SauceLabs</th>
                <th className="p-4 sm:p-5">UserTesting.com</th>
                <th className="p-4 sm:p-5">Local Playwright CLI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-swiss-border bg-[#0a0a0c] text-gray-300">
              
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-white">Local Developer Hardware Load</td>
                <td className="p-4 sm:p-5 bg-blue-950/20 text-emerald-400 font-bold border-x border-swiss-border">
                  0 MB RAM (100% Cloud)
                </td>
                <td className="p-4 sm:p-5 text-gray-400">Cloud, but slow tunneling</td>
                <td className="p-4 sm:p-5 text-gray-400">Zero (Manual Human)</td>
                <td className="p-4 sm:p-5 text-red-400">Freezes 8GB Laptops</td>
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-semibold text-white">Turnaround / Execution Speed</td>
                <td className="p-4 sm:p-5 bg-blue-950/20 text-emerald-400 font-bold border-x border-swiss-border">
                  &lt;90 Seconds per Push
                </td>
                <td className="p-4 sm:p-5 text-gray-400">5 to 15 Minutes</td>
                <td className="p-4 sm:p-5 text-red-400">3 to 7 Business Days</td>
                <td className="p-4 sm:p-5 text-gray-400">1 to 5 Minutes</td>
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-semibold text-white">Typical Annual Cost</td>
                <td className="p-4 sm:p-5 bg-blue-950/20 text-emerald-400 font-bold border-x border-swiss-border">
                  Free / Lean Tier ($0 - $49/mo)
                </td>
                <td className="p-4 sm:p-5 text-red-400">$1,500 to $5,000+ / yr</td>
                <td className="p-4 sm:p-5 text-red-400">£20,000 to £50,000 / yr</td>
                <td className="p-4 sm:p-5 text-gray-400">Free (High Time Cost)</td>
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-semibold text-white">Simulated AI User Personas</td>
                <td className="p-4 sm:p-5 bg-blue-950/20 text-emerald-400 font-bold border-x border-swiss-border flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Novice, Power User, Buyer</span>
                </td>
                <td className="p-4 sm:p-5 text-red-400 flex items-center space-x-1.5">
                  <X className="w-4 h-4" />
                  <span>None (Raw Assertions)</span>
                </td>
                <td className="p-4 sm:p-5 text-gray-300">Real Humans (High Cost)</td>
                <td className="p-4 sm:p-5 text-red-400 flex items-center space-x-1.5">
                  <X className="w-4 h-4" />
                  <span>None</span>
                </td>
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-semibold text-white">Automated UX Copy &amp; Tone Audits</td>
                <td className="p-4 sm:p-5 bg-blue-950/20 text-emerald-400 font-bold border-x border-swiss-border flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Flesch Grade &amp; Lift Scoring</span>
                </td>
                <td className="p-4 sm:p-5 text-red-400 flex items-center space-x-1.5">
                  <X className="w-4 h-4" />
                  <span>None</span>
                </td>
                <td className="p-4 sm:p-5 text-gray-300">Qualitative Audio Feedback</td>
                <td className="p-4 sm:p-5 text-red-400 flex items-center space-x-1.5">
                  <X className="w-4 h-4" />
                  <span>None</span>
                </td>
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-semibold text-white">Marketing Collateral Extraction</td>
                <td className="p-4 sm:p-5 bg-blue-950/20 text-emerald-400 font-bold border-x border-swiss-border flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Device-Framed Screenshots &amp; GIFs</span>
                </td>
                <td className="p-4 sm:p-5 text-red-400 flex items-center space-x-1.5">
                  <X className="w-4 h-4" />
                  <span>None</span>
                </td>
                <td className="p-4 sm:p-5 text-red-400 flex items-center space-x-1.5">
                  <X className="w-4 h-4" />
                  <span>None</span>
                </td>
                <td className="p-4 sm:p-5 text-red-400 flex items-center space-x-1.5">
                  <X className="w-4 h-4" />
                  <span>Manual Scripting</span>
                </td>
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-semibold text-white">Cloud Video Egress Fees</td>
                <td className="p-4 sm:p-5 bg-blue-950/20 text-emerald-400 font-bold border-x border-swiss-border">
                  $0.00 (Cloudflare R2)
                </td>
                <td className="p-4 sm:p-5 text-gray-400">Metered Bandwidth</td>
                <td className="p-4 sm:p-5 text-gray-400">Included in High Fee</td>
                <td className="p-4 sm:p-5 text-gray-400">N/A (Local Drive)</td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
