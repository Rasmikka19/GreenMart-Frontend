/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Optional: Add custom grocery-themed colors
        brandGreen: '#16a34a', 
        brandDark: '#111827',
      },
    },
  },
  plugins: [],
}