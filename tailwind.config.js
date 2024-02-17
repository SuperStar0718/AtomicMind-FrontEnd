// TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,ts, tsx,js}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  plugins: [require("tw-elements-react/dist/plugin.cjs"), require('flowbite/plugin')],
  darkMode: "class"
};
