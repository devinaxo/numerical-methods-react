/** @type {import('tailwindcss').Config} */
import { keepTheme } from "keep-react/keepTheme";
const config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        titulo: ['Montserrat', 'sans-serif'],
        parrafo: ['Raleway', 'sans-serif'],
      },
      animation: {
        pingOnce: 'pingOnce 1s ease-in-out',
        fadeIn: 'fadeIn 0.15s ease-in-out forwards',
      },
      keyframes: {
        pingOnce: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0' },
          '75%': { transform: 'scale(2)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }
  ],
};

export default keepTheme(config);