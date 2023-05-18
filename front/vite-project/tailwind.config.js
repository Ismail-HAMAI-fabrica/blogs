/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
  "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  "./node_modules/tw-elements/dist/js/**/*.js"
],
  theme: {
    extend: {},
  },
  plugins: [
   
    require('tailwindcss'),
    require('autoprefixer'),
    require("tw-elements/dist/plugin.cjs")
  ],
}