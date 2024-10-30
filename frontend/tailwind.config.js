/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/preline/preline.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#545C75',
          light: '#999BA6',
          lightest: '#EBEFF3'
        },
        secondary: {
          DEFAULT: '#6E62E5',
          light: '#e1defe'
        },
        accent: {
          DEFAULT: '#23C35E',
          light: '#b9f6ce'
        },
        warning: {
          DEFAULT: '#FD6365',
          light: '#FFE3E3'
        },
      }
    },
  },
  plugins: [
    // require('preline/plugin'),
    require('daisyui')
  ],
}

