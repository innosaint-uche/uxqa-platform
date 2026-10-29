import React, { useState } from 'react';
import { ExternalLink, Maximize2, Minimize2, RefreshCw, Eye } from 'lucide-react';

export const LiveReportEmbed: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [key, setKey] = useState(0);

  const reportUrl = 'https://aura-academy-qa.pages.dev';

  return (
    <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 shadow-sm mb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-swiss-border gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-display font-bold text-gray-900 dark:text-white text-base">
              Interactive Live Cloudflare Pages QA Report
            </h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Living Playwright dashboard embedded directly from <code className="font-mono text-blue-600 dark:text-blue-400">{reportUrl}</code>. Zero download required.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <button
            onClick={() => setKey((prev) => prev + 1)}
            className="p-1.5 bg-gray-100 dark:bg-[#1a1d24] hover:bg-gray-200 dark:hover:bg-[#222630] text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-swiss-border transition-colors"
            title="Reload Frame"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1.5 bg-gray-100 dark:bg-[#1a1d24] hover:bg-gray-200 dark:hover:bg-[#222630] text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-swiss-border flex items-center space-x-1 transition-colors"
          >
            {isExpanded ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Contract</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Expand View</span>
              </>
            )}
          </button>

          <a
            href={reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <span>Open Standalone</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Embedded iframe container */}
      <div className={`border border-gray-300 dark:border-swiss-border bg-gray-50 dark:bg-[#0a0a0c] transition-all duration-300 ${isExpanded ? 'h-[750px]' : 'h-[460px]'}`}>
        <iframe
          key={key}
          src={reportUrl}
          title="AIRA Academy Cloudflare Pages QA Report"
          className="w-full h-full border-0"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-gray-500 dark:text-swiss-muted">
        <span>Deployed on Cloudflare Pages via GitHub Actions CI/CD</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">69/69 Unit &amp; Smoke Tests Passing</span>
      </div>
    </div>
  );
};
