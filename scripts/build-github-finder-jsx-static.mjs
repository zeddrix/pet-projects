import { cpSync, existsSync, rmSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { cra4NodeVersionError } from "./lib/archive-build-env.mjs";

const scriptDir = fileURLToPath(new URL(".", import.meta.url));
const root = resolve(scriptDir, "..");
const appDir = join(root, "projects/github-finder-jsx");
const buildDir = join(appDir, "build");

const ROOT_ARTIFACTS = [
  "index.html",
  "asset-manifest.json",
  "favicon.ico",
  "manifest.json",
  "robots.txt",
];

if (!existsSync(appDir)) {
  console.error(`Missing github-finder-jsx at ${appDir}`);
  process.exit(1);
}

const nodeError = cra4NodeVersionError();
if (nodeError) {
  console.error(nodeError);
  process.exit(1);
}

console.log("Installing github-finder-jsx dependencies…");
execSync("npm ci", { cwd: appDir, stdio: "inherit" });

console.log("Building github-finder-jsx with Node 16 (CRA 4 toolchain)…");
execSync("npm run build", {
  cwd: appDir,
  stdio: "inherit",
  env: {
    ...process.env,
    SKIP_PREFLIGHT_CHECK: "true",
    CI: "false",
  },
});

if (!existsSync(join(buildDir, "index.html"))) {
  console.error("github-finder-jsx build did not produce index.html");
  process.exit(1);
}

if (existsSync(join(appDir, "static"))) {
  rmSync(join(appDir, "static"), { recursive: true, force: true });
}

for (const name of ROOT_ARTIFACTS) {
  cpSync(join(buildDir, name), join(appDir, name), { force: true });
}

cpSync(join(buildDir, "static"), join(appDir, "static"), { recursive: true });

console.log("github-finder-jsx static bundle updated from CRA build.");
