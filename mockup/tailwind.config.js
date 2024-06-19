/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./shop.html",
    "./contact.html",
    "./product.html",
    "./about.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      phone: "320px",
      tablet: "640px",
      laptop: "1400px",
      desktop: "1920px",
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },
    extend: {},
  },
  plugins: [],
}
