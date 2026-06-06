import { createWriteStream, existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { pipeline } from "node:stream/promises";

const PYODIDE_VERSION = "0.26.4";
const CDN_BASE = `https://cdn.jsdelivr.net/pyodide/v0.26.4/full/`;
const root = resolve(import.meta.dirname, "..");
const vendorDir = join(
  root,
  "projects",
  "diamond-in-black-pearl",
  "vendor",
  "pyodide",
);

/** Minimal files required for stdlib Python in Pyodide. */
const PYODIDE_FILES = [
  "pyodide.js",
  "pyodide.asm.js",
  "pyodide.asm.wasm",
  "python_stdlib.zip",
  "pyodide-lock.json",
];

/** @param {string} filename */
async function downloadFile(filename) {
  const targetPath = join(vendorDir, filename);
  if (existsSync(targetPath)) {
    return;
  }

  const response = await fetch(`${CDN_BASE}${filename}`);
  if (!response.ok) {
    throw new Error(
      `Failed to download Pyodide ${filename}: ${response.status} ${response.statusText}`,
    );
  }

  if (!response.body) {
    throw new Error(`Empty response body for Pyodide ${filename}`);
  }

  await pipeline(response.body, createWriteStream(targetPath));
}

async function main() {
  mkdirSync(vendorDir, { recursive: true });

  for (const filename of PYODIDE_FILES) {
    process.stdout.write(`Syncing Pyodide ${filename}…\n`);
    await downloadFile(filename);
  }

  process.stdout.write(
    `Pyodide v${PYODIDE_VERSION} vendor ready at projects/diamond-in-black-pearl/vendor/pyodide/\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
