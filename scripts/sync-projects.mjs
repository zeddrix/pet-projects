import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sourceDir = join(root, "projects");
const targetDir = join(root, "static", "projects");

if (!existsSync(sourceDir)) {
  mkdirSync(sourceDir, { recursive: true });
  console.log("Created empty projects/ directory");
  process.exit(0);
}

if (existsSync(targetDir)) {
  rmSync(targetDir, { recursive: true, force: true });
}

mkdirSync(targetDir, { recursive: true });

const entries = readdirSync(sourceDir, { withFileTypes: true }).filter(
  (entry) => entry.isDirectory() && entry.name !== "README.md",
);

for (const entry of entries) {
  const slug = entry.name;
  cpSync(join(sourceDir, slug), join(targetDir, slug), { recursive: true });
  console.log(`Synced projects/${slug} → static/projects/${slug}`);
}

console.log(`Synced ${entries.length} project folder(s)`);
