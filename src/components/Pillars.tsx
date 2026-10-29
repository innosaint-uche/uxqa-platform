import React from 'react';
import { Cpu, Users, FileText, Image as ImageIcon, CheckCircle, ArrowRight } from 'lucide-react';

interface PillarsProps {
  onOpenWaitlist: () => void;
}

export const Pillars: React.FC<PillarsProps> = ({ onOpenWaitlist }) => {
  const pillars = [
    {
      id: 'pillar-cloud',
      icon: Cpu,
      badge: 'Hardware Equality',
      badgeColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800',
      title: 'Universal Zero-Hardware Cloud QA',
      headline: 'Institutional-grade testing. Zero local CPU or RAM load.',
      description:
        'Whether you code on an 8GB laptop, a MacBook Air, or a PC workstation, never freeze your machine running heavy headless browser suites again. UXQA executes all tests in isolated cloud runners, streaming live video evidence and interactive traces straight to your edge dashboard.',
      bulletPoints: [
        '100% cloud execution via GitHub Actions and Cloudflare Browser Rendering',
        '0 MB RAM used on your local developer machine',
        'Direct Cloudflare R2 storage with zero egress fees forever',
        'Fail-closed automated PR verification gates'
      ]
    },
    {
      id: 'pillar-personas',
      icon: Users,
      badge: 'Workers AI Inferred',
      badgeColor: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800',
      title: 'Simulated AI User Personas',
      headline: 'Your product tested through the eyes of real customer archetypes.',
      description:
        'Do not rely on binary pass/fail assertions. Our specialised AI persona agents simulate non-technical beginners, sceptical buyers, and speed power users to catch usability roadblocks, hidden menus, and confusing checkout hesitations before your real users churn.',
      bulletPoints: [
        'The Non-Technical Novice: Catches confusing jargon and hidden navigation',
        'The Speed Power User: Validates rapid keybindings and responsive layout integrity',
        'The Sceptical Buyer: Evaluates checkout friction, guarantees, and pricing clarity',
        'Sub-90-second AI persona dispatch on every git push'
      ]
    },
    {
      id: 'pillar-copy',
      icon: FileText,
      badge: 'Conversion Engine',
      badgeColor: 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800',
      title: 'Automated UX Copy & Conversion Audits',
      headline: 'Catch conversion leaks and confusing microcopy before you launch.',
      description:
        'Our copywriting models audit every button label, form placeholder, error toast, and hero headline for readability grade, clarity, and tone alignment. Turn accidental developer jargon into high-converting copy automatically.',
      bulletPoints: [
        'Flesch-Kincaid readability scoring on all critical landing page elements',
        'Automatic replacement suggestions for passive or defensive error toasts',
        'Conversion lift projections based on battle-tested UX writing benchmarks',
        'Unified tone of voice governance across your entire product surface'
      ]
    },
    {
      id: 'pillar-marketing',
      icon: ImageIcon,
      badge: 'Growth Collaterals',
      badgeColor: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800',
      title: 'Instant Marketing & App Store Collateral Extraction',
      headline: 'Pristine product screenshots and demo clips on every push.',
      description:
        'Stop spending hours manually taking cropped screenshots for Product Hunt, App Store listings, documentation, and changelogs. UXQA automatically extracts pixel-perfect, device-framed UI snapshots directly from your green test runs.',
      bulletPoints: [
        'Automated device-framed screenshots (Desktop, Tablet, Mobile)',
        'Clean WebM / GIF video snippets generated from successful journeys',
        'Instant copy-paste snippets for Product Hunt, Changelogs, and Docs',
        'Zero manual video recording or photo editing required'
      ]
    }
  ];

  return (
    <section id="pillars" className="py-20 md:py-28 bg-gray-50/50 dark:bg-[#0c0e12] border-b border-gray-200 dark:border-swiss-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 font-bold">
            THE FOUR PILLARS OF UXQA
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
            Engineered for Modern Vibe Coders &amp; Fast-Moving Teams.
          </h2>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Eliminating the £50,000 human QA salary requirement while protecting your laptop from
            brutal browser crashes and memory exhaustion.
          </p>
        </div>

        {/* 2x2 Swiss Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 sm:p-8 hover:border-blue-500/70 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-[#181a20] border border-gray-300 dark:border-swiss-border flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-mono uppercase px-2.5 py-1 border font-semibold ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">
                    {pillar.title}
                  </h3>
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
                    {pillar.headline}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-swiss-border space-y-2.5">
                  {pillar.bulletPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 p-6 bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold text-gray-900 dark:text-white">Need custom persona calibration for your industry?</span>{' '}
            Our onboarding questionnaire custom-tunes Llama 3.2 and Qwen 2.5 models to your target demographic.
          </div>
          <button
            onClick={onOpenWaitlist}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm whitespace-nowrap flex items-center space-x-2 transition-colors"
          >
            <span>Configure Personas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
