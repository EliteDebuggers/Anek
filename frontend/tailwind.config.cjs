/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-yellow-400', 'text-black', 'bg-error', 'text-white', 'bg-forest-moss'
  ],
  theme: {
    extend: {
      colors: {
        // Dark forest green theme (for Homepage)
        forest: {
          deep: "#0b1f17",
          canvas: "#121412",
          moss: "#4f772d",
          leaf: "#90a955",
          gold: "#c5a059",
          slate: "#1a1c1a",
        },
        // Luminous / Brutalist theme mapping
        accent: {
          warning: "#f59e0b",
          critical: "#ef4444",
          info: "#3b82f6"
        },
        primary: "#468a5e",
        "on-primary": "#ffffff",
        "primary-container": "#FFD166", // Vibrant Yellow/Orange
        "on-primary-container": "#000000",
        secondary: "#516359",
        "on-secondary": "#ffffff",
        "secondary-container": "#06D6A0", // Vibrant Teal
        "on-secondary-container": "#000000",
        tertiary: "#3e6374",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#EF476F", // Vibrant Pink
        "on-tertiary-container": "#ffffff",
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#410002",
        background: "#f4f6f4",
        "on-background": "#191c1b",
        surface: "#f4f6f4",
        "on-surface": "#191c1b",
        "surface-variant": "#dae5df",
        "on-surface-variant": "#3f4944",
        outline: "#6f7974",
        "outline-variant": "#bfc9c3",
        "surface-container-lowest": "#f7f8f6",
        "surface-container-low": "#f2f4f3",
        "surface-container": "#eceee1",
        "surface-container-high": "#e6e9e6",
        "surface-container-highest": "#e1e3e0",
        "inverse-surface": "#2d312e",
        "inverse-on-surface": "#eff1ee",
        "surface-bright": "#f8faf9",
        "surface-dim": "#d8dada"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "xl": "64px",
        "md": "24px",
        "gutter": "20px",
        "margin": "24px",
        "xs": "8px",
        "base": "4px",
        "sm": "16px",
        "lg": "40px"
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Manrope", "sans-serif"],
        mono: ["Space Mono", "monospace"],
        cabin: ["Cabin Sketch", "cursive"]
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'progress-fill': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-target)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'progress-fill': 'progress-fill 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/container-queries'),
  ],
}
