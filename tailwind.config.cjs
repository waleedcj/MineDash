/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'mining-dark': '#1a1b26',
          'mining-light-blue': '#41a8e1',
          'mining-green': '#1abc9c',
          'mining-red': '#e74c3c',
          'mining-yellow': '#f1c40f',
          'mining-gray': '#2c3e50',
          'mining-light-gray': '#34495e',
        },
        fontFamily: {
          'sans': ['Roboto Mono', 'monospace'],
        }
      },
    },
    plugins: [],
  }