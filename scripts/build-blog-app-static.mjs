import { existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, resolve } from "node:path";
import { resolveBlogAppBasePath } from "./lib/archive-build-env.mjs";

const root = resolve(import.meta.dirname, "..");
const appDir = join(root, "projects/blog-app/sveltekit-static");
const basePath = resolveBlogAppBasePath();

if (!existsSync(appDir)) {
  console.error(`Missing blog app source at ${appDir}`);
  process.exit(1);
}

console.log(`Building blog-app static preview with BASE_PATH=${basePath}`);
execSync("npm ci", { cwd: appDir, stdio: "inherit" });
execSync("npm run build", {
  cwd: appDir,
  stdio: "inherit",
  env: {
    ...process.env,
    BASE_PATH: basePath,
  },
});

const buildDir = join(appDir, "build");
if (!existsSync(join(buildDir, "index.html"))) {
  console.error("blog-app build did not produce index.html");
  process.exit(1);
}

console.log("blog-app static preview build complete.");
