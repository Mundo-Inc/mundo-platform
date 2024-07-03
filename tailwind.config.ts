import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#9263F5",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      minHeight: {
        svh: "100svh",
        dvh: "100dvh",
      },
      height: {
        svh: "100svh",
        dvh: "100dvh",
      },
      maxHeight: {
        svh: "100svh",
        dvh: "100dvh",
      },
    },
  },
  plugins: [],
};
export default config;
