import React from 'react';
import { Engine3D } from './Engine3D';
import { ChevronDown, Gauge, Zap, Wind, ShieldAlert } from 'lucide-react';

interface HeroSectionProps {
  isRevealed: boolean;
  onOpenConfigurator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isRevealed, onOpenConfigurator }) => {
  return (
    <section 
      id="cuore-v12" 
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#030303]"
    >
      {/* Background Architectural Grid Lines & Atmospheric Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(180,0,20,0.12),transparent_70%)] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Hero Headline & Philosophy (Rolls-Royce Black Badge Subversive Luxury Narrative) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full text-center mt-4 sm:mt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] sm:text-xs tracking-[0.35em] uppercase text-neutral-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_#ff0000]" />
          <span>The Alter Ego &bull; Black Badge Edition</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.18em] uppercase text-white leading-tight">
          Cuore <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-neutral-200">V12</span>
        </h1>

        <p className="max-w-2xl mx-auto mt-3 sm:mt-4 text-xs sm:text-sm tracking-[0.25em] text-neutral-400 uppercase font-sans font-light leading-relaxed">
          The Unfiltered Mechanical Symphony &bull; 65° Naturally Aspirated Masterpiece
        </p>
      </div>

      {/* Main 3D Interactive Engine Visualizer Showcase */}
      <div className="relative z-10 w-full flex-1 my-4 flex items-center justify-center">
        <Engine3D isRevealed={isRevealed} />
      </div>

      {/* Lower Telemetry Strip & Rolls-Royce Black Badge Metrics */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-neutral-950/70 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          
          {/* Metric 1 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left p-3 border-r border-white/[0.05] last:border-r-0">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] tracking-[0.25em] uppercase mb-1">
              <Zap className="w-3.5 h-3.5 text-red-500" />
              <span>Maximum Power</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wider">830</span>
              <span className="text-xs font-mono text-red-500 font-semibold uppercase">CV</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-sans tracking-widest mt-0.5">@ 9,250 RPM</span>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left p-3 border-r border-white/[0.05] last:border-r-0">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] tracking-[0.25em] uppercase mb-1">
              <Gauge className="w-3.5 h-3.5 text-red-500" />
              <span>Redline Limit</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wider">9,500</span>
              <span className="text-xs font-mono text-red-500 font-semibold uppercase">RPM</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-sans tracking-widest mt-0.5">Atmospheric Ceiling</span>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left p-3 border-r border-white/[0.05] last:border-r-0">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] tracking-[0.25em] uppercase mb-1">
              <Wind className="w-3.5 h-3.5 text-red-500" />
              <span>Acceleration</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wider">2.9</span>
              <span className="text-xs font-mono text-red-500 font-semibold uppercase">SEC</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-sans tracking-widest mt-0.5">0 – 100 KM/H</span>
          </div>

          {/* Metric 4 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left p-3">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] tracking-[0.25em] uppercase mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
              <span>Max Velocity</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wider">454</span>
              <span className="text-xs font-mono text-red-500 font-semibold uppercase">KM/H</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-sans tracking-widest mt-0.5">Terminal Speed</span>
          </div>

        </div>

        {/* Scroll Prompt */}
        <div className="mt-8 flex flex-col items-center justify-center text-center">
          <a 
            href="#showroom" 
            className="group flex flex-col items-center gap-2 text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase font-sans">
              Discover The Showroom
            </span>
            <div className="w-5 h-8 rounded-full border border-neutral-700 flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-red-600 rounded-full animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
