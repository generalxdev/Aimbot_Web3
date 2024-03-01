/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {},
    screens: {
      "_sm": {
        max: "840px",
      },
      "_md": {
        max: "1020px",
      },
      "_lg": {
        max: "1440px",
      },
      "sm": {
        min: "840px",
      },
      "md": {
        min: "1020px",
      },
      "lg": {
        min: "1440px",
      },
    } 
  },
  plugins: [],
}
