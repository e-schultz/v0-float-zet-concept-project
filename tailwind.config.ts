import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom theme colors
        neon: {
          pink: "#ff69b4",
          cyan: "#00ffff",
          green: "#39ff14",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        glitch: {
          "0%": {
            textShadow:
              "0.05em 0 0 rgba(255, 105, 180, 0.75), -0.05em -0.025em 0 rgba(0, 255, 255, 0.75), -0.025em 0.05em 0 rgba(57, 255, 20, 0.75)",
          },
          "14%": {
            textShadow:
              "0.05em 0 0 rgba(255, 105, 180, 0.75), -0.05em -0.025em 0 rgba(0, 255, 255, 0.75), -0.025em 0.05em 0 rgba(57, 255, 20, 0.75)",
          },
          "15%": {
            textShadow:
              "-0.05em -0.025em 0 rgba(255, 105, 180, 0.75), 0.025em 0.025em 0 rgba(0, 255, 255, 0.75), -0.05em -0.05em 0 rgba(57, 255, 20, 0.75)",
          },
          "49%": {
            textShadow:
              "-0.05em -0.025em 0 rgba(255, 105, 180, 0.75), 0.025em 0.025em 0 rgba(0, 255, 255, 0.75), -0.05em -0.05em 0 rgba(57, 255, 20, 0.75)",
          },
          "50%": {
            textShadow:
              "0.025em 0.05em 0 rgba(255, 105, 180, 0.75), 0.05em 0 0 rgba(0, 255, 255, 0.75), 0 -0.05em 0 rgba(57, 255, 20, 0.75)",
          },
          "99%": {
            textShadow:
              "0.025em 0.05em 0 rgba(255, 105, 180, 0.75), 0.05em 0 0 rgba(0, 255, 255, 0.75), 0 -0.05em 0 rgba(57, 255, 20, 0.75)",
          },
          "100%": {
            textShadow:
              "-0.025em 0 0 rgba(255, 105, 180, 0.75), -0.025em -0.025em 0 rgba(0, 255, 255, 0.75), -0.025em -0.05em 0 rgba(57, 255, 20, 0.75)",
          },
        },
        scanline: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glitch: "glitch 2s infinite",
        scanline: "scanline 8s linear infinite",
        blink: "blink 1s steps(1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
