import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // "/" na Vercel; o workflow do GitHub Pages define BASE_PATH=/joao-ricardo-site/
  base: process.env.BASE_PATH ?? "/",
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    sourcemap: false,
  },
});
