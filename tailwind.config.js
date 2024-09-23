/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors:{
        "dark-blue": "rgb(28,34,57,1)",
        "light-white": "rgba(255,255,255,0.17)",
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
      require('flowbite-react')
  ],
}

