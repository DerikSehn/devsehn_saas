import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
import fontFamily from "./styles/fonts/fonts.json";
const svgToDataUri = require("mini-svg-data-uri");

const colors = {
  primary: {
    DEFAULT: "#4b5835",
    100: "#0f120b",
    200: "#1e2415",
    300: "#2e3620",
    400: "#3d472b",
    500: "#4b5835",
    600: "#738751",
    700: "#98ac75",
    800: "#bac8a3",
    900: "#dde3d1",
  },
  black: {
    DEFAULT: "#0d101b",
    100: "#030306",
    200: "#05070b",
    300: "#080a11",
    400: "#0b0d16",
    500: "#0d101b",
    600: "#2c365b",
    700: "#4a5c9a",
    800: "#808fc2",
    900: "#c0c7e1",
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
  gray: {
    DEFAULT: "#323834",
    100: "#0a0b0a",
    200: "#141715",
    300: "#1e221f",
    400: "#282d2a",
    500: "#323834",
    600: "#58635c",
    700: "#7f8d84",
    800: "#aab3ad",
    900: "#d4d9d6",
  },
};

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/onborda/dist/**/*.{js,ts,jsx,tsx}",
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
        pulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--pulse-color)" },
          "50%": { boxShadow: "0 0 0 8px var(--pulse-color)" },
        },
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        "modal-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "modal-fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "logo-carousel": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - 2rem))" },
        },
      },
      //Adjust duration as your needs
      animation: {
        marquee: "marquee var(--duration, 30s) linear infinite",
        pulse: "pulse var(--duration) ease-out infinite",
        "logo-carousel": "logo-carousel 16s linear infinite",
        "modal-fade-in": "modal-fade-in 500ms ease-out",
        "modal-fade-out": "modal-fade-out 500ms ease-in",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    addSvgToDataUri,
  ],
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

function addSvgToDataUri({ matchUtilities, theme }: any) {
  matchUtilities(
    {
      "bg-grid": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-grid-small": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-dot": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
        )}")`,
      }),
    },
    { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
  );
}
