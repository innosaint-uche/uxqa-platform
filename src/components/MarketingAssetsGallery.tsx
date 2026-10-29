import React, { useState } from 'react';
import { Download, Share2, Check } from 'lucide-react';

export const MarketingAssetsGallery: React.FC = () => {
  const [copiedAsset, setCopiedAsset] = useState<string | null>(null);

  const handleCopySnippet = (assetName: string) => {
    setCopiedAsset(assetName);
    setTimeout(() => setCopiedAsset(null), 2500);
  };

  return (
    <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 shadow-sm mb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-gray-200 dark:border-swiss-border gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-amber-500"></span>
            <span className="font-mono text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              AUTO-EXTRACTED MARKETING COLLATERALS
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Pristine device-framed screenshots, canvas status passes, and launch assets generated directly on green CI/CD runs.
          </p>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800 font-semibold">
          ZERO SCREENSHOT CROPPING REQUIRED
        </span>
      </div>

      {/* Grid of Extracted Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Asset 1: iPhone 16 Device Frame (AIRA Academy) */}
        <div className="lg:col-span-5 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border p-6 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-4 text-xs font-mono">
            <span className="font-bold text-gray-900 dark:text-white">AIRA Academy Mobile Flow</span>
            <span className="text-blue-600 dark:text-blue-400">iPhone 16 Pro Frame</span>
          </div>

          {/* iPhone Mockup Frame */}
          <div className="w-[240px] bg-gray-900 border-4 border-gray-700 shadow-2xl p-3 relative">
            {/* Dynamic Island */}
            <div className="w-20 h-4 bg-black mx-auto mb-2 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            </div>

            {/* Screen Content */}
            <div className="bg-white dark:bg-[#111215] p-3 text-left font-sans text-gray-900 dark:text-white">
              <div className="text-[10px] font-mono text-blue-600 dark:text-blue-400 uppercase font-bold">AIRA ACADEMY</div>
              <div className="text-xs font-extrabold mt-0.5 leading-tight">AI Agent Curriculum</div>
              <div className="text-[9px] text-gray-500 dark:text-gray-400 mt-1">150 Lessons • Verified 2026</div>

              <div className="mt-3 space-y-1.5">
                <div className="p-1.5 bg-gray-50 dark:bg-[#1a1d24] border border-gray-200 dark:border-swiss-border text-[9px] font-mono flex justify-between">
                  <span>Track 1: Foundations</span>
                  <span className="text-emerald-500">23/23</span>
                </div>
                <div className="p-1.5 bg-gray-50 dark:bg-[#1a1d24] border border-gray-200 dark:border-swiss-border text-[9px] font-mono flex justify-between">
                  <span>Track 2: AI Agents</span>
                  <span className="text-emerald-500">25/25</span>
                </div>
              </div>

              <div className="mt-4 p-2 bg-blue-600 text-white text-center text-[10px] font-bold">
                Start Learning Now (Free)
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between w-full font-mono text-xs text-gray-500 pt-2 border-t border-gray-200 dark:border-swiss-border">
            <span>Dimensions: 1179x2556px</span>
            <button
              onClick={() => handleCopySnippet('aira-phone')}
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
            >
              {copiedAsset === 'aira-phone' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Download className="w-3.5 h-3.5" />}
              <span>{copiedAsset === 'aira-phone' ? 'Copied URL' : 'Export PNG'}</span>
            </button>
          </div>
        </div>

        {/* Asset 2: 1080x1920 WhatsApp Status Plug Pass (Naija Grid) */}
        <div className="lg:col-span-7 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4 text-xs font-mono">
              <span className="font-bold text-gray-900 dark:text-white">Naija Grid / Gidi Grid Plug Pass</span>
              <span className="text-purple-600 dark:text-purple-400">1080x1920 WhatsApp Status Format</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              
              {/* Vertical Card Preview */}
              <div className="aspect-[9/16] max-h-[300px] mx-auto bg-gradient-to-b from-amber-950/80 via-black to-blue-950 p-4 border border-amber-600/40 text-center flex flex-col justify-between shadow-xl">
                <div className="font-mono text-[9px] uppercase tracking-widest text-amber-400 font-bold">
                  NAIJA GRID • FLASH AWOOF
                </div>

                <div className="my-auto py-4">
                  <div className="w-16 h-16 border border-amber-400/60 mx-auto flex items-center justify-center font-mono font-bold text-amber-300 text-xs">
                    SEED
                  </div>
                  <div className="text-xs font-extrabold text-white mt-2">
                    Verified Commercial Plug Pass
                  </div>
                  <div className="text-[10px] text-gray-300 font-mono mt-1">
                    Daily 4:00 PM Drop Verified
                  </div>
                </div>

                <div className="font-mono text-[8px] text-gray-400 border-t border-amber-900/60 pt-2">
                  Procedural Web Audio • Iron Ogene &amp; Talking Drum
                </div>
              </div>

              {/* Asset Technical Metadata */}
              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border">
                  <div className="text-gray-500 dark:text-swiss-muted text-[10px] uppercase">Social Canvas Generation</div>
                  <div className="text-gray-900 dark:text-white font-bold mt-0.5">Automated HTML5 Canvas Export</div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">✓ Web Share API Supported</div>
                </div>

                <div className="p-3 bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border">
                  <div className="text-gray-500 dark:text-swiss-muted text-[10px] uppercase">Audio Verification</div>
                  <div className="text-gray-900 dark:text-white font-bold mt-0.5">Synthesised Audio Transients</div>
                  <div className="text-[11px] text-blue-600 dark:text-blue-400 mt-1">0 Network Audio Lag</div>
                </div>

                <button
                  onClick={() => handleCopySnippet('grid-pass')}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                >
                  {copiedAsset === 'grid-pass' ? <Check className="w-3.5 h-3.5 text-white" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedAsset === 'grid-pass' ? 'Copied Asset Link' : 'Export Social Canvas'}</span>
                </button>
              </div>

            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-swiss-border text-xs text-gray-500 dark:text-gray-400 font-sans">
            Exported automatically on every green commit for changelogs, marketing campaigns, and investor updates.
          </div>
        </div>

      </div>
    </div>
  );
};
