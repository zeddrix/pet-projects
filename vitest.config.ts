import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: [
      "src/**/*.unit.test.ts",
      "src/**/*.integration.test.ts",
      "scripts/**/*.unit.test.ts",
    ],
    exclude: ["projects/**", "static/projects/**", "node_modules/**"],
    environment: "jsdom",
  },
});
