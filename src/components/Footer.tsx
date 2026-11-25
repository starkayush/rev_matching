import React from 'react';
import { EngineLogo } from './EngineLogo';
import { ArrowUp, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-neutral-400 border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Brand Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-12 border-b border-white/[0.06] gap-6">
          <div className="flex items-center gap-4">
            <EngineLogo size={44} variant="chrome" className="hover:opacity-80 transition-opacity" />
            <div>
              <span className="font-serif text-sm tracking-[0.3em] font-bold text-white uppercase block">
                Ferrari
              </span>
              <span className="text-[9px] tracking-[0.4em] font-sans text-neutral-400 uppercase">
                Black Badge Edition &bull; Atelier Maranello
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors self-start sm:self-auto group"
          >
            <span>Return to Apex</span>
            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-red-500 group-hover:text-red-500 transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs font-sans tracking-wider border-b border-white/[0.06]">
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-white mb-4">
              The Lineage
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#cuore-v12" className="hover:text-red-400 transition-colors">Cuore V12 Architecture</a></li>
              <li><a href="#showroom" className="hover:text-red-400 transition-colors">12Cilindri Black Badge</a></li>
              <li><a href="#showroom" className="hover:text-red-400 transition-colors">Daytona SP3 Icona</a></li>
              <li><a href="#showroom" className="hover:text-red-400 transition-colors">812 Competizione Notte</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-white mb-4">
              Acoustic Art
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#soundstage" className="hover:text-red-400 transition-colors">Interactive Rev Cockpit</a></li>
              <li><a href="#soundstage" className="hover:text-red-400 transition-colors">F#4 Manifold Tuning</a></li>
              <li><a href="#engineering" className="hover:text-red-400 transition-colors">Inconel Equal-Length Pipes</a></li>
              <li><a href="#engineering" className="hover:text-red-400 transition-colors">9,500 RPM Valve Timing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-white mb-4">
              Atelier Services
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#craftsmanship" className="hover:text-red-400 transition-colors">Bespoke Material Studio</a></li>
              <li><a href="#craftsmanship" className="hover:text-red-400 transition-colors">Tuscan Connolly Leathers</a></li>
              <li><a href="#craftsmanship" className="hover:text-red-400 transition-colors">Bookmatched Carbon Layup</a></li>
              <li><a href="#showroom" className="hover:text-red-400 transition-colors">Maranello Factory Delivery</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-white mb-4">
              Scuderia Legacy
            </h4>
            <ul className="space-y-2.5">
              <li><span className="text-neutral-400">Via Abetone Inferiore, 4</span></li>
              <li><span className="text-neutral-400">41053 Maranello (MO), Italia</span></li>
              <li><span className="text-neutral-400">Official Heritage Since 1947</span></li>
              <li className="pt-2"><span className="text-red-500 font-mono text-[10px] tracking-widest uppercase">Certified Black Badge Division</span></li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Emissions Disclosure (Rolls-Royce Style Requirement) */}
        <div className="py-8 text-[11px] text-neutral-400 leading-relaxed font-sans border-b border-white/[0.06]">
          <p>
            <strong className="text-neutral-300">Official Fuel Consumption & Emissions Notice:</strong> Ferrari 12Cilindri Black Badge (WLTP combined): Fuel consumption: 16.0 l/100 km (17.7 mpg). Combined CO2 emissions: 368 g/km. Daytona SP3 Icona (WLTP combined): Fuel consumption: 16.2 l/100 km. Combined CO2 emissions: 368 g/km. Values are determined using the standardized WLTP measurement procedure. Actual fuel consumption and emissions may vary depending on driving style and ambient conditions.
          </p>
        </div>

        {/* Copyright & Subtext */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Ferrari S.p.A. Black Badge Bespoke Edition. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest">
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-300 cursor-pointer">Cookie Preferences</span>
            <span className="hover:text-neutral-300 cursor-pointer">Legal Dossier</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
