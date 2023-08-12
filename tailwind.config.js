/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "975px",
        lg: "1440px",
      },
      colors: {
        "Dark-Blue": "hsl(209, 23%, 22%)",
        "Very-Dark-Blue": "hsl(207, 26%, 17%)",
        "Dark-Gray": "hsl(0, 0%, 52%)",
        "White": "hsl(0, 0%, 100%)",
      },
      backgroundColor: {
        "Dark-Mode-Background": "hsl(200, 15%, 8%)",
        "Light-Mode-Background": "hsl(0, 0%, 98%)",
      },
      fontSize: {
        "Homepage-Items": "14px",
        "Detail-Page": "16px",
      },

      fontWeight: {
        normal: 300,
        medium: 600,
        bold: 800,
      },
    },
  },
  plugins: [],
}
