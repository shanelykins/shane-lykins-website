import React from 'react';
import { Header } from './components/Header';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { Footer } from './components/Footer';
import { PortfolioPage } from './components/PortfolioPage';

export default function App() {
  // Simple client-side routing
  const isPortfolioPage = window.location.pathname === '/portfolio';

  if (isPortfolioPage) {
    return <PortfolioPage />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Decorative elements */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/30 to-transparent" />
        <div className="absolute left-0 right-0 top-[20%] h-px bg-gradient-to-r from-transparent via-orange-200/20 to-transparent" />
        <div className="absolute left-0 right-0 top-[40%] h-px bg-gradient-to-r from-transparent via-orange-200/20 to-transparent" />
      </div>

      <main className="relative z-10 mx-auto max-w-5xl px-6">
        <Header />
        <Projects />
        <TechStack />
      </main>
      
      <Footer />
    </div>
  );
}