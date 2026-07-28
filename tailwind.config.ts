import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        wa: {
          green: "#25D366",
          dark: "#075E54",
        },
      },
    },
  },
  plugins: [],
};

export default config;
