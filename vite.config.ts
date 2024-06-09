import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import sass from "sass";
import { defineConfig } from "vite";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Enable CSS Modules for all .scss files
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // define process env
  define: {
    "process.env": process.env,
  },
});
