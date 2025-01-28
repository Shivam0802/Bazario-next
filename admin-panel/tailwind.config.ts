import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "montserrat": "var(--font-montserrat)",
      }, 

      fontSize: {
        thin : "100",
        light : "400",
        normal : "500",
        medium : "600",
        semibold : "700",
        bold : "700",
        extrabold : "800",
        black : "900",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      backgroundImage: {
        custom_gradient: 'linear-gradient(177.8deg, rgb(0 0 0 / 13%) 44.38%, rgb(0 0 0 / 77%) 57.76%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
