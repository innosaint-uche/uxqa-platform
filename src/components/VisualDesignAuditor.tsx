import React, { useState } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  Layers, 
  Type, 
  MousePointerClick, 
  Eye, 
  Check, 
  Copy, 
  Save, 
  SlidersHorizontal 
} from 'lucide-react';

export interface VisualDesignAuditItem {
  id: string;
  category: 'Hierarchy & Layout' | 'Tap Ergonomics' | 'Contrast & Type' | 'Brand Voice & Trust';
  elementSelector: string;
  measuredMetric: string;
  standardTarget: string;
  status: 'pass' | 'warning' | 'fail';
  aiHypothesis: string;
  recommendedFix: string;
  userEditableFix?: string;
}

interface VisualDesignAuditorProps {
  projectName: string;
  projectSlug?: string;
}

const defaultAudits: VisualDesignAuditItem[] = [
  {
    id: 'vda-1',
    category: 'Tap Ergonomics',
    elementSelector: 'button.cta-primary-hero',
    measuredMetric: '38px x 38px touch bound',
    standardTarget: 'Min 48px x 48px (Apple HIG & WCAG 2.5.5)',
    status: 'warning',
    aiHypothesis: 'Mobile tap targets under 48px introduce tap miss rates of up to 14% on handheld viewports, increasing mobile abandonment.',
    recommendedFix: 'Apply "min-h-[48px] px-6 py-3" to eliminate edge tap ambiguity.',
    userEditableFix: 'Apply min-h-[48px] px-6 py-3 with 0px Swiss border radius',
  },
  {
    id: 'vda-2',
    category: 'Contrast & Type',
    elementSelector: 'p.subheadline-lead',
    measuredMetric: 'Contrast Ratio 3.8:1 (#889096 on #0A0B0E)',
    standardTarget: 'Min 4.5:1 for normal body text (WCAG AA)',
    status: 'fail',
    aiHypothesis: 'Subheadline fails AA contrast in daylight glare conditions; readers skip straight to secondary elements without context comprehension.',
    recommendedFix: 'Elevate text color from #889096 to #D1D5DB (contrast ratio 8.2:1).',
    userEditableFix: 'Elevate text color to #D1D5DB (contrast ratio 8.2:1)',
  },
  {
    id: 'vda-3',
    category: 'Hierarchy & Layout',
    elementSelector: '.pricing-card-featured',
    measuredMetric: 'Z-index collision & equal card elevation',
    standardTarget: 'Dominant visual focal anchor',
    status: 'warning',
    aiHypothesis: 'Featured tier does not stand out structurally from adjacent cards, creating choice paralysis among prospective buyers.',
    recommendedFix: 'Add 2px solid Swiss blue border (#2563EB) and bold "MOST POPULAR" top tag.',
    userEditableFix: 'Add 2px solid Swiss blue border (#2563EB) and bold "MOST POPULAR" top tag',
  },
  {
    id: 'vda-4',
    category: 'Brand Voice & Trust',
    elementSelector: '.trust-badge-row',
    measuredMetric: 'Vague generic badges ("Enterprise Secure")',
    standardTarget: 'Verifiable cryptographic / domain proof',
    status: 'warning',
    aiHypothesis: 'Generic trust claims generate skepticism among technical buyers; specific verification metrics dramatically accelerate credibility.',
    recommendedFix: 'Replace with "Cloudflare Edge Verified • 0 MB Local RAM Toll • Sub-second Latency".',
    userEditableFix: 'Cloudflare Edge Verified • 0 MB Local RAM Toll • Sub-second Latency',
  },
];

