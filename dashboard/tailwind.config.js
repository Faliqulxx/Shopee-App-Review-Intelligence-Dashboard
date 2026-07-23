/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shopee: {
          orange: '#EE4D2D',
          lightOrange: '#FF5722',
          darkOrange: '#C43618',
          bg: '#0F172A',
          card: '#1E293B',
          cardBorder: '#334155',
          textMuted: '#94A3B8',
          accentGreen: '#10B981',
          accentRed: '#EF4444',
          accentYellow: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
