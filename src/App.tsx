import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { IntroScreen } from './components/IntroScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BespokeShowroom } from './components/BespokeShowroom';
import { InteractiveSoundstage } from './components/InteractiveSoundstage';
import { EngineeringAnatomy } from './components/EngineeringAnatomy';
import { CraftsmanshipDetails } from './components/CraftsmanshipDetails';
import { Footer } from './components/Footer';
import { BespokeConfiguratorModal } from './components/BespokeConfiguratorModal';

export const App: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [selectedCarForConfig, setSelectedCarForConfig] = useState<string>('12Cilindri Black Badge');
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Butter-Smooth Inertial Scroll (Rolls-Royce Black Badge Fluidity)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    // Initially stop scrolling while on the intro screen
    if (!isRevealed) {
      lenis.stop();
    }

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lock and hide scrollbar while in initial start screen state
  useEffect(() => {
    if (!isRevealed) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      lenisRef.current?.start();
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isRevealed]);

  const handleOpenConfigurator = (carName?: string) => {
    if (carName) setSelectedCarForConfig(carName);
    setIsConfiguratorOpen(true);
  };

  return (
    <div className={`relative min-h-screen bg-[#030303] text-neutral-100 font-sans selection:bg-red-600 selection:text-white ${
      isRevealed ? 'overflow-x-hidden' : 'h-screen overflow-hidden'
    }`}>
      
      {/* 1. INITIAL STATE & IGNITION: Stark Pitch-Black Entry with Centered Cavallino & Push Start Button */}
      <IntroScreen onEngineStarted={() => setIsRevealed(true)} />

      {/* 2. MAIN WEBSITE INTERFACE: Revealed upon Push Start */}
      <div 
        className={`transition-opacity duration-1000 ${
          isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none max-h-screen overflow-hidden'
        }`}
      >
        {/* Navigation Bar */}
        <Navbar onOpenConfigurator={() => handleOpenConfigurator()} />

        {/* Hero Section with Interactive 3D V12 Engine Model */}
        <HeroSection 
          isRevealed={isRevealed} 
          onOpenConfigurator={() => handleOpenConfigurator()} 
        />

        {/* Bespoke Showroom: Dark Horse Lineup & Colorway Selector */}
        <BespokeShowroom onOpenConfigurator={handleOpenConfigurator} />

        {/* Interactive Soundstage: Accelerator Pedal & F1 Shift Lights */}
        <InteractiveSoundstage />

        {/* Engineering Anatomy: The 6.5L Naturally Aspirated V12 Deep Dive */}
        <EngineeringAnatomy />

        {/* Craftsmanship of the Shadows: Macro Artistry */}
        <CraftsmanshipDetails />

        {/* Luxury Prestige Footer */}
        <Footer />
      </div>

      {/* Bespoke Atelier Configurator Modal */}
      <BespokeConfiguratorModal
        isOpen={isConfiguratorOpen}
        onClose={() => setIsConfiguratorOpen(false)}
        initialCar={selectedCarForConfig}
      />

    </div>
  );
};

export default App;
