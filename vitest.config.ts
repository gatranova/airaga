import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@airaga/fonts": resolve(__dirname, "./types/fonts"),
      "@core": resolve(__dirname, "packages/cli/core"),
      "@helpers": resolve(__dirname, "packages/cli/helpers"),
      "@constants": resolve(__dirname, "packages/cli/constants"),
      "@interfaces": resolve(__dirname, "packages/cli/interfaces"),
    },
  },
  test: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
    coverage: {
      reporter: ["html", "text"],
    },
    environment: "node",
    globals: true,
    mockReset: true,
  },
});