import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#FFFFFF",
        "ink-deep": "#0A0A0A",
        paper: "#F4F3EF",
        "paper-dim": "#6B6B67",
        white: "#FFFFFF",
        line: "rgba(17,17,17,0.14)",
        "line-dark": "rgba(244,243,239,0.16)",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        sharp: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
