import React from 'react';
import { Shield, ArrowUpRight, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenWaitlist: () => void;
  onNavigateLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenWaitlist,
  onNavigateLogin,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-swiss-black/90 backdrop-blur-md border-b border-gray-200 dark:border-swiss-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-mono font-bold text-white text-base shadow-sm">
            U
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-extrabold text-gray-900 dark:text-white tracking-tight text-lg">UXQA</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-800 font-bold">
                OSCAR
              </span>
            </div>
            <span className="text-[11px] text-gray-500 dark:text-swiss-muted tracking-tight hidden sm:block">
              by Radoss.
            </span>
          </div>
        </div>

        {/* Center Badge / Status */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-gray-50 dark:bg-[#111215] border border-gray-200 dark:border-swiss-border font-mono text-xs text-gray-700 dark:text-gray-300">
          <span className="inline-block w-2 h-2 bg-emerald-500 animate-pulse"></span>
          <span>Cloud Runners Active</span>
          <span className="text-gray-400 dark:text-swiss-muted">•</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">0MB Local RAM</span>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white bg-gray-100 dark:bg-[#111215] border border-gray-300 dark:border-swiss-border transition-colors"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle visual theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-gray-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          <a
            href="#telemetry"
            className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors hidden sm:inline-block px-2"
          >
            Telemetry
          </a>
          <a
            href="#pillars"
            className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors hidden lg:inline-block px-2"
          >
            Pillars
          </a>
          <button
            onClick={onNavigateLogin}
            className="px-3 py-2 text-xs font-mono text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-swiss-card border border-gray-300 dark:border-swiss-border transition-colors flex items-center space-x-1"
          >
            <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Admin</span>
          </button>
          <button
            onClick={onOpenWaitlist}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold tracking-tight flex items-center space-x-1.5 transition-all shadow-sm"
          >
            <span>Priority Access</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
