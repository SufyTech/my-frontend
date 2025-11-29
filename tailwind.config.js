/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED", // Main violet
        secondary: "#3B82F6", // Blue accent
        accent: "#F59E0B", // Highlights like demo badges
        surface: {
          dark: "#111827", // Dark backgrounds
          light: "#1F2937", // Slightly lighter surfaces
        },
        text: {
          primary: "#F9FAFB", // White text
          "secondary-dark": "#9CA3AF", // Subtle secondary
          accent: "#FBBF24", // Yellowish accent
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },
      boxShadow: {
        card: "0 10px 25px rgba(124, 58, 237, 0.2)",
        "card-lg": "0 25px 50px rgba(124, 58, 237, 0.3)",
        glow: "0 0 20px rgba(124, 58, 237, 0.5)",
        "inner-glow": "inset 0 0 15px rgba(124, 58, 237, 0.2)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": "bounce 2s infinite",
        "ping-slow": "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "fade-up": "fadeUp 0.8s ease forwards",
        "pulse-slow": "pulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px #7C3AED, 0 0 10px #3B82F6" },
          "50%": { boxShadow: "0 0 15px #7C3AED, 0 0 25px #3B82F6" },
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
        "gradient-accent": "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
        "gradient-dark": "linear-gradient(135deg, #111827 0%, #1F2937 100%)",
      },
    },
  },
  plugins: [],
};
