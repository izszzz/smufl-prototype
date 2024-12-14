import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      core: "/src/models/core",
      smufl: "/src/models/tsmufl",
      mxl: "/src/models/files/mxl",
    },
  },
});
