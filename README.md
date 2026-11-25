# Rev Matching — Ferrari V12 "Black Badge" Experience

An ultra-luxury, highly interactive landing page for Ferrari inspired by the dark subversive aesthetic and fluid inertia scrolling of the Rolls-Royce Black Badge showroom.

Built with **React 19**, **TypeScript**, **Tailwind CSS**, **Three.js**, **Lenis Smooth Scroll**, and **Web Audio API**.

---

## 🌟 Key Features

### 1. The Entry & Ignition
- **Stark Minimalist Screen:** Pitch-black background featuring only the custom **V12 Engine Emblem** and the **"Rev Matching"** title, with scroll locked at the start.
- **Engine Push Start:** Anodized red core inside a machined knurled titanium bezel with an ambient breathing crimson halo.
- **Cinematic Transition:** Clicking the start button ignites the authentic V12 startup roar and triggers an explosive zoom-through transition into the showroom.

### 2. Interactive 3D V12 Engine Model (Three.js)
- Procedural 3D model of Ferrari's legendary **65° V12 engine** (Tipo F140 architecture).
- Rosso Corsa red crinkle-painted cylinder heads with chrome badging.
- 12 polished chrome velocity stacks, bronze/inconel exhaust headers, and live rotating timing pulleys.
- Orbit drag controls, camera angle presets (*Overview*, *Rosso Heads*, *Velocity Intake*, *Exhaust*), and an **Exploded Mechanical View**.
- Live throttle rev button triggering combustion exhaust flame particles.

### 3. F1 8-Speed DCT Acoustic Chamber
- **Interactive Machined Throttle Pedal:** Hold to pull through all **8 gears** with supersonic ignition-cut exhaust bangs (*DSG/DCT fart/pop*).
- **Terminal Top Speed:** Climbs smoothly all the way to **454 km/h** at 9,200 RPM with pure, steady high-load V12 howling (no artificial crackling when pinned at top speed).
- **Sequential Rev-Matched Downshifts:** Releasing the pedal initiates engine braking with deliberate, slower downshifts (~1.8s per gear), high-pitch throttle blips, and raw overrun popcorn crackles.
- **Mechanical Clutch "Tuck":** Exactly as the tachometer needle drops to **1 (1,000 RPM)** coming to rest, a crisp mechanical "tuck" disengages the transmission into Neutral (`N`) at 850 RPM resting idle.
- **F1 Steering Wheel LED Cluster:** Progresses through Green ➔ Red ➔ Cyan Flashing, with all 5 LEDs flashing white at the exact moment of each upshift snap.

### 4. Bespoke Showroom & Engineering Anatomy
- **Bespoke Showroom:** Interactive showcase for the *12Cilindri Black Badge*, *Daytona SP3 Nero Carbonio*, *812 Competizione Notte*, and *Purosangue Black Badge* with real-time finish selectors (*Nero Puro*, *Rosso Corsa Scuro*, *Carbonio Forgiato*, *Titanio Satinato*).
- **Engineering Dossier:** Deep-dive into titanium connecting rods (-40% inertia), DLC sliding finger followers, 350-bar GDI injection, and F#4 concert-pitch hydroformed Inconel manifolds.
- **Craftsmanship Gallery:** Macro details of bookmatched carbon weave, liquid dark chrome casting, and Tuscan Connolly leather.
- **Atelier Configurator Modal:** High-touch patron inquiry flow for bespoke commissions.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vite.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics:** [Three.js](https://threejs.org/)
- **Smooth Scrolling:** [Lenis](https://github.com/darkroomengineering/lenis)
- **Audio Synthesis:** Web Audio API (zero external audio file dependencies, zero latency, 100% offline & mobile-ready)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/starkayush/rev_matching.git
   cd rev_matching
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173/`

### Building for Production

```bash
npm run build
npm run preview
```

---

## 📄 License

MIT License. Designed & Developed for aesthetic and educational portfolio purposes.
