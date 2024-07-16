import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
import fontFamily from "./styles/fonts/fonts.json";

const colors = {
  black: {
    DEFAULT: "#000601",
    100: "#000100",
    200: "#000200",
    300: "#000301",
    400: "#000401",
    500: "#000601",
    600: "#006a12",
    700: "#00cf23",
    800: "#35ff57",
    900: "#9affab",
  },
  jet: {
    DEFAULT: "#342d2a",
    100: "#0a0908",
    200: "#141210",
    300: "#1f1a19",
    400: "#292321",
    500: "#342d2a",
    600: "#61544e",
    700: "#8f7c74",
    800: "#b5a8a2",
    900: "#dad3d1",
  },
  ebony: {
    DEFAULT: "#5b5d4d",
    100: "#12120f",
    200: "#24251f",
    300: "#36372e",
    400: "#48493d",
    500: "#5b5d4d",
    600: "#7e816c",
    700: "#a0a28f",
    800: "#bfc1b5",
    900: "#dfe0da",
  },
  white: {
    DEFAULT: "#ffffff",
    100: "#333333",
    200: "#666666",
    300: "#999999",
    400: "#cccccc",
    500: "#ffffff",
    600: "#ffffff",
    700: "#ffffff",
    800: "#ffffff",
    900: "#ffffff",
  },
  primary: {
    DEFAULT: "#31562b",
    100: "#0a1109",
    200: "#132211",
    300: "#1d331a",
    400: "#274422",
    500: "#31562b",
    600: "#4d8844",
    700: "#70b266",
    800: "#a0cc99",
    900: "#cfe5cc",
  },
  secondary: {
    DEFAULT: "#64ea58",
    100: "#0b3907",
    200: "#16720e",
    300: "#22ac15",
    400: "#2ee31e",
    500: "#64ea58",
    600: "#82ee79",
    700: "#a2f39a",
    800: "#c1f7bc",
    900: "#e0fbdd",
  },
};

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily,

      colors,
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "logo-carousel": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - 2rem))" },
        },
      },
      //Adjust duration as your needs
      animation: {
        "logo-carousel": "logo-carousel 16s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
};
export default config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
