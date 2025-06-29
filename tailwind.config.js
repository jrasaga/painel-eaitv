/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',  // permite alternar tema via classe "dark" no HTML
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};