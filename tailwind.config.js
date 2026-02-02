/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fira Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6BADDC',
          50: '#EBF5FF',
          100: '#C1D5E9',
          500: '#6BADDC',
          600: '#4AADEA',
          700: '#4AACEA',
          900: '#2871E9',
        },
        gray: {
          DEFAULT: '#75788B',
          50: '#F8FAFF',
          100: '#F3FBFF',
          400: '#7C818F',
          500: '#75788B',
          600: '#636363',
          700: '#4A5057',
        },
        status: {
          error: '#963131',
        },
      },
      boxShadow: {
        'custom': '0 0 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
