import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, type Plugin } from "vite";

function projectDirectoryIndex(): Plugin {
  return {
    name: "project-directory-index",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url ?? "";
        const pathOnly = url.split("?")[0] ?? "";
        const query = url.includes("?") ? url.slice(url.indexOf("?")) : "";

        if (!pathOnly.endsWith("/")) {
          next();
          return;
        }

        const isProjectRoot = /\/projects\/[^/?]+\/$/.test(pathOnly);
        const isProjectNested = /\/projects\/[^/?]+\/.+\/$/.test(pathOnly);

        if (isProjectRoot || isProjectNested) {
          req.url = `${pathOnly.replace(/\/$/, "")}/index.html${query}`;
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
    include: [
      "src/**/*.unit.test.ts",
      "src/**/*.integration.test.ts",
      "scripts/**/*.unit.test.ts",
    ],
    environment: "jsdom",
  },
});
