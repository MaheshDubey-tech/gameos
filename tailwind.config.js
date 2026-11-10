/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          navy: "#0F1D38",
          navyLight: "#1B2A4A",
          steel: "#2D3E5E",
          gold: "#C5A880",
          goldLight: "#DFCEB4",
          goldDark: "#9A7C52",
          champagne: "#F7F3EE",
          porcelain: "#F2F5F9",
          slate: "#475569",
          border: "rgba(15, 29, 56, 0.08)",
        }
      },
      boxShadow: {
        // Classic Light Claymorphism
        'clay': '10px 14px 26px rgba(166, 180, 200, 0.55), -8px -8px 20px rgba(255, 255, 255, 0.95), inset 2px 2px 3px rgba(255, 255, 255, 0.8), inset -3px -3px 6px rgba(166, 180, 200, 0.35)',
        'clay-hover': '14px 20px 32px rgba(166, 180, 200, 0.65), -10px -10px 24px rgba(255, 255, 255, 1), inset 2px 2px 4px rgba(255, 255, 255, 0.9), inset -4px -4px 8px rgba(166, 180, 200, 0.4)',
        'clay-sm': '6px 8px 16px rgba(166, 180, 200, 0.45), -5px -5px 12px rgba(255, 255, 255, 0.9), inset 1.5px 1.5px 2px rgba(255, 255, 255, 0.7), inset -2px -2px 4px rgba(166, 180, 200, 0.3)',
        'clay-inset': 'inset 4px 4px 8px rgba(166, 180, 200, 0.6), inset -3px -3px 6px rgba(255, 255, 255, 0.95)',
        'clay-btn-navy': '0 8px 18px rgba(15, 29, 56, 0.28), inset 2px 2px 3px rgba(255, 255, 255, 0.25), inset -2px -2px 5px rgba(0, 0, 0, 0.35)',
        'clay-btn-gold': '0 8px 18px rgba(197, 168, 128, 0.35), inset 2px 2px 3px rgba(255, 255, 255, 0.6), inset -2px -2px 5px rgba(154, 124, 82, 0.4)',
        'clay-btn-white': '5px 7px 15px rgba(166, 180, 200, 0.45), -4px -4px 10px rgba(255, 255, 255, 0.9), inset 2px 2px 3px rgba(255, 255, 255, 0.8), inset -2px -2px 4px rgba(166, 180, 200, 0.3)',
      },
      borderRadius: {
        'clay': '24px',
        'clay-lg': '32px',
        'clay-xl': '40px',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'sway': 'sway 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-1deg)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(2.5deg)' },
        }
      }
    },
  },
  plugins: [],
}
