/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'magic-flash': {
          '0%, 100%': { 'box-shadow': '0 0 0 0 rgba(192, 132, 252, 0)' },
          '50%': { 'box-shadow': '0 0 15px 5px rgba(192, 132, 252, 0.7)' },
        }
      },
      animation: {
        'magic-flash': 'magic-flash 1s ease-in-out',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

