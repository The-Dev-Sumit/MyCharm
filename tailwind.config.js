/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'], 
        Lemon: ['Lemon', 'sans-serif'],
        Quile: ['DM Serif Text', 'serif'],
      },
    },
    screens: {
      sm: '640px',  // Small screens and up
      md: '768px',  // Medium screens and up
      lg: '1024px', // Large screens and up
      xl: '1280px', // Extra-large screens and up
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

