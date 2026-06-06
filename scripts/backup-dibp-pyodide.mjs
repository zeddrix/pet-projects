#!/usr/bin/env node
import { relative, resolve } from "node:path";
import { backupProjectImages } from "./lib/tar-gzip-dir.mjs";

const root = resolve(import.meta.dirname, "..");
const vendorDir = resolve(
  root,
  "projects/diamond-in-black-pearl/vendor/pyodide",
);
const backupDir = resolve(root, "scripts/image-backups");

try {
  const result = await backupProjectImages(
    vendorDir,
    backupDir,
    "dibp-pyodide",
  );
  console.log(
    `Backed up DIBP Pyodide vendor to ${relative(root, result.archivePath)} (${(result.size / 1024 / 1024).toFixed(2)} MB)`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
