/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        realworld: {
          green: '#5CB85C',
          darkGreen: '#3d8b3d',
          red: '#B85C5C',
        },
      },
      fontFamily: {
        montserrat: [['Montserrat', 'sans-serif']],
      },
      spacing: {
        navItem: '0.425rem',
      },
      fontSize: {
        logo: '3.5rem',
        date: '0.8rem',
      },
      borderRadius: {
        buttonSm: '0.2rem',
        tag: '10rem',
      },
      opacity: {
        15: '0.15',
      },
    },
  },
  plugins: [],
};
