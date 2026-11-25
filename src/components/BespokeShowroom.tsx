import React, { useState } from 'react';
import { ChevronRight, ArrowRight, Check, Disc, Wind, Flame, Eye } from 'lucide-react';

interface CarModel {
  id: string;
  name: string;
  tagline: string;
  engine: string;
  power: string;
  torque: string;
  acceleration: string;
  topSpeed: string;
  description: string;
  image: string;
  finishes: { name: string; hex: string; class: string }[];
  highlights: string[];
}

const CARS: CarModel[] = [
  {
    id: '12cilindri',
    name: '12Cilindri Black Badge',
    tagline: 'The Purity of Twelve Cylinders in Shadows',
    engine: '6.5L Naturally Aspirated 65° V12',
    power: '830 CV @ 9,250 RPM',
    torque: '678 Nm @ 7,250 RPM',
    acceleration: '2.9 s (0-100 km/h)',
    topSpeed: '> 340 km/h',
    description: 'Inspired by the grand tourers of the 1950s and 60s, reincarnated in stark obsidian carbon. Twin active aerodynamic flaps integrated into the rear delta wing optimize downforce with surgical precision.',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1600&q=85',
    finishes: [
      { name: 'Nero Puro', hex: '#0a0a0c', class: 'bg-[#0a0a0c]' },
      { name: 'Rosso Corsa Scuro', hex: '#8a0010', class: 'bg-[#8a0010]' },
      { name: 'Carbonio Forgiato', hex: '#1c1d22', class: 'bg-[#1c1d22]' },
      { name: 'Titanio Satinato', hex: '#58595e', class: 'bg-[#58595e]' }
    ],
    highlights: ['Active Rear Aero Delta Flaps', 'Titanium Con-Rods', 'Independent 4-Wheel Steering', '8-Speed Dual-Clutch DCT']
  },
  {
    id: 'daytona-sp3',
    name: 'Daytona SP3 Nero Carbonio',
    tagline: 'The Icona Legend Clothed in Raw Weave',
    engine: '6.5L Mid-Rear Naturally Aspirated V12',
    power: '840 CV @ 9,250 RPM',
    torque: '697 Nm @ 7,250 RPM',
    acceleration: '2.85 s (0-100 km/h)',
    topSpeed: '> 340 km/h',
    description: 'A tribute to the immortal 1-2-3 finish at the 1967 24 Hours of Daytona. Targa architecture sculpted entirely from aeronautical T800 carbon fibre with dramatic horizontal blade rear strakes.',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=85',
    finishes: [
      { name: 'Carbonio Forgiato', hex: '#151619', class: 'bg-[#151619]' },
      { name: 'Nero Stellato', hex: '#050608', class: 'bg-[#050608]' },
      { name: 'Rosso Magma', hex: '#99000a', class: 'bg-[#99000a]' }
    ],
    highlights: ['Structural Carbon Monocoque', 'Butterfly Doors', 'Horizontal Blade Strakes', 'F1-Derived Chimneys']
  },
  {
    id: '812-competizione',
    name: '812 Competizione Notte',
    tagline: 'Extreme Front-Engine Track Weapon',
    engine: '6.5L Front-Mid 65° V12',
    power: '830 CV @ 9,500 RPM',
    torque: '692 Nm @ 7,000 RPM',
    acceleration: '2.85 s (0-100 km/h)',
    topSpeed: '340 km/h',
    description: 'Engineered without compromise: full carbon rear screen with integrated vortex generator blades replaces the rear glass, generating unprecedented vortex-induced downforce.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85',
    finishes: [
      { name: 'Nero Opaco', hex: '#121214', class: 'bg-[#121214]' },
      { name: 'Rosso Fuoco Scuro', hex: '#7b000f', class: 'bg-[#7b000f]' },
      { name: 'Grigio Silverstone', hex: '#3e3f44', class: 'bg-[#3e3f44]' }
    ],
    highlights: ['Vortex Generator Rear Screen', '9,500 RPM Diamond-Like Carbon DLC Valvetrain', 'Titanium Intake Manifolds', 'Single-Piece Carbon Wheels']
  },
  {
    id: 'purosangue',
    name: 'Purosangue Black Badge',
    tagline: 'Subversive Four-Door Atmospheric Dominance',
    engine: '6.5L Naturally Aspirated Front-Mid V12',
    power: '725 CV @ 7,750 RPM',
    torque: '716 Nm @ 6,250 RPM',
    acceleration: '3.3 s (0-100 km/h)',
    topSpeed: '310 km/h',
    description: 'A revolutionary four-door, four-seater Gran Turismo infused with pure Ferrari sports car DNA. Welcome doors that open like a jewel box to reveal a handcrafted sanctuary.',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
    finishes: [
      { name: 'Nero Purosangue', hex: '#090a0d', class: 'bg-[#090a0d]' },
      { name: 'Rosso Portofino Dark', hex: '#63000b', class: 'bg-[#63000b]' },
      { name: 'Verde Scuro Stealth', hex: '#112216', class: 'bg-[#112216]' }
    ],
    highlights: ['Ferrari Active 48V Multimatic Suspension', 'Welcome Doors (Rear-Hinged)', 'Independent 4-Wheel Drive', 'Equal 49:51 Weight Distribution']
  }
];

