import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom", // or 'node', 'jsdom'
    setupFiles: "./vitest.setup.ts",
  },
});
