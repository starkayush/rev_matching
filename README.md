# work still in process
# Rev Matching 🏎️

> A premium Ferrari Black Badge interactive experience built with React, Three.js & Web Audio API.

![Ferrari Rev Matching](https://img.shields.io/badge/Ferrari-Black%20Badge-cc0000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PC9zdmc+)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-r165-black?style=for-the-badge&logo=threedotjs)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)

---

## ✨ Features

- 🔊 **F1 8-Speed DCT Acoustic Chamber** — Real-time Web Audio API engine synthesis with:
  - Gearshift sounds on sustained throttle at high RPM
  - Raw pops & bangs on upshift/downshift
  - Natural engine tuck at idle (RPM ~1)
  - Gradual downshift with realistic timing
  - Crackling exhaust at top speed (454 km/h)
- 🚗 **8-Speed Gearbox Simulation** — Gear logic mapped from 0–454 km/h
- 🌐 **Interactive 3D V12 Engine** — Live Three.js model with animations
- 🎬 **Cinematic Intro Screen** — Push Start button with V12 engine logo
- 🏁 **Bespoke Showroom Section** — Full Ferrari Black Badge showcase
- 🔧 **Engineering Anatomy** — Interactive component breakdown
- 🤝 **Craftsmanship Details** — Hand-built V12 storytelling
- ⚙️ **Bespoke Configurator Modal** — Custom build experience
- 🌙 **Lenis Smooth Scroll** — Butter-smooth section transitions

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite 5 | Build tool & dev server |
| Three.js | 3D V12 engine visualization |
| Web Audio API | Real-time engine sound synthesis |
| Tailwind CSS | Styling |
| Lenis | Smooth scroll |
| Lucide React | Icons |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repo
git clone https://github.com/starkayush/rev_matching.git
cd rev_matching

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎮 How to Use

1. **Click "Push Start"** on the intro screen to fire up the V12
2. **Scroll down** to reach the Acoustic Chamber section
3. **Hold the pedal** — engine revs up, gears shift automatically
4. **Release the pedal** — hear the downshift pops, bangs & exhaust crackle
5. **Hit 454 km/h** — experience the top-speed acoustic signature

---

## 📁 Project Structure
