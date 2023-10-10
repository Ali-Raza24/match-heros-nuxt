/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./pages/**/*.{html,js,vue}"
    './pages/**/*.{html,js,vue}',
    './components/**/*.{html,js,vue}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      
      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '992px',
      // => @media (min-width: 992px) { ... }

      'xl': '1200px',
      // => @media (min-width: 1200px) { ... }

      '2xl': '1480px',
      // => @media (min-width: 1480px) { ... }
    },
    extend: {},
  },
  plugins: [],
  variants: {
    display: ['responsive'],
  },
}

