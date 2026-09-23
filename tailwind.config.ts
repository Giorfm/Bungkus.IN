/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2A6B5C",
          dark: "#1D4B40",
          soft: "#E6FFF8",
          tint: "#F3FFFC",
        },
        star: "#F9BD22",
        canvas: "#F8F9FF",
        primary: {
          DEFAULT: "#16A34A",
          dark: "#0F7A38",
          soft: "#E7F6EC",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#FF7A1A",
          foreground: "#FFFFFF",
        },
        bg: "#F8F9FF",
        surface: "#FFFFFF",
        border: "#ECEDEF",
        text: {
          DEFAULT: "#121C2A",
          muted: "#584237",
          subtle: "#8C7164",
          dark: "#123F36",
        },
        danger: "#E11D48",
        warning: {
          DEFAULT: "#F59E0B",
          bg: "#FFF4E5",
        },
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-md": "0 4px 12px rgba(0,0,0,0.08)",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        phone: "430px",
      },
    },
  },
  plugins: [],
}
