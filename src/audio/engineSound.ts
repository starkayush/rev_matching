/**
 * Ferrari V12 Atmospheric Sound Synthesizer & F1 Dual-Clutch Transmission Engine
 * Built with Web Audio API for 100% reliable zero-latency playback across all browsers & mobile.
 * Features:
 * - 65° V12 atmospheric harmonic audio synthesis with subtle tube saturation & rasp
 * - Dual-clutch F1 8-Speed sequential gearbox simulation
 * - Raw supersonic exhaust pops & bangs on high-RPM upshifts (DSG/DCT explosion)
 * - Raw multi-stage backfire crackle barrages on throttle lift-off & rev-matched downshifts
 * - Organic inconel header resonance & low-frequency concussive shockwaves
 * - Natural transition down to resting 850 RPM idle
 */

export interface TransmissionTelemetry {
  rpm: number;
  gear: number; // 0 = Neutral, 1-7 = Forward gears
  speed: number; // km/h
  isShiftCut: boolean;
  shiftAction: 'none' | 'up' | 'down' | 'tuck';
  isRevLimiter: boolean;
  isPedalPressed: boolean;
  hasExhaustPop: boolean;
}

type TelemetryListener = (telemetry: TransmissionTelemetry) => void;

class FerrariV12Audio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private saturationNode: WaveShaperNode | null = null;
  private idleOscillators: OscillatorNode[] = [];
  private idleGain: GainNode | null = null;
  private idleFilter: BiquadFilterNode | null = null;
  private isIdling: boolean = false;

  // Transmission Physics State
  private currentRPM: number = 850;
  private currentGear: number = 0; // 0 = Neutral (Idle), 1..7 = Gears
  private currentSpeed: number = 0; // km/h
  private isThrottleActive: boolean = false;
  private wasThrottleActive: boolean = false;
  private throttleMode: 'strada' | 'sport' | 'corsa' | 'infernale' = 'corsa';
  private lastShiftTime: number = 0;
  private blipEndTime: number = 0;
  private isShiftCut: boolean = false;
  private shiftAction: 'none' | 'up' | 'down' | 'tuck' = 'none';
  private isRevLimiter: boolean = false;
  private hasExhaustPop: boolean = false;
  private hasPlayedTuckSound: boolean = true;
  private physicsInterval: number | null = null;
  private listeners: Set<TelemetryListener> = new Set();

  constructor() {
    // Initialized lazily upon user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

      // Tube saturation curve for raw mechanical rasp
      this.saturationNode = this.ctx.createWaveShaper();
      this.saturationNode.curve = this.createDistortionCurve(16) as any;
      this.saturationNode.oversample = '4x';

      this.saturationNode.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Generates a soft-saturation curve to model raw exhaust rasp and valve clatter
   */
  private createDistortionCurve(k: number = 16): Float32Array {
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.85, this.ctx.currentTime, 0.05);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public subscribeTelemetry(listener: TelemetryListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyTelemetry() {
    const data: TransmissionTelemetry = {
      rpm: Math.round(this.currentRPM),
      gear: this.currentGear,
      speed: Math.round(this.currentSpeed),
      isShiftCut: this.isShiftCut,
      shiftAction: this.shiftAction,
      isRevLimiter: this.isRevLimiter,
      isPedalPressed: this.isThrottleActive,
      hasExhaustPop: this.hasExhaustPop,
    };
    this.listeners.forEach((fn) => fn(data));
  }

  /**
   * Visceral Ferrari V12 Push-to-Start Sequence
   */
  public startEngine(): Promise<void> {
    this.initContext();
    if (!this.ctx || !this.masterGain) return Promise.resolve();

    const t = this.ctx.currentTime;

    // --- 1. STARTER MOTOR CRANK (0.0s - 0.45s) ---
    const starterOsc = this.ctx.createOscillator();
    const starterGain = this.ctx.createGain();
    const starterFilter = this.ctx.createBiquadFilter();

    starterOsc.type = 'sawtooth';
    starterOsc.frequency.setValueAtTime(140, t);
    starterOsc.frequency.exponentialRampToValueAtTime(320, t + 0.4);

    starterFilter.type = 'bandpass';
    starterFilter.frequency.setValueAtTime(450, t);
    starterFilter.Q.setValueAtTime(3.5, t);

    starterGain.gain.setValueAtTime(0.01, t);
    starterGain.gain.linearRampToValueAtTime(0.35, t + 0.1);
    starterGain.gain.exponentialRampToValueAtTime(0.001, t + 0.48);

    starterOsc.connect(starterFilter);
    starterFilter.connect(starterGain);
    starterGain.connect(this.masterGain);

    starterOsc.start(t);
    starterOsc.stop(t + 0.5);

    // Starter mechanical clicks
    for (let i = 0; i < 4; i++) {
      const clickTime = t + (i * 0.09);
      this.triggerRawExhaustCrack(clickTime, 0.25, 1200, false);
    }

    // --- 2. V12 EXPLOSION & HIGH-RPM ROAR (0.42s - 2.8s) ---
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(120, t + 0.42);
    subOsc.frequency.exponentialRampToValueAtTime(36, t + 1.2);

    subGain.gain.setValueAtTime(0.001, t + 0.42);
    subGain.gain.linearRampToValueAtTime(0.9, t + 0.48);
    subGain.gain.exponentialRampToValueAtTime(0.2, t + 1.8);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(t + 0.42);
    subOsc.stop(t + 2.6);

    // 12-Cylinder Harmonic Chorus
    const baseFreqs = [180, 270, 360, 540, 720];
    baseFreqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';

      osc.frequency.setValueAtTime(freq * 0.7, t + 0.45);
      osc.frequency.exponentialRampToValueAtTime(freq * 2.6, t + 1.1); // Peak rev
      osc.frequency.exponentialRampToValueAtTime(freq * 1.8, t + 1.6);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.45, t + 2.6); // Return to idle

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, t + 0.45);
      filter.frequency.linearRampToValueAtTime(4500, t + 1.1);
      filter.frequency.exponentialRampToValueAtTime(800, t + 2.6);
      filter.Q.setValueAtTime(2.0, t);

      const amp = (0.28 / (idx + 1));
      gain.gain.setValueAtTime(0.001, t + 0.45);
      gain.gain.linearRampToValueAtTime(amp, t + 0.6);
      gain.gain.setValueAtTime(amp * 1.2, t + 1.1);
      gain.gain.exponentialRampToValueAtTime(amp * 0.5, t + 2.0);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(t + 0.45);
      osc.stop(t + 2.85);
    });

    // Startup Overrun Pop Barrage
    const popTimings = [1.65, 1.88, 2.1, 2.28, 2.44, 2.6];
    popTimings.forEach((offset, idx) => {
      this.triggerRawExhaustCrack(t + offset, 0.55 - idx * 0.06, 900 + Math.random() * 500, idx === 0);
    });

    setTimeout(() => {
      this.startIdleLoop();
    }, 2500);

    return new Promise((resolve) => {
      setTimeout(resolve, 800);
    });
  }

  /**
   * REALISTIC RAW EXHAUST DETONATION / BANG
   * Uses asymmetric shock impulse, soft-clipped non-linear drive,
   * high-Q metallic pipe resonance, and sub-bass air concussion.
   */
  private triggerRawExhaustCrack(
    atTime: number, 
    gainLevel: number = 0.8, 
    centerFreq: number = 950, 
    includeSubThump: boolean = true
  ) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const sampleRate = this.ctx.sampleRate;
    const duration = includeSubThump ? 0.075 : 0.045;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    // Build non-linear asymmetric shockwave (instant shock front + metallic ring)
    for (let i = 0; i < bufferSize; i++) {
      const progress = i / bufferSize;
      const decay = Math.exp(-progress * (includeSubThump ? 26 : 42));
      // Organic noise with non-linear distortion (sharp wave breaks)
      const r = (Math.random() * 2 - 1);
      const impulse = (r > 0 ? Math.pow(r, 0.4) : -Math.pow(-r, 0.4)) * 2.8;
      data[i] = Math.tanh(impulse) * decay;
    }

    const shockNode = this.ctx.createBufferSource();
    shockNode.buffer = buffer;

    // Inconel / Titanium Header Resonant Cavity Filter
    const pipeResonator = this.ctx.createBiquadFilter();
    pipeResonator.type = 'bandpass';
    pipeResonator.frequency.setValueAtTime(centerFreq, atTime);
    pipeResonator.Q.setValueAtTime(4.5, atTime);

    const shockGain = this.ctx.createGain();
    const modeMultiplier = this.throttleMode === 'infernale' ? 1.35 : this.throttleMode === 'corsa' ? 1.15 : 0.9;
    shockGain.gain.setValueAtTime(gainLevel * modeMultiplier, atTime);
    shockGain.gain.exponentialRampToValueAtTime(0.001, atTime + duration);

    shockNode.connect(pipeResonator);
    pipeResonator.connect(shockGain);
    shockGain.connect(this.masterGain);

    shockNode.start(atTime);
    shockNode.stop(atTime + duration);

    // Deep sub-bass air concussion thump (only on primary loud bangs)
    if (includeSubThump) {
      const thumpOsc = this.ctx.createOscillator();
      const thumpGain = this.ctx.createGain();
      thumpOsc.type = 'sine';
      thumpOsc.frequency.setValueAtTime(135, atTime);
      thumpOsc.frequency.exponentialRampToValueAtTime(32, atTime + 0.06);

      thumpGain.gain.setValueAtTime(gainLevel * 0.75, atTime);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, atTime + 0.07);

      thumpOsc.connect(thumpGain);
      thumpGain.connect(this.masterGain);
      thumpOsc.start(atTime);
      thumpOsc.stop(atTime + 0.08);
    }
  }

  /**
   * ORGANIC EXHAUST CRACKLE & BURBLE BARRAGE
   * Produces an authentic cascade of staggered pops and popcorn burbles on downshifts and lift-off.
   */
  private triggerCrackleBarrage(intensity: number = 0.85, count: number = 7) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    this.hasExhaustPop = true;
    setTimeout(() => {
      this.hasExhaustPop = false;
    }, 350);

    // 1. Initial loud primary detonation
    this.triggerRawExhaustCrack(t, intensity, 820 + Math.random() * 300, true);

    // 2. Trailing cluster of irregular secondary micro-pops & metal ticks
    let currentOffset = 0.035;
    for (let i = 0; i < count; i++) {
      currentOffset += 0.038 + Math.random() * 0.062; // Organic micro-jitter
      const popTime = t + currentOffset;
      const popVol = intensity * (0.35 + Math.random() * 0.45) * Math.pow(0.82, i);
      const pipePitch = 900 + Math.random() * 950;
      this.triggerRawExhaustCrack(popTime, popVol, pipePitch, i === 1);
    }
  }

  /**
   * DISTINCT MECHANICAL "TUCK" / CLUTCH DISENGAGEMENT THUD
   * Plays with visceral tactile clunk right as the tachometer needle reaches 1 (1,000 RPM)
   * on deceleration and comes to rest at idle.
   */
  public triggerTuckSound() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const t = this.ctx.currentTime;

    // 1. Mechanical "tuck" click / clutch dog latch transient
    const clickDuration = 0.024;
    const bufferSize = Math.floor(this.ctx.sampleRate * clickDuration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const progress = i / bufferSize;
      const decay = Math.exp(-progress * 38);
      data[i] = (Math.random() * 2 - 1) * decay;
    }

    const clickNode = this.ctx.createBufferSource();
    clickNode.buffer = buffer;

    const clickFilter = this.ctx.createBiquadFilter();
    clickFilter.type = 'bandpass';
    clickFilter.frequency.setValueAtTime(1450, t);
    clickFilter.Q.setValueAtTime(3.8, t);

    const clickGain = this.ctx.createGain();
    clickGain.gain.setValueAtTime(0.65, t);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + clickDuration);

    clickNode.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(this.masterGain);
    clickNode.start(t);
    clickNode.stop(t + clickDuration);

    // 2. Low-frequency transmission engagement "thud" (the deep tuck punch)
    const thudOsc = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    thudOsc.type = 'sine';
    thudOsc.frequency.setValueAtTime(105, t);
    thudOsc.frequency.exponentialRampToValueAtTime(38, t + 0.045);

    thudGain.gain.setValueAtTime(0.72, t);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    thudOsc.connect(thudGain);
    thudGain.connect(this.masterGain);
    thudOsc.start(t);
    thudOsc.stop(t + 0.055);

    // 3. Final soft exhaust chuff / pop as manifold pressure neutralizes
    this.triggerRawExhaustCrack(t + 0.004, 0.48, 620, false);

    // Trigger visual pop indicator
    this.hasExhaustPop = true;
    setTimeout(() => {
      this.hasExhaustPop = false;
    }, 220);
  }

  /**
   * Continuous V12 Sound Generation Loop
   */
  public startIdleLoop() {
    if (this.isIdling || !this.ctx || !this.masterGain) return;
    this.isIdling = true;
    this.currentRPM = 850;
    this.currentGear = 0;
    this.currentSpeed = 0;

    const t = this.ctx.currentTime;
    this.idleGain = this.ctx.createGain();
    this.idleGain.gain.setValueAtTime(0.001, t);
    this.idleGain.gain.linearRampToValueAtTime(0.22, t + 1.2);

    this.idleFilter = this.ctx.createBiquadFilter();
    this.idleFilter.type = 'lowpass';
    this.idleFilter.frequency.setValueAtTime(450, t);

    this.idleFilter.connect(this.idleGain);
    if (this.saturationNode) {
      this.idleGain.connect(this.saturationNode);
    } else {
      this.idleGain.connect(this.masterGain);
    }

    // Multi-harmonic V12 components (Fundamental firing pulse = RPM / 60 * 6)
    const harmonicRatios = [1, 2, 3, 4, 6];
    this.idleOscillators = harmonicRatios.map((ratio, index) => {
      const osc = this.ctx!.createOscillator();
      osc.type = index === 0 ? 'sine' : index % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(85 * ratio, t);

      const oscGain = this.ctx!.createGain();
      oscGain.gain.value = 0.22 / (ratio * 1.1);

      osc.connect(oscGain);
      oscGain.connect(this.idleFilter!);
      osc.start();
      return osc;
    });

    this.startTransmissionPhysicsLoop();
  }

  /**
   * Continuous Transmission & Engine Physics Loop
   */
  private startTransmissionPhysicsLoop() {
    if (this.physicsInterval) clearInterval(this.physicsInterval);

    // Gear ratios & top speeds per gear (Ferrari 8-Speed F1 DCT 454 km/h spec)
    const gearMaxSpeeds = [0, 95, 155, 215, 275, 335, 385, 425, 454];
    const gearShiftRPM = 9180; // Redline upshift trigger
    const gearLandingRPM = [850, 5800, 6200, 6500, 6800, 7100, 7400, 7650, 7900];

    const dt = 0.035; // ~30 FPS physics tick

    this.physicsInterval = window.setInterval(() => {
      if (!this.isIdling || !this.ctx) return;

      const now = performance.now();

      // Detect Throttle Lift-Off (User just took foot off the pedal)
      if (this.wasThrottleActive && !this.isThrottleActive) {
        if (this.currentRPM > 2600) {
          // Real Throttle Lift-Off Overrun Backfire Barrage!
          const overrunIntensity = Math.min(1.0, 0.5 + (this.currentRPM / 9200) * 0.5);
          this.triggerCrackleBarrage(overrunIntensity, 7);
        }
      }
      this.wasThrottleActive = this.isThrottleActive;

      // --- THROTTLE PEDAL IS HELD DOWN ---
      if (this.isThrottleActive) {
        if (this.currentRPM > 1300) {
          this.hasPlayedTuckSound = false;
        }

        // If in Neutral, immediately engage 1st gear
        if (this.currentGear === 0) {
          this.currentGear = 1;
          this.lastShiftTime = now;
        }

        // Acceleration rate depends on gear (progressive pull all the way to 450 km/h)
        const accelRate = Math.max(1250, 3800 - (this.currentGear * 310));
        this.currentRPM += accelRate * dt;

        // Speed increases with RPM and current gear ratio up to 450 km/h
        const speedRatio = gearMaxSpeeds[this.currentGear] || 95;
        const targetSpeed = (this.currentRPM / 9200) * speedRatio;
        this.currentSpeed += (targetSpeed - this.currentSpeed) * 0.12;

        // Check for REDLINE UPSHIFT across all 8 gears
        if (this.currentRPM >= gearShiftRPM && now - this.lastShiftTime > 750) {
          if (this.currentGear < 8) {
            // Trigger Dual-Clutch Upshift with violent exhaust crack!
            this.executeUpshift(this.currentGear + 1, gearLandingRPM[this.currentGear + 1]);
          } else {
            // Top Gear (8th gear): Engine locks smoothly at 454 km/h under full aerodynamic load
            // Normal, steady, pure screaming V12 sound as a true car does (zero crackling or popping)
            this.currentRPM = 9200;
            this.currentSpeed = 454;
            this.isRevLimiter = false;
          }
        }
      } 
      // --- THROTTLE PEDAL IS RELEASED (LIFT OFF) ---
      else {
        this.isRevLimiter = false;

        // Decelerate RPM (engine braking) - realistic slowed down progression
        if (now >= this.blipEndTime) {
          const decelRate = this.currentGear > 0 ? 1150 : 900;
          this.currentRPM = Math.max(850, this.currentRPM - decelRate * dt);
          this.currentSpeed = Math.max(0, this.currentSpeed - 18 * dt);
        }

        if (this.currentGear > 0) {
          // Check for SEQUENTIAL REV-MATCH DOWNSHIFT
          // Downshift when RPM falls below ~3,250 RPM with minimum 1.8s interval between shifts
          if (this.currentGear > 1 && this.currentRPM <= 3250 && now - this.lastShiftTime > 1800) {
            this.executeDownshift(this.currentGear - 1);
          }
        }

        // Check for THE TUCK SOUND when needle reaches ~1 (1,000 RPM) coming to rest
        if (!this.hasPlayedTuckSound && this.currentRPM <= 1100 && now - this.lastShiftTime > 850) {
          this.hasPlayedTuckSound = true;
          this.currentGear = 0; // Disengage to Neutral
          this.shiftAction = 'tuck';
          this.triggerTuckSound();
          setTimeout(() => {
            if (this.shiftAction === 'tuck') {
              this.shiftAction = 'none';
            }
          }, 450);
        }

        if (this.currentGear === 0 && this.hasPlayedTuckSound) {
          // Resting Idle settling at 850 RPM
          this.currentRPM += (850 - this.currentRPM) * 0.12;
          if (this.shiftAction !== 'tuck') {
            this.shiftAction = 'none';
          }
        }
      }

      // Keep RPM clamped within realistic bounds
      this.currentRPM = Math.max(850, Math.min(9400, this.currentRPM));

      // Update Audio Synthesizer Oscillators and Filter for the current RPM
      this.updateAudioAcoustics();

      // Notify UI Subscribers
      this.notifyTelemetry();
    }, 35);
  }

  /**
   * Real Dual-Clutch F1 UPSHIFT Acoustics
   * 1. 45ms Ignition cut (engine torque interruption)
   * 2. Violent supersonic exhaust crack + sub-bass punch (The DCT Bang)
   * 3. RPM drops instantly to next gear's landing RPM
   */
  private executeUpshift(nextGear: number, landingRPM: number) {
    if (!this.ctx || !this.masterGain) return;

    this.lastShiftTime = performance.now();
    this.currentGear = nextGear;
    this.isShiftCut = true;
    this.shiftAction = 'up';
    this.hasExhaustPop = true;

    const t = this.ctx.currentTime;

    // 1. Ignition Cut: sudden 45ms volume dip
    if (this.idleGain) {
      this.idleGain.gain.cancelScheduledValues(t);
      this.idleGain.gain.setValueAtTime(0.04, t);
      this.idleGain.gain.setValueAtTime(0.04, t + 0.045);
      this.idleGain.gain.linearRampToValueAtTime(0.55, t + 0.08);
    }

    // 2. High-energy dual exhaust detonation (Raw metallic pop + sub concussion)
    this.triggerRawExhaustCrack(t + 0.005, 0.95, 780, true);
    // Trailing supersonic crack
    this.triggerRawExhaustCrack(t + 0.038, 0.65, 1350, false);

    // 3. Instantaneous RPM drop to the landing RPM of the higher gear
    this.currentRPM = landingRPM;

    setTimeout(() => {
      this.isShiftCut = false;
      this.shiftAction = 'none';
      this.hasExhaustPop = false;
    }, 180);
  }

  /**
   * Real Sequential REV-MATCH DOWNSHIFT Acoustics
   * 1. Throttle auto-blip: Sudden screaming intake bark (+1,600 to +2,000 RPM)
   * 2. Multiple raw backfire explosions & popcorn crackles as unburnt fuel hits inconel headers
   */
  private executeDownshift(targetGear: number) {
    if (!this.ctx || !this.masterGain) return;

    const now = performance.now();
    this.lastShiftTime = now;
    this.currentGear = targetGear;
    this.shiftAction = 'down';

    // Hold the rev-match peak for 220ms before engine-braking resumes
    this.blipEndTime = now + 220;

    // Blip throttle: spike RPM up with authority to ~5,250 RPM
    const blipRPM = Math.min(5800, 3250 + 2000);
    this.currentRPM = blipRPM;

    const t = this.ctx.currentTime;

    // Open filter wide for aggressive intake throatiness and sustain for 1.1s
    if (this.idleFilter) {
      this.idleFilter.frequency.cancelScheduledValues(t);
      this.idleFilter.frequency.setValueAtTime(4400, t);
      this.idleFilter.frequency.exponentialRampToValueAtTime(1200, t + 1.1);
    }

    if (this.idleGain) {
      this.idleGain.gain.cancelScheduledValues(t);
      this.idleGain.gain.setValueAtTime(0.52, t);
      this.idleGain.gain.exponentialRampToValueAtTime(0.24, t + 1.1);
    }

    // Trigger raw downshift pop & bang barrage (8 staggered crackles)
    const downshiftIntensity = this.throttleMode === 'infernale' ? 1.0 : 0.88;
    this.triggerCrackleBarrage(downshiftIntensity, 8);

    setTimeout(() => {
      if (this.shiftAction === 'down') {
        this.shiftAction = 'none';
      }
    }, 450);
  }

  /**
   * Terminal Velocity Top Speed Lock (454 km/h)
   * Smooth, steady, high-load V12 howling without artificial popping or crackling
   */
  private executeRevLimiterBounce() {
    this.isRevLimiter = false;
    this.currentRPM = 9200;
    this.currentSpeed = 454;
  }

  /**
   * Update oscillator frequencies and resonance filter in real time
   */
  private updateAudioAcoustics() {
    if (!this.ctx || !this.isIdling) return;

    const t = this.ctx.currentTime;

    // Firing frequency for V12: 6 cylinder combustion events per crankshaft revolution
    const firingFreq = (this.currentRPM / 60) * 6;
    const harmonicRatios = [1, 2, 3, 4, 6];

    this.idleOscillators.forEach((osc, idx) => {
      try {
        osc.frequency.setTargetAtTime(firingFreq * harmonicRatios[idx], t, 0.03);
      } catch {
        // ignore if context closing
      }
    });

    // Acoustic filter and gain envelope
    if (this.idleFilter && !this.isShiftCut) {
      const baseCutoff = 450;
      const rpmRatio = (this.currentRPM - 850) / (9500 - 850);
      const targetCutoff = baseCutoff + Math.pow(rpmRatio, 1.2) * 3800;
      this.idleFilter.frequency.setTargetAtTime(targetCutoff, t, 0.05);
    }

    if (this.idleGain && !this.isShiftCut) {
      const targetVol = this.isThrottleActive 
        ? 0.32 + ((this.currentRPM - 850) / 9500) * 0.28 
        : 0.18 + ((this.currentRPM - 850) / 9500) * 0.12;
      this.idleGain.gain.setTargetAtTime(targetVol, t, 0.08);
    }
  }

  /**
   * Called by the Interactive Accelerator Pedal when user presses down
   */
  public pressThrottle(mode: 'strada' | 'sport' | 'corsa' | 'infernale' = 'corsa') {
    this.initContext();
    if (!this.isIdling) {
      this.startIdleLoop();
    }
    this.isThrottleActive = true;
    this.throttleMode = mode;
  }

  /**
   * Called by the Interactive Accelerator Pedal when user lifts off
   */
  public releaseThrottle() {
    this.isThrottleActive = false;
  }

  /**
   * Backward-compatible simple rev method (for 3D engine rev button)
   */
  public revThrottle(_intensity: number = 0.8) {
    this.pressThrottle(this.throttleMode);
    setTimeout(() => {
      this.releaseThrottle();
    }, 1100);
  }

  public getCurrentRPM(): number {
    return Math.round(this.currentRPM);
  }

  public getCurrentGear(): number {
    return this.currentGear;
  }

  public getCurrentSpeed(): number {
    return Math.round(this.currentSpeed);
  }

  public stopEngine() {
    if (this.physicsInterval) {
      clearInterval(this.physicsInterval);
      this.physicsInterval = null;
    }
    this.idleOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    this.idleOscillators = [];
    this.isIdling = false;
  }
}

export const ferrariAudio = new FerrariV12Audio();
