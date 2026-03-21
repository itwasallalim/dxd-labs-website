import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dxt-black": "#0a0a0a",
        "dxt-dark": "#111111",
        "dxt-darker": "#0d0d0d",
        "dxt-gray": "#1a1a1a",
        "dxt-gray-2": "#222222",
        "dxt-light": "#f5f5f0",
        "dxt-green": "#4ade80",
        "dxt-green-dim": "#22c55e",
        "dxt-muted": "#888888",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
