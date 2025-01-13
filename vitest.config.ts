import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom", // or 'node', 'jsdom'
    setupFiles: "./vitest.setup.ts",
  },
  resolve: {
    alias: {
      core: "/src/models/core",
      smufl: "/src/models/smufl",
      mxl: "/src/models/files/mxl",
      sheet: "/src/models/sheet",
    },
  },
});
