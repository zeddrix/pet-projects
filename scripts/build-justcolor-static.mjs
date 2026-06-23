import { existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, resolve } from "node:path";
import { resolveJustcolorBasePath } from "./lib/archive-build-env.mjs";

const root = resolve(import.meta.dirname, "..");
const appDir = join(root, "projects/justcolor");
const basePath = resolveJustcolorBasePath();

if (!existsSync(appDir)) {
  console.error(`Missing justcolor source at ${appDir}`);
  process.exit(1);
}

console.log(`Building justcolor static preview with BASE_PATH=${basePath}`);
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
  console.error("justcolor build did not produce index.html");
  process.exit(1);
}

console.log("justcolor static preview build complete.");
