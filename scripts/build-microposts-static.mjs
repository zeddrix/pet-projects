import { cpSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const appDir = join(root, "projects/microposts/updated-static");
const publicPath =
  process.env.PUBLIC_PATH ?? "/pet-projects/projects/microposts/";

if (!existsSync(appDir)) {
  console.error(`Missing microposts source at ${appDir}`);
  process.exit(1);
}

console.log(
  `Building microposts static preview with PUBLIC_PATH=${publicPath}`,
);
execSync("npm ci", { cwd: appDir, stdio: "inherit" });
execSync("npm run build", {
  cwd: appDir,
  stdio: "inherit",
  env: {
    ...process.env,
    PUBLIC_PATH: publicPath,
    NODE_OPTIONS: "--openssl-legacy-provider",
  },
});

const distDir = join(appDir, "dist");
if (!existsSync(join(distDir, "app.bundle.js"))) {
  console.error("microposts build did not produce dist/app.bundle.js");
  process.exit(1);
}

cpSync(join(appDir, "index.html"), join(distDir, "index.html"));
cpSync(join(appDir, "assets"), join(distDir, "assets"), { recursive: true });

console.log("microposts static preview build complete.");
