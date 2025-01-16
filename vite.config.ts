import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      core: "/src/models/core",
      smufl: "/src/models/smufl",
      sheet: "/src/models/sheet",
      musicxml: "/src/models/files/musicxml",
      soundfont2: "/src/models/files/soundfont2",
    },
  },
});
