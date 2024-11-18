import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        accent: "#E54065",
        background: "#F4F5F9",
        border: "#CFD2DC",
        text: "#636363",
        filterBtn: "#E1E4EA",
        readBackground: "#F2F2F2",
      },
    },
  },
  plugins: [],
} satisfies Config;
