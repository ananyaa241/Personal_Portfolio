import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Capabilities from './components/Capabilities';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Metrics from './components/Metrics';
import Exploring from './components/Exploring';
import HackathonCollage from './components/HackathonCollage';
import CertificatesGallery from './components/CertificatesGallery';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-portfolio-pink selection:bg-portfolio-lime/50 selection:text-portfolio-black text-portfolio-black relative overflow-hidden font-sans">
      <Navigation />

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-24 space-y-32">
        <Hero />
        <Journey />
        <Capabilities />
        <Projects />
        <Achievements />
        <Metrics />
        <Exploring />
        <HackathonCollage />
        <CertificatesGallery />
        <Contact />
      </main>
    </div>
  );
}

export default App;