export const VisualDesignAuditor: React.FC<VisualDesignAuditorProps> = ({ projectName }) => {
  const [audits, setAudits] = useState<VisualDesignAuditItem[]>(defaultAudits);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [savedVariant, setSavedVariant] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['all', 'Hierarchy & Layout', 'Tap Ergonomics', 'Contrast & Type', 'Brand Voice & Trust'];

  const filtered = activeCategory === 'all' 
    ? audits 
    : audits.filter(a => a.category === activeCategory);

  const handleUpdateFix = (id: string, text: string) => {
    setAudits(audits.map(a => a.id === id ? { ...a, userEditableFix: text } : a));
  };

  const handleSaveVariant = () => {
    setSavedVariant(true);
    setTimeout(() => setSavedVariant(false), 3000);
  };

  const handleCopyFix = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 dark:border-swiss-border gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI VISUAL DESIGN &amp; ACCESSIBILITY AUDITOR</span>
              <span>•</span>
              <span className="text-gray-500">Llama 3.2 11B Vision</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Visual Design &amp; Layout Review: {projectName}
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 max-w-2xl leading-relaxed">
              Autonomous layout inspection distinguishing measured geometry from AI hypotheses. Edit proposed solutions and save directly as design variants.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleSaveVariant}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              {savedVariant ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Variant Saved</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save as Design Variant</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex space-x-2 overflow-x-auto pt-4 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 border whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-300 font-semibold'
                  : 'bg-gray-50 dark:bg-[#0a0a0c] border-gray-200 dark:border-swiss-border text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Criteria' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div 
            key={item.id} 
            className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-5 space-y-4 shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-swiss-border">
                <span className="font-mono text-xs font-bold text-gray-900 dark:text-white flex items-center space-x-1.5">
                  {item.category === 'Tap Ergonomics' && <MousePointerClick className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  {item.category === 'Contrast & Type' && <Type className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                  {item.category === 'Hierarchy & Layout' && <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />}
                  {item.category === 'Brand Voice & Trust' && <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                  <span>{item.category}</span>
                </span>

                <span className={`text-[10px] font-mono px-2 py-0.5 font-bold uppercase border ${
                  item.status === 'pass' 
                    ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                    : item.status === 'warning'
                    ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                    : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800'
                }`}>
                  {item.status}
                </span>
              </div>

              {/* Target Element Selector */}
              <div className="pt-3">
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1">Inspected Element</div>
                <code className="text-xs font-mono text-blue-700 dark:text-blue-400 break-all bg-gray-50 dark:bg-[#0a0a0c] p-1.5 border border-gray-200 dark:border-swiss-border block">
                  {item.elementSelector}
                </code>
              </div>

              {/* Hard Measured Evidence (Straight Talk) */}
              <div className="grid grid-cols-2 gap-2 pt-3">
                <div className="p-2.5 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Measured Metric</div>
                  <div className="text-xs font-mono font-semibold text-gray-900 dark:text-white mt-0.5">{item.measuredMetric}</div>
                </div>
                <div className="p-2.5 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Target Standard</div>
                  <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">{item.standardTarget}</div>
                </div>
              </div>

              {/* AI Conversion Hypothesis */}
              <div className="pt-3">
                <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase font-semibold flex items-center space-x-1 mb-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>AI Conversion Hypothesis (Unverified Assumption)</span>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed italic bg-amber-50/50 dark:bg-amber-950/20 p-2.5 border border-amber-200 dark:border-amber-900">
                  "{item.aiHypothesis}"
                </p>
              </div>
            </div>

            {/* Editable Proposed Fix */}
            <div className="pt-4 border-t border-gray-200 dark:border-swiss-border space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase text-blue-700 dark:text-blue-300 font-bold flex items-center space-x-1">
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Customise Solution Variant</span>
                </label>
                <button
                  onClick={() => handleCopyFix(item.id, item.userEditableFix || item.recommendedFix)}
                  className="text-[11px] font-mono text-gray-500 hover:text-black dark:hover:text-white flex items-center space-x-1 transition-colors"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Fix</span>
                    </>
                  )}
                </button>
              </div>
              <textarea
                rows={2}
                value={item.userEditableFix || item.recommendedFix}
                onChange={(e) => handleUpdateFix(item.id, e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#0a0a0c] border border-gray-300 dark:border-swiss-border p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
