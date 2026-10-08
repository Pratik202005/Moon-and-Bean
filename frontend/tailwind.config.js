/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'moon-black': '#0B0A0A',
        'moon-dark': '#141211',
        'moon-card': '#1B1816',
        'moon-gold': '#C5A880',
        'moon-amber': '#E5A853',
        'moon-cream': '#F3EEEA',
        'moon-muted': '#8E8780',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
