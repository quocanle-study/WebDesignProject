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
      'phone': '200px',
      'tablet': '1024px',
      'laptop': '1440px',
      'desktop': '2560px',
    },
    extend: {},
  },
  plugins: [],
}
