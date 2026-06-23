import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const rawBasePath = process.env.BASE_PATH ?? "";
const base =
  rawBasePath === "" || rawBasePath === "/"
    ? ""
    : rawBasePath.startsWith("/")
      ? rawBasePath.replace(/\/$/, "")
      : `/${rawBasePath.replace(/\/$/, "")}`;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    paths: {
      base,
    },
    appDir: "internal",
    alias: {
      $utils: "src/utils",
      "$utils/*": "src/utils/*",
      $components: "src/components",
      "$components/*": "src/components/*",
    },
  },
};

export default config;
