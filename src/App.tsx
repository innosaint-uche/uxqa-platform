import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Pillars } from './components/Pillars';
import { LiveTelemetryShowcase } from './components/LiveTelemetryShowcase';
import { CompetitorMatrix } from './components/CompetitorMatrix';
import { Footer } from './components/Footer';
import { OnboardingModal } from './components/OnboardingModal';
import { LoginModal } from './components/LoginModal';

export function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Simple edge route listener for /login and /registration paths
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('login')) {
      setIsLoginOpen(true);
    } else if (path.includes('registration') || path.includes('waitlist')) {
      setIsWaitlistOpen(true);
    }
  }, []);

  const scrollToTelemetry = () => {
    const el = document.getElementById('telemetry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-swiss-black text-gray-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        onOpenWaitlist={() => setIsWaitlistOpen(true)}
        onNavigateLogin={() => setIsLoginOpen(true)}
      />

      {/* Main Page Showcase */}
      <main className="flex-1">
        <Hero
          onOpenWaitlist={() => setIsWaitlistOpen(true)}
          onScrollToTelemetry={scrollToTelemetry}
        />

        <LiveTelemetryShowcase />

        <Pillars
          onOpenWaitlist={() => setIsWaitlistOpen(true)}
        />

        <CompetitorMatrix />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Intake Engine */}
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
