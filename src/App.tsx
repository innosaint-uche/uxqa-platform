import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Pillars } from './components/Pillars';
import { LiveTelemetryShowcase } from './components/LiveTelemetryShowcase';
import { CompetitorMatrix } from './components/CompetitorMatrix';
import { Footer } from './components/Footer';
import { OnboardingModal } from './components/OnboardingModal';
import { LoginModal } from './components/LoginModal';
import { WorkspaceHub } from './components/WorkspaceHub';

export function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<{
    type: 'showcase' | 'workspace';
    workspaceSlug?: string;
    projectSlug?: string;
  }>({ type: 'showcase' });

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

      // Check if route matches :workspaceSlug/:projectSlug
      if (segments.length >= 2 && segments[0] !== 'uxqa-app' && segments[0] !== 'api') {
        setCurrentRoute({
          type: 'workspace',
          workspaceSlug: segments[0],
          projectSlug: segments[1],
        });
      } else {
        setCurrentRoute({ type: 'showcase' });
      }
    };

    parseRoute();

    window.addEventListener('popstate', parseRoute);
    return () => window.removeEventListener('popstate', parseRoute);
  }, []);

  const navigateToWorkspace = (workspaceSlug = 'radoss', projectSlug = 'aira-academy') => {
    const newPath = `/${workspaceSlug}/${projectSlug}/`;
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
    <div className="min-h-screen flex flex-col bg-swiss-black text-gray-100 font-sans selection:bg-blue-600 selection:text-white">
      {currentRoute.type === 'workspace' ? (
        /* Workspace Hub View */
        <WorkspaceHub
          workspaceSlug={currentRoute.workspaceSlug}
          projectSlug={currentRoute.projectSlug}
          onNavigateHome={navigateToHome}
          onSelectProject={(ws, proj) => navigateToWorkspace(ws, proj)}
        />
      ) : (
        /* Showcase Landing Page */
        <>
          <Navbar
            onOpenWaitlist={() => setIsWaitlistOpen(true)}
            onNavigateLogin={() => setIsLoginOpen(true)}
          />

          <main className="flex-1">
            <Hero
              onOpenWaitlist={() => setIsWaitlistOpen(true)}
              onScrollToTelemetry={scrollToTelemetry}
            />

            <LiveTelemetryShowcase />

            {/* Quick Workspace Switcher CTA Strip */}
            <div className="bg-[#111215] border-y border-swiss-border py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
                <div>
                  <span className="text-white font-bold">READY TO AUDIT MULTI-PROJECT TELEMETRY?</span>
                  <p className="text-gray-400 font-sans mt-0.5">
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
