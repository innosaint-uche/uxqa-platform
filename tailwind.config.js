/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '0px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae2',
          300: '#b0baca',
          400: '#8494ad',
          500: '#637392',
          600: '#4e5c78',
          700: '#3f4a62',
          800: '#363e52',
          900: '#1e232e',
          950: '#0c0e12',
        },
        swiss: {
          black: '#0a0a0c',
          card: '#111215',
          border: '#22242a',
          muted: '#8b909a',
          red: '#e53e3e',
          accent: '#2563eb',
          emerald: '#10b981',
          amber: '#f59e0b',
        }
      }
    },
  },
  plugins: [],
}
