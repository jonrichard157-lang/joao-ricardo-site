import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // code splitting automático não é necessário para um site de uma
    // página só — um bundle único mantém o deploy simples.
    target: "es2020",
    cssCodeSplit: false,
    sourcemap: false,
  },
  server: {
    open: true,
  },
});
