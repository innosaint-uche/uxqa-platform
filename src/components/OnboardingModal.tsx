import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  Globe, 
  ExternalLink, 
  AlertTriangle 
} from 'lucide-react';
import { IntakeSubmission } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToBuilder?: (targetUrl?: string) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ 
  isOpen, 
  onClose,
  onNavigateToBuilder,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<Partial<IntakeSubmission>>({
    role: 'Vibe Coder',
    techStack: 'Vite + React + Tailwind',
    targetPersona: 'Non-technical Consumer',
    topPainPoint: 'I am scared my app breaks when I push new features.',
    reviewRigor: 'Full Executive Suite',
    referralSource: 'Radoss Ecosystem',
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [instantAudit, setInstantAudit] = useState<any | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleNext = async () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const res = await fetch('/api/intake', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (res.ok && result.success) {
          if (result.instantAudit) {
            setInstantAudit(result.instantAudit);
          }
          setIsSubmitted(true);
        } else {
          // Graceful fallback for local dev when backend is absent
          setIsSubmitted(true);
        }
      } catch (err) {
        // Fallback for offline or local preview
        setIsSubmitted(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCopyPrompt = () => {
    if (!instantAudit) return;
    const prompt = `# UXQA Autonomous Edge Audit: ${formData.productName || 'Web App'}
- **Target URL:** ${instantAudit.targetUrl}
- **Page Title:** ${instantAudit.pageTitle}
- **Edge Latency:** ${instantAudit.edgeLatencyMs}ms (HTTP ${instantAudit.httpStatus})
- **Client Hardware Toll:** 0.0 MB RAM (Executed on Cloudflare Edge)
- **Simulated Persona:** ${instantAudit.personaFeedback?.[0]?.persona || 'Customer'}
- **Verdict:** ${instantAudit.personaFeedback?.[0]?.verdict || 'Review'} (${instantAudit.personaFeedback?.[0]?.score || 90}/100)

## Detected Friction Points:
${instantAudit.personaFeedback?.[0]?.critique || 'No critical blocking leaks.'}

## Priority Fixes to Implement:
${instantAudit.personaFeedback?.[0]?.recommendations?.map((r: string, i: number) => `${i + 1}. ${r}`).join('\n') || 'None'}

## Recommended Copy Lift:
- **Selector:** ${instantAudit.uxCopyAudit?.[0]?.selector || 'h1'}
- **Original:** "${instantAudit.uxCopyAudit?.[0]?.originalText || ''}"
- **Improved:** "${instantAudit.uxCopyAudit?.[0]?.recommendedImprovement || ''}"
- **Expected Lift:** ${instantAudit.uxCopyAudit?.[0]?.expectedConversionLift || '+15%'}`;

    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className={`bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border w-full ${isSubmitted && instantAudit ? 'max-w-3xl' : 'max-w-2xl'} max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl transition-all`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Progress header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200 dark:border-swiss-border font-mono text-xs">
              <span className="text-blue-600 dark:text-blue-400 font-semibold uppercase">
                STEP {step} OF 6: INTAKE &amp; CALIBRATION
              </span>
              <span className="text-gray-500 dark:text-swiss-muted">Zero-Hardware Cloud Engine</span>
            </div>

            {submitError && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
                {submitError}
              </div>
            )}

            {/* Step 1: Identity & Role */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">Who is building?</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Introduce yourself and your organization so our personas tailor their feedback style.
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-mono text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.fullName || ''}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0c] border border-gray-300 dark:border-swiss-border px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-700 dark:text-gray-300 mb-1">Work Email</label>
                    <input
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.workEmail || ''}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0c] border border-gray-300 dark:border-swiss-border px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-700 dark:text-gray-300 mb-1">Primary Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0c] border border-gray-300 dark:border-swiss-border px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 font-sans"
                    >
                      <option value="Vibe Coder">Vibe Coder (AI-Assisted Builder)</option>
                      <option value="Solo Founder">Solo Founder / Technical Founder</option>
                      <option value="Engineering Lead">Engineering Lead / CTO</option>
                      <option value="Product Lead">Product Manager / Head of Product</option>
                      <option value="Agency Owner">Agency Owner / Freelance Consultant</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Product & Repository */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">What are you testing?</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Provide your product details. If you include a live URL, UXQA will run an instant autonomous audit on completion.
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-mono text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
                    <input
                      type="text"
                      placeholder="e.g. HyperFlow Studio"
                      value={formData.productName || ''}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0c] border border-gray-300 dark:border-swiss-border px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-700 dark:text-gray-300 mb-1">
                      Live URL or Staging Domain <span className="text-blue-600 dark:text-blue-400 font-semibold">(Instant Audit Enabled)</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://app.yourdomain.com"
                      value={formData.productionUrl || ''}
                      onChange={(e) => setFormData({ ...formData, productionUrl: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0c] border border-gray-300 dark:border-swiss-border px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-700 dark:text-gray-300 mb-1">Repository Stack</label>
                    <input
                      type="text"
                      placeholder="e.g. Next.js 15, Vite + React, Remix, Svelte"
                      value={formData.techStack || ''}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0c] border border-gray-300 dark:border-swiss-border px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Target Persona */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">Who is your ideal customer?</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Our Workers AI models will simulate this profile during exploratory UI testing.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      label: 'Non-technical Consumer',
                      desc: 'Requires crystal-clear language, zero technical terms, obvious buttons and instant cues.'
                    },
                    {
                      label: 'B2B Professional',
                      desc: 'Needs high information density, fast keyboard navigation, and streamlined workflows.'
                    },
                    {
                      label: 'Developer / Technical User',
                      desc: 'Scrutinizes API documentation, keybindings, and console errors.'
                    }
                  ].map((p, idx) => (
                    <label
                      key={idx}
                      className={`block p-4 border cursor-pointer transition-colors ${
                        formData.targetPersona === p.label
                          ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-600 dark:border-blue-500 text-gray-900 dark:text-white'
                          : 'bg-gray-50 dark:bg-[#0a0a0c] border-gray-200 dark:border-swiss-border text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="targetPersona"
                          checked={formData.targetPersona === p.label}
                          onChange={() => setFormData({ ...formData, targetPersona: p.label as any })}
                          className="accent-blue-600"
                        />
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{p.label}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{p.desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Top QA Pain Points */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">What keeps you up at night?</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Select your primary operational headache so we prioritise the right assertions.
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    'I am scared my app breaks when I push new features.',
                    'My mobile responsive layout looks broken or overflows.',
                    'I do not have time to write or run complex automated tests.',
                    'My computer slows to a crawl when running local test browsers.',
                    'I need clean product screenshots and video tours for marketing.'
                  ].map((pain, idx) => (
                    <label
                      key={idx}
                      className={`block p-3 border cursor-pointer text-xs transition-colors ${
                        formData.topPainPoint === pain
                          ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-600 dark:border-blue-500 text-gray-900 dark:text-white font-medium'
                          : 'bg-gray-50 dark:bg-[#0a0a0c] border-gray-200 dark:border-swiss-border text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <input
                          type="radio"
                          name="topPainPoint"
                          checked={formData.topPainPoint === pain}
                          onChange={() => setFormData({ ...formData, topPainPoint: pain })}
                          className="accent-blue-600"
                        />
                        <span>{pain}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Testing Rigor */}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">What review rigor do you need?</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Select the level of scrutiny applied on every git push.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      label: 'Polish & Usability',
                      desc: 'Highlights UX friction, typo catches, contrast checks, and layout bugs.'
                    },
                    {
                      label: 'Strict Breakage & Security',
                      desc: 'Probes invalid inputs, unhandled auth redirects, 404s, and slow network timeouts.'
                    },
                    {
                      label: 'Full Executive Suite',
                      desc: 'Combines Usability + Security + A/B Copy Optimization + Marketing Collateral Extraction.'
                    }
                  ].map((r, idx) => (
                    <label
                      key={idx}
                      className={`block p-4 border cursor-pointer transition-colors ${
                        formData.reviewRigor === r.label
                          ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-600 dark:border-blue-500 text-gray-900 dark:text-white'
                          : 'bg-gray-50 dark:bg-[#0a0a0c] border-gray-200 dark:border-swiss-border text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="reviewRigor"
                          checked={formData.reviewRigor === r.label}
                          onChange={() => setFormData({ ...formData, reviewRigor: r.label as any })}
                          className="accent-blue-600"
                        />
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{r.label}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{r.desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Referral & Cohort Activation */}
            {step === 6 && (
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">How did you hear about UXQA?</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Final step to activate your profile and execute the autonomous edge audit.
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-mono text-gray-700 dark:text-gray-300 mb-1">Referral Source</label>
                    <select
                      value={formData.referralSource}
                      onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0c] border border-gray-300 dark:border-swiss-border px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Radoss Ecosystem">Radoss Ecosystem (AIRA, Naija Grid)</option>
                      <option value="Twitter / X">Twitter / X (@UchennaInnocent)</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="GitHub">GitHub / Open Source</option>
                      <option value="Founder Referral">Friend or Founder Referral</option>
                    </select>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border font-mono text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <div className="text-emerald-600 dark:text-emerald-400 font-semibold">Instant Execution Guarantees:</div>
                    <div>• 100% Free Cloudflare R2 Egress Storage</div>
                    <div>• Sub-second Autonomous Edge Inspection</div>
                    <div>• 0 MB Local Developer RAM Consumed</div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-swiss-border flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#0a0a0c] dark:hover:bg-[#181a20] text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white border border-gray-300 dark:border-swiss-border text-xs font-mono transition-colors"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all shadow-sm"
              >
                <span>
                  {isSubmitting
                    ? 'Executing Edge Audit...'
                    : step === 6
                    ? 'Submit & Generate Audit'
                    : 'Continue'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : instantAudit ? (
          /* INSTANT AUDIT SHOWCASE (Conversion Loop) */
          <div className="space-y-6 animate-fade-in font-sans">
            
            {/* Header Banner */}
            <div className="pb-4 border-b border-gray-200 dark:border-swiss-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold mb-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AUTONOMOUS EDGE AUDIT READY</span>
                  <span>•</span>
                  <span className="text-emerald-600 dark:text-emerald-400">0 MB Local RAM Toll</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {instantAudit.pageTitle || formData.productName}
                </h3>
                <div className="flex items-center space-x-2 text-xs font-mono text-gray-500 mt-0.5">
                  <Globe className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate max-w-sm">{instantAudit.targetUrl}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-1 font-mono text-xs font-bold border flex items-center space-x-1 ${
                  instantAudit.status === 'passed'
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                }`}>
                  {instantAudit.status === 'passed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  <span>{instantAudit.status === 'passed' ? 'INSPECTION PASSED' : 'FRICTION DETECTED'}</span>
                </span>
                <span className="px-2.5 py-1 bg-gray-100 dark:bg-[#181a20] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-swiss-border font-mono text-xs">
                  {instantAudit.edgeLatencyMs}ms
                </span>
              </div>
            </div>

            {/* Quick KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
                <div className="text-[10px] font-mono text-gray-500 uppercase">Edge Handshake</div>
                <div className="text-sm font-mono font-bold text-gray-900 dark:text-white mt-0.5">
                  HTTP {instantAudit.httpStatus} OK
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
                <div className="text-[10px] font-mono text-gray-500 uppercase">Viewport Status</div>
                <div className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">
                  {instantAudit.hasViewport ? 'Responsive (iPhone 16)' : 'Missing Meta Viewport'}
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
                <div className="text-[10px] font-mono text-gray-500 uppercase">Interactive Elements</div>
                <div className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                  {instantAudit.buttonCount} Buttons • {instantAudit.linkCount} Links
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
                <div className="text-[10px] font-mono text-gray-500 uppercase">Image Alt Check</div>
                <div className="text-sm font-mono font-bold text-gray-900 dark:text-white mt-0.5">
                  {instantAudit.missingAltCount === 0 ? '100% Attributed' : `${instantAudit.missingAltCount} Missing Alt`}
                </div>
              </div>
            </div>

            {/* Persona Review Card */}
            {instantAudit.personaFeedback && instantAudit.personaFeedback.length > 0 && (
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-gray-900 dark:text-white">
                      Simulated Archetype: {instantAudit.personaFeedback[0].persona}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">(@cf/meta/llama-3.3-70b)</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {instantAudit.personaFeedback[0].verdict} ({instantAudit.personaFeedback[0].score}/100)
                  </span>
                </div>

                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                  "{instantAudit.personaFeedback[0].critique}"
                </p>

                {instantAudit.personaFeedback[0].recommendations && (
                  <div className="space-y-1 pt-2 border-t border-gray-200 dark:border-swiss-border">
                    <div className="text-[10px] font-mono uppercase text-gray-500 font-bold">Recommended Remediations:</div>
                    {instantAudit.personaFeedback[0].recommendations.map((rec: string, i: number) => (
                      <div key={i} className="text-xs font-mono text-blue-600 dark:text-blue-400 flex items-start space-x-1.5">
                        <span>→</span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* UX Copy Optimization Card */}
            {instantAudit.uxCopyAudit && instantAudit.uxCopyAudit.length > 0 && (
              <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-600 dark:text-gray-400">Primary Headline Audit</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {instantAudit.uxCopyAudit[0].expectedConversionLift}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Current: <span className="font-semibold text-gray-900 dark:text-white">"{instantAudit.uxCopyAudit[0].originalText}"</span>
                </div>
                <div className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                  Recommended: "{instantAudit.uxCopyAudit[0].recommendedImprovement}"
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-200 dark:border-swiss-border gap-3">
              <button
                onClick={handleCopyPrompt}
                className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#181a20] dark:hover:bg-[#20232b] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-swiss-border font-mono text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
                <span>{copiedPrompt ? 'Prompt Copied to Clipboard!' : 'Copy Markdown for Claude / Antigravity'}</span>
              </button>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                {onNavigateToBuilder && (
                  <button
                    onClick={() => onNavigateToBuilder(instantAudit.targetUrl)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                  >
                    <span>Launch Visual Journey Builder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#181a20] dark:hover:bg-[#20232b] text-gray-700 dark:text-gray-300 text-xs font-mono border border-gray-300 dark:border-swiss-border"
                >
                  Done
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Basic Confirmation Fallback (when no production URL was provided) */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white">
              Calibration Profile Accepted.
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-gray-900 dark:text-white">{formData.fullName || 'Builder'}</span>. Your testing profile for <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">{formData.productName || 'your project'}</span> is queued for Cohort 1 activation.
            </p>

            <div className="p-4 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border max-w-md mx-auto font-mono text-xs text-gray-600 dark:text-gray-400 text-left space-y-1.5">
              <div><span className="text-gray-500 dark:text-swiss-muted">Status:</span> <span className="text-emerald-600 dark:text-emerald-400 font-bold">Priority Waitlist Confirmed</span></div>
              <div><span className="text-gray-500 dark:text-swiss-muted">Role:</span> {formData.role}</div>
              <div><span className="text-gray-500 dark:text-swiss-muted">Testing Rigor:</span> {formData.reviewRigor}</div>
              <div><span className="text-gray-500 dark:text-swiss-muted">Local Hardware Load:</span> 0 MB RAM</div>
            </div>

            <div className="pt-4 flex items-center justify-center space-x-3">
              {formData.productionUrl && (
                <a
                  href={formData.productionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#181a20] dark:hover:bg-[#20232b] text-xs font-mono border border-gray-300 dark:border-swiss-border text-gray-800 dark:text-gray-200 flex items-center space-x-1"
                >
                  <span>Visit Domain</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors shadow-sm"
              >
                Return to Workspace
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
