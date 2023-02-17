/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'tempbg': "url('../images/temp_bg.png')",
      })
    },
  },
  plugins: [],
}