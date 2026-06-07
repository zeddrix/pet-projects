#!/usr/bin/env node
/**
 * Report leftover raster sources that should have been converted to WebP.
 * Exits 1 if unexpected JPG/PNG/GIF remain (excluding documented exceptions).
 */
import { readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const projectsRoot = join(root, "projects");

/** Relative paths allowed to keep legacy raster formats. */
const ALLOWLIST = new Set([
  "diamond-in-black-pearl/assets/scenes/00-style-reference.jpg",
]);

/** @param {string} dir @param {string[]} found */
function walk(dir, found) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.name === "node_modules" ||
      entry.name === "vendor" ||
      entry.name === ".svelte-kit" ||
      entry.name === "build"
    ) {
      continue;
    }
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, found);
      continue;
    }
    if (/\.(jpe?g|png|gif)$/i.test(entry.name)) {
      found.push(relative(projectsRoot, fullPath));
    }
  }
}

/** @type {string[]} */
const leftovers = [];
walk(projectsRoot, leftovers);

const unexpected = leftovers.filter((path) => !ALLOWLIST.has(path));

if (unexpected.length > 0) {
  process.stderr.write("Unexpected raster files (expected WebP only):\n");
  for (const path of unexpected) {
    process.stderr.write(`  - projects/${path}\n`);
  }
  process.exit(1);
}

process.stdout.write(
  `Raster audit OK (${leftovers.length} allowlisted legacy file(s), ${unexpected.length} unexpected).\n`,
);
