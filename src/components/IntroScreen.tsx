import React, { useState, useEffect } from 'react';
import { EngineLogo } from './EngineLogo';
import { EngineStartButton } from './EngineStartButton';
import { ferrariAudio } from '../audio/engineSound';

interface IntroScreenProps {
  onEngineStarted: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEngineStarted }) => {
  const [showButton, setShowButton] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [zoomTransition, setZoomTransition] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Fade in the Engine Push Start button shortly after the initial horse is presented
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = async () => {
    if (isStarting) return;
    setIsStarting(true);

    // 1. Play the visceral Ferrari V12 engine sound immediately
    ferrariAudio.startEngine();

    // 2. Trigger simultaneous cinematic zoom-through and light burst transition
    setTimeout(() => {
      setZoomTransition(true);
    }, 150);

    // 3. Notify parent app to reveal main interface synchronized with the rev peak
    setTimeout(() => {
      onEngineStarted();
    }, 700);

    // 4. Remove intro overlay completely from DOM tree once transition finishes
    setTimeout(() => {
      setIsHidden(true);
    }, 1800);
  };

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] overflow-hidden transition-all duration-1000 ${
        zoomTransition ? 'opacity-0 pointer-events-none scale-125 backdrop-blur-xl' : 'opacity-100'
      }`}
    >
      {/* Subtle cinematic vignette and noise texture */}
      <div className="absolute inset-0 bg-radial from-neutral-900/40 via-transparent to-black pointer-events-none" />
      
      {/* Background Combustion Shockwave on Ignition */}
      {isStarting && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[120vw] h-[120vw] rounded-full bg-red-600/30 blur-3xl animate-ping duration-1000" />
          <div className="absolute w-[80vw] h-[80vw] rounded-full bg-white/20 blur-2xl animate-pulse" />
        </div>
      )}

      {/* Center Branding Stage */}
      <div 
        className={`relative z-10 flex flex-col items-center justify-center max-w-lg px-6 transition-all duration-1000 ease-out transform ${
          zoomTransition ? 'scale-150 -translate-y-8 filter blur-sm' : 'scale-100 translate-y-0'
        }`}
      >
        {/* Iconic V12 Engine Logo */}
        <div className="animate-pulse-subtle transition-transform duration-700">
          <EngineLogo
            size={160}
            variant={isStarting ? 'red' : 'chrome'}
            className="transition-all duration-500 drop-shadow-[0_0_30px_rgba(255,40,0,0.35)]"
          />
        </div>

        {/* Wordmark */}
        <div className="mt-8 text-center">
          <h1 className="font-serif tracking-[0.45em] text-xs sm:text-sm uppercase text-neutral-400 font-medium">
            Rev Matching
          </h1>
          <p className="mt-1 text-[10px] tracking-[0.55em] uppercase text-neutral-600 font-sans">
            Precision &bull; Performance &bull; Passion
          </p>
        </div>

        {/* Engine Push Start Button Section */}
        <div
          className={`mt-14 sm:mt-16 transition-all duration-1000 transform ${
            showButton 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <EngineStartButton onStart={handleStart} isStarting={isStarting} />
        </div>

        {/* Bottom Discrete Audio Notice */}
        <div
          className={`mt-12 text-[10px] tracking-[0.25em] text-neutral-600 uppercase transition-opacity duration-700 ${
            showButton ? 'opacity-70' : 'opacity-0'
          }`}
        >
          <span>Acoustic Experience Enabled &bull; Best With Headphones</span>
        </div>
      </div>
    </div>
  );
};
