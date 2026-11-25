import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ferrariAudio } from '../audio/engineSound';
import { Sparkles, Maximize2, RotateCcw, Volume2, Flame } from 'lucide-react';

interface Engine3DProps {
  isRevealed: boolean;
}

export const Engine3D: React.FC<Engine3DProps> = ({ isRevealed }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePreset, setActivePreset] = useState<'overview' | 'heads' | 'intake' | 'exhaust'>('overview');
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isRevving, setIsRevving] = useState<boolean>(false);
  const [rpmDisplay, setRpmDisplay] = useState<number>(850);

  // References for Three.js animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const engineGroupRef = useRef<THREE.Group | null>(null);
  const leftBankGroupRef = useRef<THREE.Group | null>(null);
  const rightBankGroupRef = useRef<THREE.Group | null>(null);
  const intakeGroupRef = useRef<THREE.Group | null>(null);
  const pulleysRef = useRef<THREE.Mesh[]>([]);
  const flameParticlesRef = useRef<THREE.Points | null>(null);
  const targetCameraPos = useRef(new THREE.Vector3(0, 2.5, 6.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0.003 });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- 1. Scene Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x050505, 0.07);

    // --- 2. Camera ---
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 6.2);
    cameraRef.current = camera;

    // --- 3. Renderer with High Performance & Antialiasing ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // --- 4. Studio Lighting Rig (Rolls-Royce Black Badge Style High-Contrast) ---
    const ambientLight = new THREE.AmbientLight(0x15161c, 1.8);
    scene.add(ambientLight);

    // Key Spotlight on Rosso Corsa Cam Covers
    const keySpot = new THREE.SpotLight(0xffffff, 18);
    keySpot.position.set(4, 7, 5);
    keySpot.angle = Math.PI / 4.5;
    keySpot.penumbra = 0.8;
    keySpot.castShadow = true;
    scene.add(keySpot);

    // Dramatic Crimson Rim Light from below
    const redRimLight = new THREE.DirectionalLight(0xe8001d, 5.0);
    redRimLight.position.set(-4, -1, -3);
    scene.add(redRimLight);

    // Metallic Specular Cool White Rim Light
    const topLight = new THREE.DirectionalLight(0xe0e8ff, 6.5);
    topLight.position.set(0, 6, -2);
    scene.add(topLight);

    // Internal combustion glowing core light
    const coreGlow = new THREE.PointLight(0xff2200, 3.5, 6);
    coreGlow.position.set(0, 0.3, 0);
    scene.add(coreGlow);

    // --- 5. Build Procedural Ferrari 65° V12 Engine Model ---
    const engineMasterGroup = new THREE.Group();
    engineGroupRef.current = engineMasterGroup;
    scene.add(engineMasterGroup);

    // Common Materials
    const rossoCorsaMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd40000,
      roughness: 0.28,
      metalness: 0.15,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      reflectivity: 0.8,
    });

    const brushedChromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.94,
      roughness: 0.12,
    });

    const darkAlloyMaterial = new THREE.MeshStandardMaterial({
      color: 0x18191c,
      metalness: 0.85,
      roughness: 0.45,
    });

    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1012,
      roughness: 0.35,
      metalness: 0.6,
    });

    const bronzeExhaustMaterial = new THREE.MeshStandardMaterial({
      color: 0x9c6d3d,
      metalness: 0.9,
      roughness: 0.35,
    });

    // --- Central Crankcase Block ---
    const crankcaseGeo = new THREE.BoxGeometry(1.6, 1.2, 3.8);
    const crankcase = new THREE.Mesh(crankcaseGeo, darkAlloyMaterial);
    crankcase.position.set(0, -0.6, 0);
    crankcase.castShadow = true;
    crankcase.receiveShadow = true;
    engineMasterGroup.add(crankcase);

    // Sump Pan
    const sumpGeo = new THREE.CylinderGeometry(0.7, 0.6, 3.6, 16);
    sumpGeo.rotateX(Math.PI / 2);
    const sump = new THREE.Mesh(sumpGeo, darkAlloyMaterial);
    sump.position.set(0, -1.2, 0);
    engineMasterGroup.add(sump);

    // --- Ferrari 65-Degree Cylinder Banks ---
    const bankAngle = (65 / 2) * (Math.PI / 180); // 32.5 degrees

    // LEFT BANK GROUP
    const leftBankGroup = new THREE.Group();
    leftBankGroupRef.current = leftBankGroup;
    leftBankGroup.position.set(-0.65, 0.25, 0);
    leftBankGroup.rotation.z = bankAngle;
    engineMasterGroup.add(leftBankGroup);

    // Left Cam Cover (Rosso Corsa)
    const camCoverGeo = new THREE.BoxGeometry(0.75, 0.45, 3.7);
    const leftCamCover = new THREE.Mesh(camCoverGeo, rossoCorsaMaterial);
    leftCamCover.position.set(0, 0.5, 0);
    leftCamCover.castShadow = true;
    leftBankGroup.add(leftCamCover);

    // Ferrari Badge Stripe on Left Cover
    const leftBadge = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.05, 2.8),
      brushedChromeMaterial
    );
    leftBadge.position.set(0, 0.74, 0);
    leftBankGroup.add(leftBadge);

    // RIGHT BANK GROUP
    const rightBankGroup = new THREE.Group();
    rightBankGroupRef.current = rightBankGroup;
    rightBankGroup.position.set(0.65, 0.25, 0);
    rightBankGroup.rotation.z = -bankAngle;
    engineMasterGroup.add(rightBankGroup);

    // Right Cam Cover (Rosso Corsa)
    const rightCamCover = new THREE.Mesh(camCoverGeo, rossoCorsaMaterial);
    rightCamCover.position.set(0, 0.5, 0);
    rightCamCover.castShadow = true;
    rightBankGroup.add(rightCamCover);

    // Ferrari Badge Stripe on Right Cover
    const rightBadge = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.05, 2.8),
      brushedChromeMaterial
    );
    rightBadge.position.set(0, 0.74, 0);
    rightBankGroup.add(rightBadge);

    // --- 12 POLISHED VELOCITY STACKS (6 per cylinder bank) ---
    const intakeGroup = new THREE.Group();
    intakeGroupRef.current = intakeGroup;
    engineMasterGroup.add(intakeGroup);

    const stackGeo = new THREE.CylinderGeometry(0.13, 0.09, 0.65, 24, 1, true);
    const bellmouthGeo = new THREE.TorusGeometry(0.13, 0.03, 16, 24);
    bellmouthGeo.rotateX(Math.PI / 2);

    for (let i = 0; i < 6; i++) {
      const zPos = -1.4 + i * 0.56;

      // Left Bank Velocity Stack
      const leftStack = new THREE.Mesh(stackGeo, brushedChromeMaterial);
      const leftBell = new THREE.Mesh(bellmouthGeo, brushedChromeMaterial);
      leftStack.position.set(-0.35, 1.1, zPos);
      leftStack.rotation.z = 0.22;
      leftBell.position.set(-0.35, 1.42, zPos);
      leftBell.rotation.z = 0.22;
      intakeGroup.add(leftStack);
      intakeGroup.add(leftBell);

      // Right Bank Velocity Stack
      const rightStack = new THREE.Mesh(stackGeo, brushedChromeMaterial);
      const rightBell = new THREE.Mesh(bellmouthGeo, brushedChromeMaterial);
      rightStack.position.set(0.35, 1.1, zPos);
      rightStack.rotation.z = -0.22;
      rightBell.position.set(0.35, 1.42, zPos);
      rightBell.rotation.z = -0.22;
      intakeGroup.add(rightStack);
      intakeGroup.add(rightBell);
    }

    // Carbon Fibre Twin Intake Airboxes
    const leftPlenum = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 3.6), carbonMaterial);
    leftPlenum.position.set(-0.85, 1.0, 0);
    leftPlenum.rotation.z = 0.3;
    intakeGroup.add(leftPlenum);

    const rightPlenum = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 3.6), carbonMaterial);
    rightPlenum.position.set(0.85, 1.0, 0);
    rightPlenum.rotation.z = -0.3;
    intakeGroup.add(rightPlenum);

    // --- EXHAUST HEADERS (Bronze Inconel) ---
    for (let i = 0; i < 6; i++) {
      const zPos = -1.35 + i * 0.54;
      
      // Left Runner
      const leftPipe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 0.85, 16),
        bronzeExhaustMaterial
      );
      leftPipe.position.set(-1.25, -0.2, zPos);
      leftPipe.rotation.z = 1.1;
      leftPipe.rotation.y = 0.2;
      engineMasterGroup.add(leftPipe);

      // Right Runner
      const rightPipe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 0.85, 16),
        bronzeExhaustMaterial
      );
      rightPipe.position.set(1.25, -0.2, zPos);
      rightPipe.rotation.z = -1.1;
      rightPipe.rotation.y = -0.2;
      engineMasterGroup.add(rightPipe);
    }

    // --- FRONT TIMING DRIVE & PULLEYS ---
    const pulleyGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.12, 28);
    pulleyGeo.rotateX(Math.PI / 2);
    
    const crankPulley = new THREE.Mesh(pulleyGeo, brushedChromeMaterial);
    crankPulley.position.set(0, -0.6, 1.95);
    engineMasterGroup.add(crankPulley);
    pulleysRef.current.push(crankPulley);

    const leftCamPulley = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.1, 28).rotateX(Math.PI / 2), rossoCorsaMaterial);
    leftCamPulley.position.set(-0.65, 0.65, 1.92);
    engineMasterGroup.add(leftCamPulley);
    pulleysRef.current.push(leftCamPulley);

    const rightCamPulley = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.1, 28).rotateX(Math.PI / 2), rossoCorsaMaterial);
    rightCamPulley.position.set(0.65, 0.65, 1.92);
    engineMasterGroup.add(rightCamPulley);
    pulleysRef.current.push(rightCamPulley);

    // --- EXHAUST FLAME PARTICLES SYSTEM ---
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      particlePositions[p * 3] = (Math.random() - 0.5) * 0.4;
      particlePositions[p * 3 + 1] = -1.2;
      particlePositions[p * 3 + 2] = -2.2 - Math.random() * 1.5;

      particleColors[p * 3] = 1.0;
      particleColors[p * 3 + 1] = Math.random() * 0.4;
      particleColors[p * 3 + 2] = 0.05;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });

    const flameParticles = new THREE.Points(particleGeo, particleMat);
    flameParticlesRef.current = flameParticles;
    engineMasterGroup.add(flameParticles);

    // Subtle Ground Shadow Floor
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.6 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.5;
    floor.receiveShadow = true;
    scene.add(floor);

    // --- Interactive Orbit Controls (Smooth Inertia Mouse & Touch) ---
    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current || !engineMasterGroup) return;
      const deltaX = e.clientX - prevMouse.current.x;
      const deltaY = e.clientY - prevMouse.current.y;

      engineMasterGroup.rotation.y += deltaX * 0.007;
      engineMasterGroup.rotation.x = Math.max(-0.5, Math.min(0.6, engineMasterGroup.rotation.x + deltaY * 0.005));

      rotationVelocity.current = { x: deltaY * 0.001, y: deltaX * 0.001 };
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // --- Resize Listener ---
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- Main Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera interpolation towards target position
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCameraPos.current, 0.045);
        cameraRef.current.lookAt(targetLookAt.current);
      }

      // Engine slow passive rotation when not dragging
      if (!isDragging.current && engineMasterGroup) {
        engineMasterGroup.rotation.y += rotationVelocity.current.y;
        rotationVelocity.current.y *= 0.96; // damping
        if (Math.abs(rotationVelocity.current.y) < 0.0018) {
          rotationVelocity.current.y = 0.0018; // minimal idle drift
        }
      }

      // Pulley rotation based on real-time RPM
      const currentRpm = ferrariAudio.getCurrentRPM();
      const pulleySpeed = (currentRpm / 60) * Math.PI * 2 * delta;
      pulleysRef.current.forEach((pulley) => {
        pulley.rotation.z += pulleySpeed;
      });

      // Subtle engine vibration rumble
      if (engineMasterGroup) {
        const vibrationAmp = (currentRpm / 9000) * 0.015;
        engineMasterGroup.position.x = (Math.random() - 0.5) * vibrationAmp;
        engineMasterGroup.position.y = (Math.random() - 0.5) * vibrationAmp;
      }

      // Exhaust flame particles when revving
      if (flameParticlesRef.current) {
        const mat = flameParticlesRef.current.material as THREE.PointsMaterial;
        if (currentRpm > 2500) {
          mat.opacity = Math.min(0.9, (currentRpm - 2000) / 4000);
          const pos = flameParticlesRef.current.geometry.attributes.position.array as Float32Array;
          for (let p = 0; p < particleCount; p++) {
            pos[p * 3 + 2] -= delta * (currentRpm / 350);
            if (pos[p * 3 + 2] < -4.5) {
              pos[p * 3 + 2] = -2.2;
              pos[p * 3] = (Math.random() - 0.5) * 0.5;
            }
          }
          flameParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        } else {
          mat.opacity = 0;
        }
      }

      // Red core light pulsing with combustion cycle
      coreGlow.intensity = 2.0 + Math.sin(time * 12) * 1.5 + (currentRpm / 9000) * 4.0;

      renderer.render(scene, camera);
    };

    animate();

    // Sync RPM display for UI
    const rpmInterval = setInterval(() => {
      setRpmDisplay(ferrariAudio.getCurrentRPM());
    }, 80);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(rpmInterval);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Exploded View Effect
  useEffect(() => {
    if (!leftBankGroupRef.current || !rightBankGroupRef.current || !intakeGroupRef.current) return;
    
    const bankAngle = (65 / 2) * (Math.PI / 180);
    if (isExploded) {
      // Expand parts outward
      leftBankGroupRef.current.position.set(-1.15, 0.65, 0);
      rightBankGroupRef.current.position.set(1.15, 0.65, 0);
      intakeGroupRef.current.position.set(0, 0.7, 0);
    } else {
      leftBankGroupRef.current.position.set(-0.65, 0.25, 0);
      rightBankGroupRef.current.position.set(0.65, 0.25, 0);
      intakeGroupRef.current.position.set(0, 0, 0);
    }
  }, [isExploded]);

  // Camera Presets
  const handlePresetChange = (preset: 'overview' | 'heads' | 'intake' | 'exhaust') => {
    setActivePreset(preset);
    if (preset === 'overview') {
      targetCameraPos.current.set(0, 2.5, 6.2);
      targetLookAt.current.set(0, 0, 0);
    } else if (preset === 'heads') {
      targetCameraPos.current.set(-2.4, 2.0, 3.2);
      targetLookAt.current.set(-0.5, 0.3, 0);
    } else if (preset === 'intake') {
      targetCameraPos.current.set(0, 4.2, 1.8);
      targetLookAt.current.set(0, 0.8, 0);
    } else if (preset === 'exhaust') {
      targetCameraPos.current.set(3.4, -0.4, 2.6);
      targetLookAt.current.set(0.8, -0.3, 0);
    }
  };

  // Interactive Throttle Rev
  const handleRevClick = () => {
    if (isRevving) return;
    setIsRevving(true);
    ferrariAudio.revThrottle(0.92);
    setTimeout(() => {
      setIsRevving(false);
    }, 1100);
  };

  const resetView = () => {
    if (engineGroupRef.current) {
      engineGroupRef.current.rotation.set(0, 0, 0);
    }
    handlePresetChange('overview');
  };

  return (
    <div className="relative w-full h-full min-h-[580px] sm:min-h-[660px] flex items-center justify-center select-none overflow-hidden">
      {/* 3D Canvas Mount Point */}
      <div 
        ref={mountRef} 
        className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
      />

      {/* Rolls-Royce Black Badge Style Cinematic Vignettes */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-[#030303] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030303] via-[#030303]/70 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#030303]/80 to-transparent pointer-events-none" />

      {/* Floating Engine Telemetry Badge */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-1.5 p-3.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span className="font-mono text-[11px] tracking-widest text-neutral-300 uppercase">
            Tipo F140 HD &bull; 65° V12
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-xl font-display font-bold text-white tracking-wider">
            {rpmDisplay.toLocaleString()}
          </span>
          <span className="text-[10px] text-red-500 font-mono tracking-widest uppercase">RPM</span>
        </div>
        <div className="text-[10px] text-neutral-400 font-sans tracking-wider">
          Atmospheric Displacement: 6,496 cc
        </div>
      </div>

      {/* Top Right Controls & Camera Angles */}
      <div className="absolute top-6 right-6 z-20 flex flex-col sm:flex-row items-end sm:items-center gap-2.5">
        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10 text-[11px]">
          {(['overview', 'heads', 'intake', 'exhaust'] as const).map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetChange(preset)}
              className={`px-3 py-1 rounded-full uppercase tracking-wider transition-all duration-300 ${
                activePreset === preset
                  ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(232,0,29,0.6)] font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsExploded(!isExploded)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border text-xs tracking-wider uppercase transition-all duration-300 ${
            isExploded 
              ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(232,0,29,0.5)]' 
              : 'bg-black/60 text-neutral-300 border-white/10 hover:border-neutral-500'
          }`}
          title="Toggle Exploded Mechanical View"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Exploded</span> View
        </button>

        <button
          onClick={resetView}
          className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-neutral-400 hover:text-white transition-colors"
          title="Reset Camera View"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Center: Interactive Live Rev Pedal / Throttle Trigger */}
      <div className="absolute bottom-8 z-20 flex flex-col items-center">
        <button
          onClick={handleRevClick}
          disabled={isRevving}
          className={`group flex items-center gap-3 px-7 py-3 rounded-full text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer ${
            isRevving
              ? 'bg-gradient-to-r from-red-600 to-red-500 text-white scale-105 shadow-[0_0_35px_rgba(255,40,0,0.8)] border border-red-300'
              : 'bg-neutral-900/90 hover:bg-red-600 text-neutral-200 hover:text-white border border-white/15 hover:border-red-500 shadow-[0_8px_30px_rgba(0,0,0,0.8)]'
          }`}
        >
          <Flame className={`w-4 h-4 transition-transform duration-300 ${isRevving ? 'text-white scale-125 animate-bounce' : 'text-red-500 group-hover:text-white'}`} />
          <span>{isRevving ? '8,500 RPM Redline Scream!' : 'Throttle Rev V12'}</span>
          <Volume2 className="w-3.5 h-3.5 opacity-70" />
        </button>
        <span className="mt-2 text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-mono">
          Drag to Orbit &bull; Scroll to Zoom
        </span>
      </div>
    </div>
  );
};
