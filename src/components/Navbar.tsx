import React from 'react';
import { Shield, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenWaitlist: () => void;
  onNavigateLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist, onNavigateLogin }) => {
  return (
    <header className="sticky top-0 z-40 bg-swiss-black/90 backdrop-blur-md border-b border-swiss-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-mono font-bold text-white text-base">
            U
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-extrabold text-white tracking-tight text-lg">UXQA</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-blue-950 text-blue-400 border border-blue-800">
                OSCAR
              </span>
            </div>
            <span className="text-[11px] text-swiss-muted tracking-tight hidden sm:block">
              by Radoss.
            </span>
          </div>
        </div>

        {/* Center Badge / Status */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-[#111215] border border-swiss-border font-mono text-xs">
          <span className="inline-block w-2 h-2 bg-emerald-500 animate-pulse"></span>
          <span className="text-gray-300">Cloud Runners Active</span>
          <span className="text-swiss-muted">•</span>
          <span className="text-blue-400 font-semibold">0MB Local RAM</span>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <a
            href="#telemetry"
            className="text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-colors hidden sm:inline-block"
          >
            Live Telemetry
          </a>
          <a
            href="#pillars"
            className="text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-colors hidden lg:inline-block"
          >
            Pillars
          </a>
          <button
            onClick={onNavigateLogin}
            className="px-3 py-2 text-xs font-mono text-gray-300 hover:text-white hover:bg-swiss-card border border-swiss-border transition-colors flex items-center space-x-1"
          >
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>Admin</span>
          </button>
          <button
            onClick={onOpenWaitlist}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-medium tracking-tight flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          >
            <span>Priority Access</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
