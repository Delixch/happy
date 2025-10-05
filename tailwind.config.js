/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          brown: '#5f3812',
          yellow: '#eac01a',
        },
      },
    },
  },
  plugins: [],
};
