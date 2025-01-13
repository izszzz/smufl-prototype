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
      sheet: "/src/models/sheet",
      musicxml: "/src/models/files/musicxml",
      soundfont2: "src/models/files/soundfont2",
    },
  },
});
