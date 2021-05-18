const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    content: ["./pages/**/*.js", "./components/**/*.js"],
    options: {
      safelist: ["text-magenta", "text-cyan", "text-yellow", "text-red"]
    }
  },
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      magenta: {
        DEFAULT: "#f0f"
      },
      cyan: {
        DEFAULT: "#0ff"
      },
      yellow: {
        DEFAULT: "#f8e61b"
      },
      red: {
        DEFAULT: "#DC2626"
      }
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
      backgroundImage: ["group-hover"],
      ringColor: ["focus-visible"],
      ringOffsetColor: ["focus-visible"],
      ringOffsetWidth: ["focus-visible"],
      ringOpacity: ["focus-visible"],
      ringWidth: ["focus-visible"]
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};
