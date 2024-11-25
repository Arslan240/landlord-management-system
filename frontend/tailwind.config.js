/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        card: "1.25rem",
      },
      colors: {
        primary: {
          DEFAULT: "#545C75",
          light: "#999BA6",
          lightest: "#EBEFF3",
          hover: "#d9d9dc",
          hoverlight: "#f8fafc",
          backg: "#f9fafb",
        },
        secondary: {
          DEFAULT: "#6E62E5",
          bright: "#3730a3",
          light: "#bfb8ff",
          lightest: "#e1defe",
        },
        accent: {
          DEFAULT: "#23C35E",
          light: "#d2f9e0",
        },
        warning: {
          DEFAULT: "#FD6365",
          light: "#FFE3E3",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#545C75",
          secondary: "#6E62E5",
          accent: "#23C35E",
          warning: "#FD6365",
        },
      },
      "winter",
      "dracula",
    ],
  },
}
