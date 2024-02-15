import { defineConfig } from "vite";
import tsConfig from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfig()],
});
