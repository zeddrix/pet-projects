#!/usr/bin/env node
import { relative, resolve } from "node:path";
import { backupProjectImages } from "./lib/tar-gzip-dir.mjs";

const root = resolve(import.meta.dirname, "..");
const projectsDir = resolve(root, "projects");
const backupDir = resolve(root, "scripts/image-backups");

try {
  const result = await backupProjectImages(projectsDir, backupDir);
  console.log(
    `Backed up ${result.fileCount} image(s) to ${relative(root, result.archivePath)} (${(result.size / 1024 / 1024).toFixed(2)} MB)`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
