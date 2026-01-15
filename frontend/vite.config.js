import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizations } from "@tailus/themer";

// https://vite.dev/config/
export default defineConfig({
  darkMode: "class",
  plugins: [react(), tailwindcss(), visualizations],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
