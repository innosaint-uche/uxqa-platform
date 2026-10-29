import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveTelemetryShowcase } from './components/LiveTelemetryShowcase';
import { VisualStepScrobbler } from './components/VisualStepScrobbler';
import { VisualBugDiffViewer } from './components/VisualBugDiffViewer';
import { LiveReportEmbed } from './components/LiveReportEmbed';
import { MarketingAssetsGallery } from './components/MarketingAssetsGallery';
import { ComposioDispatchPanel } from './components/ComposioDispatchPanel';
import { Pillars } from './components/Pillars';
import { CompetitorMatrix } from './components/CompetitorMatrix';
import { Footer } from './components/Footer';
import { OnboardingModal } from './components/OnboardingModal';
import { LoginModal } from './components/LoginModal';
import { WorkspaceHub } from './components/WorkspaceHub';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('uxqa-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'light'; // Light theme default per CCO mandate
  });

  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<{
    type: 'showcase' | 'workspace';
    workspaceSlug?: string;
    projectSlug?: string;
  }>({ type: 'showcase' });

  // Handle HTML document theme classes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('uxqa-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Intelligent edge & path route listener
  useEffect(() => {
    const parseRoute = () => {
      const path = window.location.pathname.toLowerCase().replace(/^\/|\/$/g, '');
      const segments = path.split('/');

      if (path.includes('login')) {
        setIsLoginOpen(true);
      } else if (path.includes('registration') || path.includes('waitlist')) {
        setIsWaitlistOpen(true);
      }

      // Check if route matches :workspaceSlug/:projectSlug or :workspaceSlug
      if (segments.length >= 2 && segments[0] !== 'uxqa-app' && segments[0] !== 'api') {
        setCurrentRoute({
          type: 'workspace',
          workspaceSlug: segments[0],
          projectSlug: segments[1],
        });
      } else if (segments.length === 1 && (segments[0] === 'radoss' || segments[0] === 'workspaces')) {
        setCurrentRoute({
          type: 'workspace',
          workspaceSlug: 'radoss',
          projectSlug: undefined,
        });
      } else {
        setCurrentRoute({ type: 'showcase' });
      }
    };

    parseRoute();

    window.addEventListener('popstate', parseRoute);
    return () => window.removeEventListener('popstate', parseRoute);
  }, []);

  const navigateToWorkspace = (workspaceSlug = 'radoss', projectSlug?: string) => {
    const newPath = projectSlug ? `/${workspaceSlug}/${projectSlug}/` : `/${workspaceSlug}/`;
    window.history.pushState({}, '', newPath);
    setCurrentRoute({
      type: 'workspace',
      workspaceSlug,
      projectSlug,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentRoute({ type: 'showcase' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTelemetry = () => {
    const el = document.getElementById('telemetry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] dark:bg-swiss-black text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-600 selection:text-white transition-colors">
      {currentRoute.type === 'workspace' ? (
        /* Workspace Hub View */
        <WorkspaceHub
          workspaceSlug={currentRoute.workspaceSlug}
          projectSlug={currentRoute.projectSlug}
          initialView={currentRoute.projectSlug ? 'project' : 'workspace'}
          onNavigateHome={navigateToHome}
          onSelectProject={(ws, proj) => navigateToWorkspace(ws, proj)}
        />
      ) : (
        /* Showcase Landing Page */
        <>
          <Navbar
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenWaitlist={() => setIsWaitlistOpen(true)}
            onNavigateLogin={() => setIsLoginOpen(true)}
            onNavigateWorkspace={() => navigateToWorkspace('radoss')}
          />

          <main className="flex-1">
            <Hero
              onOpenWaitlist={() => setIsWaitlistOpen(true)}
              onScrollToTelemetry={scrollToTelemetry}
            />

            <LiveTelemetryShowcase />

            {/* Visual Proof & Living Artifacts Section */}
            <section className="py-20 md:py-28 bg-[#f8f9fa] dark:bg-[#0c0e12] border-b border-gray-200 dark:border-swiss-border transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-12">
                  <div className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 font-bold">
                    VISUAL PROOF &amp; LIVING ARTIFACTS
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Inspect Real DOM States. Catch Obscured Buttons. Verify Live Reports.
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Synthetic video boxes are eliminated. Every run generates living Playwright DOM scrobblers, pixel-perfect visual regression diffs, and live-embedded cloud test reports.
                  </p>
                </div>

                {/* 1. Interactive Step Scrobbler */}
                <VisualStepScrobbler />

                {/* 2. Before / After Visual Regression Diff */}
                <VisualBugDiffViewer />

                {/* 3. Living Cloudflare Pages QA Report Embed */}
                <LiveReportEmbed />

                {/* 4. Auto-Extracted Marketing Collaterals Gallery */}
                <MarketingAssetsGallery />

                {/* 5. Composio External Tool Bus Dispatch */}
                <div className="pt-8 border-t border-gray-200 dark:border-swiss-border">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-2.5 h-2.5 bg-purple-600"></span>
                    <span className="font-mono text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      AUTONOMOUS DEFECT DISPATCH (COMPOSIO TOOL BUS)
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-6">
                    Connect caught visual regressions and broken assertions directly to engineering workflows. One-click queue Linear tickets, GitHub issues, and Slack alerts with exact WebM video timestamps and trace links.
                  </p>
                  <ComposioDispatchPanel projectSlug="aira-academy" commitSha="c6a218f" />
                </div>
              </div>
            </section>

            {/* Quick Workspace Switcher CTA Strip */}
            <div className="bg-white dark:bg-[#111215] border-y border-gray-200 dark:border-swiss-border py-8 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
                <div>
                  <span className="text-gray-900 dark:text-white font-bold">READY TO AUDIT MULTI-PROJECT TELEMETRY?</span>
                  <p className="text-gray-600 dark:text-gray-400 font-sans mt-0.5">
                    Inspect dedicated workspace runs for AIRA Academy, Naija Grid, DeepSyque, and Eatalia Limited.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigateToWorkspace('radoss', 'aira-academy')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Launch Radoss Console</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            </div>

            <Pillars
              onOpenWaitlist={() => setIsWaitlistOpen(true)}
            />

            <CompetitorMatrix />
          </main>

          <Footer />
        </>
      )}

      {/* Modals */}
      <OnboardingModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenWaitlist={() => {
          setIsLoginOpen(false);
          setIsWaitlistOpen(true);
        }}
      />
    </div>
  );
}

export default App;
