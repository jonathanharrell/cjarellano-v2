const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      pink: colors.pink
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        md: "3rem",
        lg: "4rem",
        xl: "5rem"
      }
    },
    fontFamily: {
      sans: ["Sharp Sans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
    },
    extend: {
      screens: {
        "xs": "480px"
      }
    }
  },
  variants: {
    extend: {
      backgroundImage: ["group-hover"]
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};
