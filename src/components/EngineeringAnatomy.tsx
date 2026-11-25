import React, { useState } from 'react';
import { Cpu, ShieldCheck, Activity, Award, ChevronRight, Layers, Sparkles } from 'lucide-react';

interface TechItem {
  id: string;
  title: string;
  subtitle: string;
  spec: string;
  description: string;
  stat: string;
  statLabel: string;
}

const TECH_PILLARS: TechItem[] = [
  {
    id: 'rods',
    title: 'Titanium Connecting Rods',
    subtitle: 'Aeronautical Metallurgy',
    spec: '-40% Inertia Mass',
    description: 'Forged from grade 5 titanium alloy (Ti-6Al-4V), reducing oscillating reciprocating mass by 40% relative to steel. This radical weight reduction unlocks instantaneous throttle rev acceleration.',
    stat: '40%',
    statLabel: 'Lighter Than Steel'
  },
  {
    id: 'valvetrain',
    title: 'DLC Sliding Finger Followers',
    subtitle: 'Formula 1 Valvetrain Architecture',
    spec: '9,500 RPM Capability',
    description: 'Borrowing directly from Scuderia Ferrari Formula 1 engines, the camshafts actuate the valves through steel sliding finger followers coated with Diamond-Like Carbon (DLC) to endure violent 9,500 RPM cycles without hydraulic lash adjusters.',
    stat: '9,500',
    statLabel: 'RPM Rev Limit'
  },
  {
    id: 'injection',
    title: '350-Bar High-Pressure GDI',
    subtitle: 'Combustion Chamber Micro-Atomization',
    spec: '350 Bar Direct Rail',
    description: 'Direct injection pressures elevated to an unprecedented 350 bar. The multi-hole piezo injectors deliver micro-meter atomized fuel spray across multi-injection sequences per cycle, guaranteeing maximum thermal expansion.',
    stat: '350',
    statLabel: 'Bar Injection Pressure'
  },
  {
    id: 'exhaust',
    title: '6-into-1 Inconel Exhaust Manifolds',
    subtitle: 'Concert Pitch Acoustic Tuning',
    spec: 'F#4 Musical Key',
    description: 'Equal-length exhaust runners hydroformed from nickel-chromium superalloy Inconel 625. Every manifold tube matches within 1 millimeter of length, synchronizing exhaust pressure waves to sing in the harmonic musical interval of F#4.',
    stat: '1 mm',
    statLabel: 'Manifold Precision'
  }
];

export const EngineeringAnatomy: React.FC = () => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <section id="engineering" className="py-24 sm:py-32 bg-[#040406] text-white relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-red-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-neutral-900/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.35em] uppercase text-red-500 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>The Alchemy of Maranello</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-[0.16em] uppercase text-white">
            Architecture of <span className="font-semibold text-neutral-300">Atmospheric Fury</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm tracking-[0.2em] uppercase text-neutral-400 font-sans leading-relaxed">
            While others rely on forced induction or artificial battery assistance, the Ferrari Black Badge V12 stays true to the immortal soul: raw, uncompromised, high-revving atmospheric combustion.
          </p>
        </div>

        {/* Interactive Engineering Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Pillar List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {TECH_PILLARS.map((pillar, idx) => (
              <button
                key={pillar.id}
                onClick={() => setActiveItem(idx)}
                className={`p-5 rounded-2xl text-left border transition-all duration-300 ${
                  activeItem === idx
                    ? 'bg-neutral-900/90 border-red-500 shadow-[0_10px_30px_rgba(232,0,29,0.2)]'
                    : 'bg-neutral-950/40 border-white/[0.06] hover:border-white/20 hover:bg-neutral-900/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-red-500">
                    Component 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    {pillar.spec}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-normal tracking-wide text-white mt-1">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-400 font-sans tracking-wide mt-0.5">
                  {pillar.subtitle}
                </p>
              </button>
            ))}
          </div>

          {/* Detailed Component Deep Dive Card */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-neutral-950/80 border border-white/[0.08] backdrop-blur-xl shadow-2xl flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono tracking-widest uppercase text-neutral-300 mb-6">
                <Sparkles className="w-3 h-3 text-red-500" />
                <span>Technical Specifications Dossier</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl font-normal tracking-wide text-white uppercase">
                {TECH_PILLARS[activeItem].title}
              </h3>

              <div className="h-0.5 w-16 bg-red-600 my-4" />

              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed tracking-wide mt-4">
                {TECH_PILLARS[activeItem].description}
              </p>
            </div>

            {/* Metric Callout Highlight */}
            <div className="mt-8 pt-8 border-t border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">
                  {TECH_PILLARS[activeItem].stat}
                </span>
                <span className="block text-xs uppercase tracking-widest text-neutral-400 font-mono mt-1">
                  {TECH_PILLARS[activeItem].statLabel}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono block">
                  Design Standard
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                  Scuderia Corsa Spec
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
