/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        carbone: {
          900: "#1f252b",
          950: "#14181d"
        },
        ceniza: {
          100: "#f4f6f8",
          200: "#e8ecef",
          300: "#d7dee4",
          500: "#8f9aa6"
        },
        fumo: {
          50: "#f9fafb",
          100: "#f1f3f5"
        },
        ciano: {
          400: "#67d8f2",
          500: "#3dc9ea",
          700: "#1996b6"
        }
      },
      fontFamily: {
        titolo: ["Cormorant Garamond", "serif"],
        corpo: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        morbida: "0 20px 45px -30px rgba(20, 24, 29, 0.45)"
      }
    }
  },
  plugins: []
};
