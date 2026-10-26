import { resolve } from "node:path";
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
    // Site principal + landing pages demonstrativas (cada uma com seu HTML).
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        vetra: resolve(import.meta.dirname, "demos/vetra-academia/index.html"),
        nativa: resolve(import.meta.dirname, "demos/nativa-casa/index.html"),
      },
    },
  },
});
