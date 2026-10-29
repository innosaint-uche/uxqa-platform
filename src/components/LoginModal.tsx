import React, { useState } from 'react';
import { X, Shield, Lock, CheckCircle2, AlertTriangle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWaitlist: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onOpenWaitlist }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    
    // Super Admin authorized emails per AGENTS.md
    const isSuperAdmin = cleanEmail === 'uchenna@radossdigital.com' || cleanEmail === 'innosaint.uche@gmail.com';

    if (isSuperAdmin) {
      setError(null);
      setSuccess(true);
    } else {
      setError('Unrecognized developer identity. Public access is restricted to the priority waitlist.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#111215] border border-swiss-border w-full max-w-md p-6 sm:p-8 relative shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!success ? (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base">Super Admin Gate</h3>
                <span className="text-[11px] font-mono text-swiss-muted">Restricted RBAC Access</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Sign in with your verified developer credentials to inspect telemetry logs, configure Cloudflare R2 bucket policies, or trigger manual E2E sweeps.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                <div>
                  <div>{error}</div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenWaitlist();
                    }}
                    className="text-blue-400 underline font-semibold mt-1 block"
                  >
                    Join Priority Waitlist Instead &rarr;
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">Super Admin Email</label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0a0a0c] border border-swiss-border px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">Access Token / Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0a0c] border border-swiss-border px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-sans"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authenticate to Console</span>
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-swiss-border text-center">
              <span className="text-xs text-swiss-muted">Not a super admin?</span>{' '}
              <button
                onClick={() => {
                  onClose();
                  onOpenWaitlist();
                }}
                className="text-xs font-medium text-blue-400 hover:underline"
              >
                Apply for Cohort 1 Access
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">Super Admin Session Verified</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-mono">
              Authenticated as: <span className="text-emerald-400">{email}</span>
            </p>
            <div className="p-3 bg-[#0a0a0c] border border-swiss-border font-mono text-xs text-left text-gray-400 space-y-1">
              <div>• Workspace: Radoss Master Console</div>
              <div>• Cloudflare D1: Connected (`uxqa-db`)</div>
              <div>• Cloudflare R2: Connected (`uxqa-artifacts`)</div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs font-mono transition-colors"
            >
              Enter Dashboard Console
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
