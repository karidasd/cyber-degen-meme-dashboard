/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#060814',
          card: 'rgba(11, 16, 38, 0.75)',
          border: 'rgba(0, 240, 255, 0.2)',
          cyan: '#00f0ff',
          neon: '#00ff66',
          danger: '#ff0055',
          gold: '#ffd700',
          purple: '#b026ff',
          text: '#e2e8f0',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(0, 240, 255, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.8))' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
