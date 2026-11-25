import React, { useState } from 'react';
import { Eye, Shield, Sparkles, Feather } from 'lucide-react';

interface CraftItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

const CRAFT_ITEMS: CraftItem[] = [
  {
    id: 'carbon-weave',
    title: 'Exposed Bookmatched Carbon',
    category: 'Aeronautical Composites',
    description: 'Each carbon fibre panel is laid entirely by hand in Maranello autoclaves. The weave patterns align symmetrically along the central chassis spine with 0.1 mm precision, finished with a satin anti-reflective shadow coat.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'dark-cavallino',
    title: 'Liquid Dark Chrome Cavallino',
    category: 'Precious Metallurgy',
    description: 'The iconic rearing stallion emblem is cast from solid bronze, hand-polished to a mirror finish, then submerged in a vacuum-sputtered black chrome bath that captures the deepest shadows.',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'leather-stitch',
    title: 'Rosso Corsa Saddle Stitching',
    category: 'Bespoke Atelier Leatherwork',
    description: 'Full-grain semi-aniline Italian hides sourced from Tuscan tanneries, finished in pitch obsidian and tailored by master artisans with contrast Rosso Corsa heavy gauge thread.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'titanium-exhaust',
    title: 'Laser Sintered Titanium Exhaust',
    category: 'Additive Manufacturing',
    description: 'Constructed using laser powder bed fusion (LPBF), the dual exhaust tips feature internal acoustic vortex channels that feather out engine roar while resisting temperatures exceeding 850°C.',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80'
  }
];

export const CraftsmanshipDetails: React.FC = () => {
  const [selectedCraft, setSelectedCraft] = useState<number>(0);

  return (
    <section id="craftsmanship" className="py-24 sm:py-32 bg-[#020204] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.35em] uppercase text-red-500 mb-2">
              <Feather className="w-3.5 h-3.5" />
              <span>Tactile Atelier</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-[0.16em] uppercase text-white">
              Craftsmanship of <span className="font-semibold text-neutral-300">The Shadows</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm tracking-[0.2em] uppercase text-neutral-400 max-w-md font-sans">
            Every millimeter touched by Italian artisans who treat high-tensile carbon and Connolly hides like haute couture.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CRAFT_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedCraft(index)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-500 bg-neutral-950 flex flex-col justify-end ${
                selectedCraft === index
                  ? 'border-red-500 shadow-[0_10px_35px_rgba(232,0,29,0.3)] ring-1 ring-red-500/50'
                  : 'border-white/[0.08] hover:border-white/30'
              }`}
            >
              <div className="aspect-[4/5] w-full overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.2] transition-transform duration-700 group-hover:scale-110 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Overlay Content */}
              <div className="p-6 relative z-10 -mt-20">
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-red-500">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-normal tracking-wide text-white mt-1 group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 font-sans line-clamp-3 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
