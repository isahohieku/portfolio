/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#212529',
        'primary-yellow': '#fbd700',
        'gray-custom': '#979797',
        'gray-light': '#555',
        'gray-border': '#e0e0e0',
        'footer-bg': '#f7f7f7',
        'resume-bg': '#e4e4e4',
        'dark-bg': '#1b1b1b',
        'dark-gradient': '#0e0e0e',
        'project-bg': '#191919',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'lato': ['Lato', 'sans-serif'],
        'pacifico': ['Pacifico', 'cursive'],
      },
      fontSize: {
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '7.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
        '150': '37.5rem',
      },
      maxWidth: {
        '75rem': '75rem',
        '1000px': '1000px',
      },
      height: {
        '25rem': '25rem',
        '30rem': '30rem',
      },
      width: {
        '25rem': '25rem',
        '30rem': '30rem',
      },
      boxShadow: {
        'custom': '0 0 20px rgba(29, 29, 29, 0.3)',
        'menu': '-5px 5px 25px rgba(0, 0, 0, 0.35)',
        'drop': '0px 10px 4px rgba(28, 28, 28, 0.2)',
      },
      animation: {
        'hover-scale': 'hover-scale 0.3s ease',
      },
      keyframes: {
        'hover-scale': {
          '0%': { transform: 'scale(1) translateY(0)' },
          '100%': { transform: 'scale(1.1) translateY(-2px)' },
        }
      }
    },
  },
  plugins: [],
}

