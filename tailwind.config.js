/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rosso: {
          DEFAULT: '#E8001D',
          corsa: '#D40000',
          bright: '#FF2800',
          dark: '#8B0000',
          glow: 'rgba(232, 0, 29, 0.45)',
        },
        ferrari: {
          black: '#030303',
          onyx: '#08080A',
          graphite: '#111115',
          carbon: '#18181D',
          border: 'rgba(255, 255, 255, 0.08)',
          silver: '#C5C6C7',
          platinum: '#EAEAEA'
        }
      },
      fontFamily: {
        sans: ['Cinzel', 'Outfit', 'Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Syncopate', 'Montserrat', 'sans-serif'],
        serif: ['Italiana', 'Cinzel', 'serif']
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2.8s infinite ease-in-out',
        'glow-breathe': 'glowBreathe 3s infinite ease-in-out',
        'spin-slow': 'spin 24s linear infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        glowBreathe: {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(232, 0, 29, 0.3), inset 0 0 15px rgba(232, 0, 29, 0.2)',
            borderColor: 'rgba(232, 0, 29, 0.6)'
          },
          '50%': {
            boxShadow: '0 0 35px rgba(255, 40, 0, 0.7), 0 0 70px rgba(232, 0, 29, 0.35), inset 0 0 25px rgba(255, 40, 0, 0.4)',
            borderColor: 'rgba(255, 40, 0, 0.95)'
          }
        }
      }
    },
  },
  plugins: [],
}
