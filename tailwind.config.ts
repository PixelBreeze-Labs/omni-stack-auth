// tailwind.config.ts
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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2A8E9E",
        "primary-dark": "#247A87",
        text: {
          primary: "#171717",
          secondary: "#404040",
          muted: "#737373",
        },
      },
    },
  },
  plugins: [],
};

export default config;