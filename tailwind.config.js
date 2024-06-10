/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./shop.html",
    "./contact.html",
    "./product.html",
    "./about.hmtl",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      phone: "320px",
      tablet: "640px",
      laptop: "1600px",
      desktop: "1920px",
    },
    extend: {},
  },
  plugins: [],
}
