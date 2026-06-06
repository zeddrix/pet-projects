import { spawnSync } from "node:child_process";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

const RASTER_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

/**
 * @param {string} dir
 * @param {string[]} files
 */
async function collectRasterFiles(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (
      entry.name === "node_modules" ||
      entry.name === ".svelte-kit" ||
      entry.name === "build"
    ) {
      continue;
    }
    if (entry.isDirectory()) {
      await collectRasterFiles(fullPath, files);
      continue;
    }
    const ext = entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase();
    if (RASTER_EXTENSIONS.has(ext)) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * @param {string[]} files absolute paths
 * @param {string} baseDir
 * @param {string} archivePath
 */
export async function createArchive(files, baseDir, archivePath) {
  await mkdir(dirname(archivePath), { recursive: true });
  const manifestPath = `${archivePath}.files.txt`;
  const relativePaths = files.map((file) => relative(baseDir, file));
  await writeFile(manifestPath, `${relativePaths.join("\n")}\n`, "utf8");

  const result = spawnSync(
    "tar",
    ["-czf", archivePath, "-C", baseDir, ...relativePaths],
    { stdio: "inherit" },
  );

  if (result.status !== 0) {
    throw new Error(`tar failed with exit code ${result.status ?? "unknown"}`);
  }
}

/**
 * @param {string} projectsDir
 * @param {string} backupDir
 * @param {string} prefix
 */
export async function backupProjectImages(
  projectsDir,
  backupDir,
  prefix = "project-images",
) {
  await mkdir(backupDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const archivePath = join(backupDir, `${prefix}-${timestamp}.tar.gz`);
  const files = await collectRasterFiles(projectsDir);

  if (files.length === 0) {
    throw new Error(`No raster images found under ${projectsDir}`);
  }

  await createArchive(files, projectsDir, archivePath);
  const { size } = await stat(archivePath);
  return { archivePath, fileCount: files.length, size };
}
