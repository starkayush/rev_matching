import React from 'react';

interface EngineLogoProps {
  className?: string;
  size?: number;
  variant?: 'chrome' | 'red' | 'white' | 'mono';
}

export const EngineLogo: React.FC<EngineLogoProps> = ({
  className = '',
  size = 64,
  variant = 'chrome',
}) => {
  const id = `el-${Math.random().toString(36).slice(2, 7)}`;

  const gradients = {
    chrome: {
      main: ['#ffffff', '#c8cdd4', '#8c9099', '#d8dde4', '#a0a5ac'],
      accent: ['#ff2800', '#c10015'],
      dark: '#0a0a0c',
    },
    red: {
      main: ['#ff4020', '#cc1500', '#8b0010', '#dd2010', '#aa0d08'],
      accent: ['#ffffff', '#cccccc'],
      dark: '#0a0a0c',
    },
    white: {
      main: ['#ffffff', '#eeeeee', '#cccccc', '#ffffff', '#dddddd'],
      accent: ['#ff2800', '#c10015'],
      dark: '#000000',
    },
    mono: {
      main: ['#ffffff', '#bbbbbb', '#888888', '#cccccc', '#999999'],
      accent: ['#ffffff', '#cccccc'],
      dark: '#000000',
    },
  };

  const g = gradients[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ferrari V12 Engine Logo"
    >
      <defs>
        {/* Chrome gradient — top to bottom */}
        <linearGradient id={`${id}-chrome`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor={g.main[0]} />
          <stop offset="30%"  stopColor={g.main[1]} />
          <stop offset="55%"  stopColor={g.main[2]} />
          <stop offset="80%"  stopColor={g.main[3]} />
          <stop offset="100%" stopColor={g.main[4]} />
        </linearGradient>

        {/* Specular sheen — left to right */}
        <linearGradient id={`${id}-sheen`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={g.main[2]} stopOpacity="0.5" />
          <stop offset="40%"  stopColor={g.main[0]} stopOpacity="1"   />
          <stop offset="60%"  stopColor={g.main[0]} stopOpacity="1"   />
          <stop offset="100%" stopColor={g.main[2]} stopOpacity="0.5" />
        </linearGradient>

        {/* Red accent gradient */}
        <linearGradient id={`${id}-red`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor={g.accent[0]} />
          <stop offset="100%" stopColor={g.accent[1]} />
        </linearGradient>

        {/* Gear gradient */}
        <radialGradient id={`${id}-gear`} cx="50%" cy="35%" r="65%">
          <stop offset="0%"   stopColor={g.main[0]} />
          <stop offset="50%"  stopColor={g.main[1]} />
          <stop offset="100%" stopColor={g.main[2]} />
        </radialGradient>

        {/* Drop shadow */}
        <filter id={`${id}-shadow`} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.85"/>
        </filter>

        {/* Inner glow for gear */}
        <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── BOTTOM ENGINE BLOCK ───────────────────────────────── */}
      {/* Main crankcase block */}
      <rect
        x="52" y="118" width="96" height="52" rx="5"
        fill={`url(#${id}-chrome)`}
        filter={`url(#${id}-shadow)`}
      />
      {/* Crankcase bolt holes — four corners */}
      {[[60,124],[132,124],[60,162],[132,162]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="4.5" fill={g.dark} stroke={g.main[1]} strokeWidth="1.2"/>
      ))}
      {/* Central bore (sump/main bearing cap face) */}
      <circle cx="100" cy="143" r="20" fill={g.dark} stroke={`url(#${id}-chrome)`} strokeWidth="3"/>
      <circle cx="100" cy="143" r="13" fill={g.dark} stroke={g.main[2]} strokeWidth="1.2"/>
      <circle cx="100" cy="143" r="6"  fill={`url(#${id}-chrome)`} />
      {/* Cooling fin ridges on sides of block */}
      {[0,1,2,3].map(i => (
        <React.Fragment key={i}>
          <rect x="40" y={124 + i*10} width="11" height="5" rx="2" fill={`url(#${id}-chrome)`}/>
          <rect x="149" y={124 + i*10} width="11" height="5" rx="2" fill={`url(#${id}-chrome)`}/>
        </React.Fragment>
      ))}
      {/* Block top mating surface highlight */}
      <rect x="52" y="116" width="96" height="5" rx="2" fill={`url(#${id}-sheen)`}/>

      {/* ── LEFT CYLINDER BANK ───────────────────────────────── */}
      {/* Bank angled at ~32° leftward (Ferrari 65° V) */}
      <g transform="rotate(-32, 100, 118)" filter={`url(#${id}-shadow)`}>
        {/* Cylinder barrel stack */}
        <rect x="62" y="48" width="36" height="72" rx="5" fill={`url(#${id}-chrome)`}/>
        {/* Fin ribs on cylinder */}
        {[0,1,2,3,4].map(i => (
          <rect key={i} x="60" y={52 + i*13} width="40" height="4" rx="1.5"
            fill={`url(#${id}-sheen)`} opacity="0.7"/>
        ))}
        {/* Piston crown protruding from top */}
        <rect x="65" y="40" width="30" height="14" rx="4" fill={`url(#${id}-chrome)`}/>
        {/* Piston ring grooves */}
        <rect x="65" y="44" width="30" height="2.5" rx="1" fill={g.main[2]} opacity="0.9"/>
        <rect x="65" y="49" width="30" height="2.5" rx="1" fill={g.main[2]} opacity="0.9"/>
        {/* Wrist pin boss */}
        <circle cx="80" cy="56" r="4.5" fill={g.dark} stroke={g.main[1]} strokeWidth="1.5"/>
      </g>

      {/* ── RIGHT CYLINDER BANK ──────────────────────────────── */}
      <g transform="rotate(32, 100, 118)" filter={`url(#${id}-shadow)`}>
        <rect x="102" y="48" width="36" height="72" rx="5" fill={`url(#${id}-chrome)`}/>
        {[0,1,2,3,4].map(i => (
          <rect key={i} x="100" y={52 + i*13} width="40" height="4" rx="1.5"
            fill={`url(#${id}-sheen)`} opacity="0.7"/>
        ))}
        <rect x="105" y="40" width="30" height="14" rx="4" fill={`url(#${id}-chrome)`}/>
        <rect x="105" y="44" width="30" height="2.5" rx="1" fill={g.main[2]} opacity="0.9"/>
        <rect x="105" y="49" width="30" height="2.5" rx="1" fill={g.main[2]} opacity="0.9"/>
        <circle cx="120" cy="56" r="4.5" fill={g.dark} stroke={g.main[1]} strokeWidth="1.5"/>
      </g>

      {/* ── CENTRAL TIMING GEAR ──────────────────────────────── */}
      {/* Outer ring */}
      <circle cx="100" cy="90" r="30" fill={`url(#${id}-gear)`} filter={`url(#${id}-shadow)`}/>
      {/* Gear teeth — 14 teeth */}
      {Array.from({length: 14}).map((_, i) => {
        const angle = (i / 14) * 2 * Math.PI - Math.PI / 2;
        const tx = 100 + 29 * Math.cos(angle);
        const ty = 90 + 29 * Math.sin(angle);
        return (
          <rect
            key={i}
            x={tx - 4} y={ty - 4}
            width="8" height="8" rx="1.5"
            fill={`url(#${id}-chrome)`}
            transform={`rotate(${(i / 14) * 360}, ${tx}, ${ty})`}
          />
        );
      })}
      {/* Inner ring */}
      <circle cx="100" cy="90" r="21" fill={g.dark} stroke={`url(#${id}-chrome)`} strokeWidth="2.5"/>
      {/* Spoke detail — 4 spokes */}
      {[0,1,2,3].map(i => {
        const a = (i / 4) * Math.PI;
        return (
          <line key={i}
            x1={100 + 7 * Math.cos(a)} y1={90 + 7 * Math.sin(a)}
            x2={100 + 19 * Math.cos(a)} y2={90 + 19 * Math.sin(a)}
            stroke={`url(#${id}-chrome)`} strokeWidth="3.5" strokeLinecap="round"
          />
        );
      })}
      {/* Centre hub */}
      <circle cx="100" cy="90" r="8"  fill={`url(#${id}-gear)`}/>
      <circle cx="100" cy="90" r="4"  fill={g.dark}/>
      <circle cx="100" cy="90" r="2"  fill={`url(#${id}-chrome)`}/>

      {/* ── VELOCITY INTAKE STACKS (between banks) ───────────── */}
      {/* Three chrome trumpet stacks peaking above the V */}
      {[-14, 0, 14].map((xOff, i) => (
        <g key={i}>
          {/* Stack tube */}
          <rect x={95 + xOff} y="58" width="10" height="28" rx="3"
            fill={`url(#${id}-chrome)`} opacity={i === 1 ? 1 : 0.85}/>
          {/* Bellmouth lip */}
          <ellipse cx={100 + xOff} cy="58" rx="8" ry="4"
            fill={`url(#${id}-sheen)`} opacity="0.95"/>
          {/* Inner bore */}
          <ellipse cx={100 + xOff} cy="58" rx="4" ry="2.2" fill={g.dark}/>
        </g>
      ))}

      {/* ── SIDE CHEVRON WING ACCENTS ────────────────────────── */}
      {/* Three layered chevron stripes — left */}
      {[0,1,2].map(i => (
        <polyline key={i}
          points={`${28 - i*5},${150 - i*8} ${44 - i*5},${128 - i*8} ${52},${118}`}
          fill="none"
          stroke={i === 0 ? `url(#${id}-red)` : `url(#${id}-chrome)`}
          strokeWidth={i === 0 ? 4 : 3}
          strokeLinecap="round" strokeLinejoin="round"
          opacity={1 - i * 0.22}
        />
      ))}
      {/* Three layered chevron stripes — right */}
      {[0,1,2].map(i => (
        <polyline key={i}
          points={`${172 + i*5},${150 - i*8} ${156 + i*5},${128 - i*8} ${148},${118}`}
          fill="none"
          stroke={i === 0 ? `url(#${id}-red)` : `url(#${id}-chrome)`}
          strokeWidth={i === 0 ? 4 : 3}
          strokeLinecap="round" strokeLinejoin="round"
          opacity={1 - i * 0.22}
        />
      ))}

      {/* ── BOTTOM ACCENT BAR (Rosso Corsa stripe) ───────────── */}
      <rect x="62" y="171" width="76" height="4" rx="2" fill={`url(#${id}-red)`}/>
    </svg>
  );
};
