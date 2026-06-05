import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, type Plugin } from "vite";

function projectDirectoryIndex(): Plugin {
  return {
    name: "project-directory-index",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url ?? "";
        if (/\/projects\/[^/?]+\/$/.test(url.split("?")[0] ?? "")) {
          req.url = `${url.replace(/\/$/, "")}/index.html`;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [sveltekit(), projectDirectoryIndex()],
  server: {
    port: 7213,
  },
  test: {
    include: ["src/**/*.unit.test.ts", "src/**/*.integration.test.ts"],
    environment: "jsdom",
  },
});
