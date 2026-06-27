import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07121F",      // fondo base (azul noche)
        carbon: "#0F2236",   // superficie / tarjeta
        surface: "#16304A",  // superficie elevada
        line: "#21405E",     // borde
        brand: "#2E7BD6",    // azul de marca (primario)
        accent: "#FF6A00",   // naranja: acción / alerta / puntos
        danger: "#FF453A",
        warning: "#F5A623",
        safe: "#22C55E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
