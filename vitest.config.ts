/* eslint-disable no-undef */

import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@airaga/fonts": resolve(__dirname, "./types/fonts"),
      "@airaga/items": resolve(__dirname, "./types/items"),
    }
  },
  test: {
    alias: {
      "@/": new URL('./src/', import.meta.url).pathname,
    },
    coverage: {
      reporter: ["html", "text"],
    },
    environment: "node",
    globals: true,
    mockReset: true,
  },
});