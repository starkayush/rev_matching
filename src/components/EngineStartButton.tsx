import React, { useState } from 'react';

interface EngineStartButtonProps {
  onStart: () => void;
  isStarting?: boolean;
}

export const EngineStartButton: React.FC<EngineStartButtonProps> = ({ onStart, isStarting = false }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (isStarting) return;
    setIsPressed(true);
    onStart();
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none group">
      {/* Outer Breathing Radial Glow */}
      <div 
        className={`absolute -inset-6 rounded-full transition-all duration-700 pointer-events-none ${
          isStarting 
            ? 'bg-red-600/70 blur-3xl scale-150 animate-pulse' 
            : 'bg-red-600/25 blur-2xl group-hover:bg-red-500/40 group-hover:blur-3xl animate-glow-breathe'
        }`}
      />

      {/* Button Housing Ring (Machined Matte Dark Titanium / Knurled Rim) */}
      <button
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        disabled={isStarting}
        aria-label="Engine Push Start"
        className={`relative z-20 w-28 h-28 sm:w-32 sm:h-32 rounded-full p-2.5 transition-transform duration-200 focus:outline-none cursor-pointer ${
          isPressed || isStarting ? 'scale-95' : 'hover:scale-105 active:scale-95'
        }`}
        style={{
          background: 'linear-gradient(135deg, #3a3b40 0%, #15161a 50%, #24252a 100%)',
          boxShadow: isStarting
            ? '0 0 50px rgba(232,0,29,0.9), inset 0 2px 4px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.9)'
            : '0 12px 35px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.25), 0 0 20px rgba(232,0,29,0.25)',
        }}
      >
        {/* Micro-knurled bezel accent ring */}
        <div 
          className="w-full h-full rounded-full p-1.5 flex items-center justify-center transition-all duration-500"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, #202024 0deg, #38393e 60deg, #18191c 120deg, #38393e 180deg, #1d1e22 240deg, #38393e 300deg, #202024 360deg)',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8)'
          }}
        >
          {/* Inner Red Core (Rosso Corsa Anodized Metal) */}
          <div 
            className={`w-full h-full rounded-full flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 border ${
              isStarting
                ? 'bg-gradient-to-b from-red-500 via-red-600 to-red-800 border-red-300 shadow-[inset_0_0_20px_rgba(255,255,255,0.6)]'
                : 'bg-gradient-to-b from-[#b50014] via-[#85000e] to-[#480006] border-red-500/50 group-hover:border-red-400 group-hover:from-[#c80017] group-hover:via-[#9b0011]'
            }`}
          >
            {/* Top Gloss Reflection */}
            <div className="absolute top-0 left-1/4 right-1/4 h-1/3 bg-gradient-to-b from-white/35 to-transparent rounded-full pointer-events-none blur-[1px]" />

            {/* Glowing Engine Push Start Label */}
            <div className="relative z-10 flex flex-col items-center justify-center tracking-[0.2em] font-sans text-center">
              <span className="text-[9px] sm:text-[10px] font-bold text-white/80 uppercase tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                Engine
              </span>
              <span className={`text-[13px] sm:text-[15px] font-black uppercase my-0.5 tracking-[0.25em] transition-colors duration-300 ${
                isStarting ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,1)]' : 'text-neutral-100 group-hover:text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]'
              }`}>
                Start
              </span>
              <span className="text-[8px] sm:text-[9px] font-semibold text-white/60 uppercase tracking-widest">
                Stop
              </span>
            </div>

            {/* Ambient status LED indicator */}
            <div className={`mt-1 w-2.5 h-1 rounded-full transition-all duration-500 ${
              isStarting ? 'bg-white shadow-[0_0_8px_#ffffff]' : 'bg-red-400/80 shadow-[0_0_6px_rgba(255,0,0,0.8)]'
            }`} />
          </div>
        </div>
      </button>

      {/* Subtitle / Interaction Prompt */}
      <div className="mt-6 flex items-center space-x-2 text-xs tracking-[0.3em] uppercase text-neutral-400 font-sans transition-all duration-500 group-hover:text-red-400">
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping inline-block" />
        <span className="text-[11px] font-medium tracking-[0.35em] text-neutral-400 group-hover:text-neutral-200">
          Push to Awaken V12
        </span>
      </div>
    </div>
  );
};