interface BespokeShowroomProps {
  onOpenConfigurator: (carName?: string) => void;
}

export const BespokeShowroom: React.FC<BespokeShowroomProps> = ({ onOpenConfigurator }) => {
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'aero' | 'craftsmanship'>('specs');

  const currentCar = CARS[selectedCarIndex];
  const currentFinish = currentCar.finishes[selectedFinishIndex] || currentCar.finishes[0];

  const handleCarSelect = (index: number) => {
    setSelectedCarIndex(index);
    setSelectedFinishIndex(0);
  };

  return (
    <section id="showroom" className="relative min-h-screen py-24 sm:py-32 bg-[#050507] text-white overflow-hidden">
      {/* Rolls-Royce Black Badge Style Atmospheric Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-neutral-900/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-red-500 font-mono mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>Bespoke Black Badge Showroom</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-[0.15em] uppercase text-white">
              The Dark Horse <span className="font-semibold text-neutral-400">Stable</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm tracking-[0.2em] uppercase text-neutral-400 max-w-md font-sans">
            Every contour submerged in stealth shadow; every pulse driven by the immortal Ferrari V12.
          </p>
        </div>

        {/* Model Selector Tabs */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-4 scrollbar-none mb-10">
          {CARS.map((car, idx) => (
            <button
              key={car.id}
              onClick={() => handleCarSelect(idx)}
              className={`px-5 py-3 rounded-full text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 font-sans ${
                selectedCarIndex === idx
                  ? 'bg-red-600 text-white font-semibold shadow-[0_0_20px_rgba(232,0,29,0.5)] border border-red-500'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-white/[0.06] hover:border-white/20'
              }`}
            >
              {car.name}
            </button>
          ))}
        </div>

        {/* Hero Showcase Display Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/60 rounded-3xl p-6 sm:p-10 border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          
          {/* Left Column: Visual Staging & Dynamic Finish Switcher */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden group border border-white/[0.08] shadow-2xl bg-neutral-950">
              <img
                src={currentCar.image}
                alt={currentCar.name}
                className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.15] transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Dynamic finish color tint overlay */}
              <div 
                className="absolute inset-0 mix-blend-multiply opacity-25 transition-colors duration-700 pointer-events-none"
                style={{ backgroundColor: currentFinish.hex }}
              />

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

              {/* Floating Finish Badge */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs">
                <span className="w-3 h-3 rounded-full border border-white/40 shadow-sm" style={{ backgroundColor: currentFinish.hex }} />
                <span className="font-mono text-[11px] tracking-wider uppercase text-neutral-300">
                  {currentFinish.name}
                </span>
              </div>
            </div>

            {/* Bespoke Finish Palette Selector */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-950/80 border border-white/[0.05]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400">
                <Disc className="w-4 h-4 text-red-500" />
                <span>Bespoke Exterior Finish:</span>
              </div>
              <div className="flex items-center gap-3">
                {currentCar.finishes.map((finish, fIdx) => (
                  <button
                    key={finish.name}
                    onClick={() => setSelectedFinishIndex(fIdx)}
                    title={finish.name}
                    className={`relative w-8 h-8 rounded-full transition-all duration-300 border flex items-center justify-center ${
                      selectedFinishIndex === fIdx
                        ? 'border-red-500 scale-110 shadow-[0_0_12px_rgba(232,0,29,0.8)]'
                        : 'border-white/20 hover:border-white/50'
                    }`}
                    style={{ backgroundColor: finish.hex }}
                  >
                    {selectedFinishIndex === fIdx && (
                      <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Model Dossier & Telemetry */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-red-500">
                Bespoke Atelier Dossier
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-normal tracking-[0.12em] uppercase text-white mt-1">
                {currentCar.name}
              </h3>
              <p className="text-xs sm:text-sm font-sans tracking-[0.15em] text-neutral-400 uppercase mt-2 italic">
                "{currentCar.tagline}"
              </p>
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed tracking-wide mt-4">
                {currentCar.description}
              </p>
            </div>

            {/* Metric Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/[0.06]">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono">Engine Output</span>
                <p className="font-display text-lg font-bold text-white tracking-wider mt-0.5">{currentCar.power}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/[0.06]">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono">Acceleration</span>
                <p className="font-display text-lg font-bold text-white tracking-wider mt-0.5">{currentCar.acceleration}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/[0.06]">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono">Peak Torque</span>
                <p className="font-display text-lg font-bold text-white tracking-wider mt-0.5">{currentCar.torque}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/[0.06]">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono">Top Velocity</span>
                <p className="font-display text-lg font-bold text-white tracking-wider mt-0.5">{currentCar.topSpeed}</p>
              </div>
            </div>

            {/* Technical Highlights Tags */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
                Key Black Badge Innovations
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentCar.highlights.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] text-neutral-300 tracking-wide"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Commission Button */}
            <div className="pt-2">
              <button
                onClick={() => onOpenConfigurator(currentCar.name)}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-sans text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(232,0,29,0.4)] hover:shadow-[0_0_35px_rgba(232,0,29,0.7)]"
              >
                <span>Commission This Chassis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
