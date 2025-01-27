/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'dark-mode',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')],
};
