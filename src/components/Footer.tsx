import React from 'react';
import { Cloud } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#0a0a0c] border-t border-gray-200 dark:border-swiss-border py-12 text-xs font-mono transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-display font-extrabold text-gray-900 dark:text-white text-base">UXQA by Radoss.</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-800 font-bold">
                OSCAR
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-sans max-w-md leading-relaxed">
              Autonomous product testing, simulated screen recording, UX copy review, and marketing collateral generation for tech founders, vibe coders, and digital teams.
            </p>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-swiss-muted text-[11px]">
              <Cloud className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Cloudflare Pages &amp; R2 • Zero Egress Fees • 100% Cloud Runners</span>
            </div>
          </div>

          <div>
            <div className="text-gray-900 dark:text-white font-semibold uppercase tracking-wider text-[11px] mb-3">
              Platform &amp; Edges
            </div>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <a href="https://uxqa.radoss.agency" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  uxqa.radoss.agency (Custom Domain)
                </a>
              </li>
              <li>
                <a href="https://uiqa-platform.pages.dev" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  uiqa-platform.pages.dev (Edge)
                </a>
              </li>
              <li>
                <a href="https://aura-academy-qa.pages.dev" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  aura-academy-qa.pages.dev (AIRA)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-gray-900 dark:text-white font-semibold uppercase tracking-wider text-[11px] mb-3">
              Ecosystem &amp; Authority
            </div>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <span className="text-gray-800 dark:text-gray-300">Radoss Digital &amp; Agency</span>
              </li>
              <li>
                <span className="text-gray-800 dark:text-gray-300">Uchenna Innocent (Super Admin)</span>
              </li>
              <li>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Swiss Grid Contract (0px Radius)</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-swiss-border flex flex-col sm:flex-row items-center justify-between text-gray-500 dark:text-swiss-muted text-[11px] gap-4">
          <div>
            &copy; {new Date().getFullYear()} Radoss. All rights reserved. Zero client hardware load guaranteed.
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">STATUS: OPERATIONAL</span>
            <span>•</span>
            <span className="text-gray-600 dark:text-gray-400">Node 24 Cloud Runner</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
