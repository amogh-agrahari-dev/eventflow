/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Manrope"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        /* Dashboard design-system tokens */
        vol: {
          bg: "#06090F",
          card: "#0F1319",
          border: "#1C2333",
          accent: "#6E56CF",
          accent2: "#00E5FF",
          success: "#22C55E",
          warning: "#F59E0B",
        },
      },
      borderRadius: {
        lg: "0.625rem",
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(145deg, hsl(203 45% 20%) 0%, hsl(214 45% 15%) 55%, hsl(230 40% 11%) 100%)",
        "gradient-hero":
          "radial-gradient(ellipse at top left, rgba(56, 189, 248, 0.15), transparent 50%), radial-gradient(ellipse at bottom right, rgba(99, 102, 241, 0.15), transparent 50%)",
        "gradient-accent":
          "linear-gradient(135deg, hsl(191 91% 55%) 0%, hsl(217 91% 60%) 100%)",
        "gradient-card-hover":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
      },
      boxShadow: {
        elevated: "0 18px 40px -18px hsl(214 45% 15% / 0.55)",
        glow: "0 0 25px -5px rgba(56, 189, 248, 0.3)",
        "glow-lg": "0 0 40px -10px rgba(99, 102, 241, 0.4)",
        "glow-accent": "0 0 30px -5px rgba(110, 86, 207, 0.35)",
        "glow-cyan": "0 0 25px -5px rgba(0, 229, 255, 0.25)",
        "card-hover": "0 20px 30px -10px rgba(0, 0, 0, 0.08), 0 10px 15px -5px rgba(0, 0, 0, 0.04)",
        "card-lift": "0 25px 50px -15px rgba(0, 0, 0, 0.6), 0 0 20px -5px rgba(110, 86, 207, 0.15)",
      },
      keyframes: {
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-2.5rem)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(0.75rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(1.25rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(2rem)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "grid-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 8px rgba(34, 197, 94, 0.6)" },
          "50%": { opacity: "0.6", boxShadow: "0 0 16px rgba(34, 197, 94, 0.9)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(0.5rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.85)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "badge-shine": {
          "0%": { left: "-100%" },
          "100%": { left: "200%" },
        },
      },
      animation: {
        "slide-in-left": "slide-in-left 0.75s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-right": "slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "grid-in": "grid-in 1.4s ease-out both",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "count-up": "count-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};
