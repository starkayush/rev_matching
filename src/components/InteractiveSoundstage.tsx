import React, { useState, useEffect } from 'react';
import { ferrariAudio, TransmissionTelemetry } from '../audio/engineSound';
import { Radio, Sliders, Zap, ArrowUp, ArrowDown, Activity } from 'lucide-react';

export const InteractiveSoundstage: React.FC = () => {
  const [telemetry, setTelemetry] = useState<TransmissionTelemetry>({
    rpm: 850,
    gear: 0,
    speed: 0,
    isShiftCut: false,
    shiftAction: 'none',
    isRevLimiter: false,
    isPedalPressed: false,
    hasExhaustPop: false,
  });

  const [exhaustMode, setExhaustMode] = useState<'strada' | 'sport' | 'corsa' | 'infernale'>('corsa');
  const [shiftFlash, setShiftFlash] = useState<string | null>(null);

  // Subscribe to real-time high-resolution audio & transmission telemetry
  useEffect(() => {
    const unsubscribe = ferrariAudio.subscribeTelemetry((t) => {
      setTelemetry(t);
      if (t.shiftAction === 'up') {
        setShiftFlash(`F1 BANG ▴ GEAR ${t.gear}`);
      } else if (t.shiftAction === 'down') {
        setShiftFlash(`RAW POPS ▾ GEAR ${t.gear}`);
      } else if (t.shiftAction === 'tuck') {
        setShiftFlash('CLUTCH TUCK ▾ IDLE');
      }
    });

    return () => unsubscribe();
  }, []);

  // Clear shift notification after short flash
  useEffect(() => {
    if (shiftFlash) {
      const timer = setTimeout(() => setShiftFlash(null), 850);
      return () => clearTimeout(timer);
    }
  }, [shiftFlash]);

  // Pedal Interactions
  const handlePedalDown = () => {
    ferrariAudio.pressThrottle(exhaustMode);
  };

  const handlePedalUp = () => {
    ferrariAudio.releaseThrottle();
  };

  const { rpm, gear, speed, isShiftCut, isRevLimiter, isPedalPressed, hasExhaustPop } = telemetry;

  // Calculate tachometer needle angle (0 RPM = -120deg, 10000 RPM = +120deg)
  const needleAngle = -120 + (Math.min(10000, Math.max(0, rpm)) / 10000) * 240;

  // F1 Shift lights logic
  const isGreen1 = isShiftCut || rpm >= 3500;
  const isGreen2 = isShiftCut || rpm >= 5200;
  const isRed1 = isShiftCut || rpm >= 6800;
  const isRed2 = isShiftCut || rpm >= 8100;
  const isBluePeak = isShiftCut || rpm >= 8850 || isRevLimiter;

  // Sound metrics
  const estimatedDecibels = Math.round(76 + (rpm / 10000) * 48);
  const firingFrequency = Math.round((rpm / 60) * 6);
  const gForce = gear > 0 && isPedalPressed ? (Math.max(0.35, 1.45 - (gear * 0.13))).toFixed(2) : '0.00';

  return (
    <section id="soundstage" className="relative py-24 sm:py-32 bg-[#020203] text-white overflow-hidden border-t border-b border-white/[0.06]">
      {/* Dynamic Red / Cyan / Amber Ambient Glow Behind Dial */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] pointer-events-none transition-all duration-150"
        style={{
          width: `${320 + (rpm / 10000) * 420}px`,
          height: `${320 + (rpm / 10000) * 420}px`,
          backgroundColor: isShiftCut
            ? 'rgba(255, 255, 255, 0.45)'
            : hasExhaustPop
            ? 'rgba(245, 158, 11, 0.35)'
            : isBluePeak
            ? 'rgba(56, 189, 248, 0.3)'
            : `rgba(232, 0, 29, ${0.08 + (rpm / 10000) * 0.45})`
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Title & Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs font-mono tracking-[0.3em] uppercase text-red-400 mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>F1 8-Speed DCT Acoustic Chamber</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-[0.18em] uppercase text-white">
            The Symphony of <span className="font-bold text-red-500">Twelve</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm tracking-[0.2em] uppercase text-neutral-400 font-sans leading-relaxed">
            Hold the throttle pedal to rip through all 8 gears with visceral dual-clutch upshift cracks. Release to hear aggressive rev-matched downshift blips cascade back to idle.
          </p>
        </div>

        {/* F1 Steering Wheel LED Shift Lights Bar */}
        <div className={`max-w-md mx-auto mb-10 p-3 rounded-2xl bg-black/90 border transition-all duration-75 flex items-center justify-center gap-3 sm:gap-4 shadow-[0_10px_35px_rgba(0,0,0,0.8)] ${
          isShiftCut ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.7)]' : 'border-white/10'
        }`}>
          <div className={`w-4 h-4 rounded-full transition-all duration-75 ${isShiftCut ? 'bg-white shadow-[0_0_12px_#fff]' : isGreen1 ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' : 'bg-neutral-800'}`} />
          <div className={`w-4 h-4 rounded-full transition-all duration-75 ${isShiftCut ? 'bg-white shadow-[0_0_12px_#fff]' : isGreen2 ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' : 'bg-neutral-800'}`} />
          <div className={`w-4 h-4 rounded-full transition-all duration-75 ${isShiftCut ? 'bg-white shadow-[0_0_14px_#fff]' : isRed1 ? 'bg-red-500 shadow-[0_0_14px_#ef4444]' : 'bg-neutral-800'}`} />
          <div className={`w-4 h-4 rounded-full transition-all duration-75 ${isShiftCut ? 'bg-white shadow-[0_0_16px_#fff]' : isRed2 ? 'bg-red-600 shadow-[0_0_16px_#dc2626]' : 'bg-neutral-800'}`} />
          <div className={`w-5 h-5 rounded-full transition-all duration-75 ${isShiftCut ? 'bg-white shadow-[0_0_25px_#fff]' : isBluePeak ? 'bg-cyan-400 animate-ping shadow-[0_0_22px_#22d3ee]' : 'bg-neutral-800'}`} />
        </div>

        {/* Central Stage: Telemetry Controls & Cockpit Tachometer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Manettino Exhaust Mode & Real-Time Telemetry */}
          <div className="lg:col-span-4 flex flex-col gap-4 order-2 lg:order-1">
            <div className="p-6 rounded-2xl bg-neutral-950/80 border border-white/[0.08] backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 font-mono mb-4">
                <Sliders className="w-4 h-4 text-red-500" />
                <span>Manettino Acoustic Mode</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'strada', label: 'Strada', desc: 'Refined GT' },
                  { id: 'sport', label: 'Sport', desc: 'Active Valves' },
                  { id: 'corsa', label: 'Corsa', desc: 'F1 Snap Shifts' },
                  { id: 'infernale', label: 'Infernale', desc: 'Straight Pipe' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setExhaustMode(mode.id as any)}
                    className={`p-3 rounded-xl text-left border transition-all duration-200 ${
                      exhaustMode === mode.id
                        ? 'bg-red-600/20 border-red-500 text-white shadow-[0_0_15px_rgba(232,0,29,0.3)]'
                        : 'bg-black/40 border-white/[0.06] text-neutral-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-bold uppercase tracking-wider">{mode.label}</div>
                    <div className="text-[10px] text-neutral-400 tracking-tight mt-0.5">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Telemetry Card */}
            <div className="p-6 rounded-2xl bg-neutral-950/80 border border-white/[0.08] backdrop-blur-md flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">Transmission State</span>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  gear === 0 ? 'bg-neutral-800 text-neutral-300' : 'bg-red-600/30 text-red-400 border border-red-500/40'
                }`}>
                  {gear === 0 ? 'Neutral (Idle)' : `Gear ${gear} In Drive`}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">Velocity</span>
                <span className="font-display text-lg font-bold text-white tracking-wider">{speed} KM/H</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">Longitudinal Accel</span>
                <span className="font-mono text-sm font-semibold text-red-400">{gForce} G</span>
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">Exhaust Sound Wave</span>
                  <span className="font-display text-sm font-bold text-red-500">{estimatedDecibels} dB(A)</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-red-600 via-amber-400 to-cyan-400 h-full transition-all duration-75"
                    style={{ width: `${Math.min(100, (estimatedDecibels / 125) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column: The Ferrari Analog/Digital Tachometer Dial with Gear Hub */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
            
            {/* Shift Notification Banner */}
            <div className="h-7 mb-2 flex items-center justify-center">
              {shiftFlash ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase animate-bounce shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                  {shiftFlash.includes('UP') ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
                  <span>{shiftFlash}</span>
                </div>
              ) : speed >= 450 ? (
                <div className="px-3 py-1 rounded-full bg-red-600/30 border border-red-500 text-red-400 text-xs font-mono font-bold tracking-widest uppercase animate-pulse shadow-[0_0_15px_rgba(232,0,29,0.5)]">
                  TERMINAL VELOCITY &bull; 454 KM/H
                </div>
              ) : isRevLimiter ? (
                <div className="px-3 py-1 rounded-full bg-red-600/30 border border-red-500 text-red-400 text-xs font-mono font-bold tracking-widest uppercase animate-pulse">
                  REV LIMITER (9,300 RPM)
                </div>
              ) : (
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">
                  Dual-Clutch Telemetry Active
                </span>
              )}
            </div>

            <div className={`relative w-68 h-68 sm:w-80 sm:h-80 rounded-full flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950 border-[6px] transition-all duration-100 shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_0_30px_rgba(0,0,0,0.9)] ${
              isShiftCut 
                ? 'border-cyan-300 shadow-[0_0_50px_rgba(34,211,238,0.9)] scale-[1.02]' 
                : hasExhaustPop
                ? 'border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.85)] scale-[1.01]'
                : 'border-neutral-800'
            }`}>
              
              {/* Tachometer Markings Ring */}
              <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none" viewBox="0 0 200 200">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                  const angle = -120 + (num / 10) * 240;
                  const rad = (angle - 90) * (Math.PI / 180);
                  const x = 100 + 72 * Math.cos(rad);
                  const y = 100 + 72 * Math.sin(rad);
                  const isRedline = num >= 8;

                  return (
                    <text
                      key={num}
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      fill={isRedline ? '#ef4444' : '#d4d4d8'}
                      fontSize="10"
                      fontFamily="Syncopate, sans-serif"
                      fontWeight="bold"
                    >
                      {num}
                    </text>
                  );
                })}

                {/* Redline Arc */}
                <path
                  d="M 160 55 A 80 80 0 0 1 175 125"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3.5"
                  strokeDasharray="2 4"
                />
              </svg>

              {/* The Rotating Needle */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-75 ease-out"
                style={{ transform: `rotate(${needleAngle}deg)` }}
              >
                <div className={`w-1.5 h-32 rounded-full -translate-y-16 transition-colors duration-75 ${
                  isShiftCut 
                    ? 'bg-cyan-300 shadow-[0_0_20px_#22d3ee]' 
                    : 'bg-gradient-to-t from-red-600 via-red-500 to-white shadow-[0_0_12px_rgba(255,40,0,0.9)]'
                }`} />
              </div>

              {/* Center F1 Hub: Large Gear Display & Digital Speedometer */}
              <div className="relative z-10 w-32 h-32 rounded-full bg-neutral-950 border-2 border-neutral-700 flex flex-col items-center justify-center shadow-inner">
                
                {/* Large Gear Indicator */}
                <div className="flex items-center justify-center">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mr-1">GEAR</span>
                  <span className={`font-display text-4xl font-black transition-all duration-100 ${
                    gear === 0 
                      ? 'text-emerald-400' 
                      : isShiftCut 
                      ? 'text-white scale-125 drop-shadow-[0_0_15px_#22d3ee]' 
                      : 'text-red-500 drop-shadow-[0_0_10px_rgba(232,0,29,0.7)]'
                  }`}>
                    {gear === 0 ? 'N' : gear}
                  </span>
                </div>

                {/* Live RPM Digital readout */}
                <div className="font-display text-sm font-bold text-white tracking-wider mt-0.5">
                  {rpm.toLocaleString()} <span className="text-[9px] text-neutral-400 font-mono">RPM</span>
                </div>

                {/* Live Speed digital readout */}
                <div className="text-[11px] font-mono text-neutral-300 font-semibold tracking-wider">
                  {speed} <span className="text-[8px] text-red-500 font-mono">KM/H</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Physical Machined Aluminum Throttle Pedal */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center order-3">
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono mb-3">
                Machined Throttle Pedal
              </span>

              {/* Billet Aluminum Pedal Button */}
              <button
                onMouseDown={handlePedalDown}
                onMouseUp={handlePedalUp}
                onMouseLeave={handlePedalUp}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handlePedalDown();
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handlePedalUp();
                }}
                className={`relative w-24 h-48 sm:w-28 sm:h-52 rounded-2xl p-2 transition-all duration-150 cursor-pointer select-none focus:outline-none ${
                  isPedalPressed 
                    ? 'scale-95 shadow-[0_0_45px_rgba(232,0,29,0.8)] border-red-500 translate-y-2' 
                    : 'hover:scale-102 border-neutral-700 shadow-[0_15px_35px_rgba(0,0,0,0.9)]'
                } border-2 bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900`}
                style={{
                  boxShadow: isPedalPressed
                    ? 'inset 0 4px 12px rgba(0,0,0,0.9), 0 0 35px rgba(232,0,29,0.7)'
                    : 'inset 0 1px 2px rgba(255,255,255,0.3), 0 15px 30px rgba(0,0,0,0.9)'
                }}
              >
                {/* Rubber Grip Inserts on Pedal */}
                <div className="w-full h-full rounded-xl flex flex-col justify-around py-3 items-center bg-gradient-to-b from-neutral-800 to-neutral-950 border border-neutral-600/40">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="w-4/5 h-2 rounded-full bg-black border-t border-neutral-700 shadow-inner" />
                  ))}
                  <div className={`mt-1 text-[9px] font-mono tracking-widest uppercase transition-colors ${
                    isPedalPressed ? 'text-red-400 font-bold' : 'text-neutral-400'
                  }`}>
                    {isPedalPressed ? 'HOLDING FULL GAS' : 'PRESS & HOLD'}
                  </div>
                </div>
              </button>

              <div className="mt-4 text-center max-w-[200px]">
                <p className="text-[11px] font-mono tracking-wider text-neutral-300 font-semibold uppercase">
                  {isPedalPressed ? 'Accelerating & Shifting...' : 'Hold Pedal to Shift Up'}
                </p>
                <p className="text-[10px] font-sans tracking-wide text-neutral-500 mt-0.5">
                  Release anytime to hear rev-matched downshifts step-by-step
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
