import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0B0B0D",
        line: "rgba(255,255,255,0.08)",
        ink: "#EDEDED",
        muted: "#8A8A93",
        blue: "#5B8CFF",
        purple: "#A855F7",
        cyan: "#22D3EE",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grad-primary": "linear-gradient(135deg, #5B8CFF 0%, #A855F7 50%, #22D3EE 100%)",
        "grad-radial": "radial-gradient(circle at 50% 0%, rgba(91,140,255,0.15), transparent 60%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.45)",
        glow: "0 0 40px rgba(91,140,255,0.35)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "spin-slow": "spin 24s linear infinite",
        "spin-slow-rev": "spin-rev 30s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-rev": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
