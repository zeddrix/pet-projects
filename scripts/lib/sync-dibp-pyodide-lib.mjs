import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
} from "node:fs";
import { createReadStream } from "node:fs";
import { readdir, stat, unlink } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";

export const PYODIDE_VERSION = "0.26.4";
export const CDN_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

/** Files required for stdlib-only Pyodide boot (lock file omitted). */
export const PYODIDE_FILES = [
  "pyodide.js",
  "pyodide.asm.js",
  "pyodide.asm.wasm",
  "python_stdlib.zip",
  "pyodide-lock.json",
];

/**
 * @param {string} filePath
 * @returns {Promise<string>}
 */
export async function sha256File(filePath) {
  const hash = createHash("sha256");
  await pipeline(createReadStream(filePath), hash);
  return hash.digest("hex");
}

/**
 * @param {string} root
 * @returns {{ version: string, files: Record<string, string> }}
 */
export function loadChecksumManifest(root) {
  const manifestPath = join(root, "scripts/dibp-pyodide-checksums.json");
  return JSON.parse(readFileSync(manifestPath, "utf8"));
}

/**
 * @param {string} vendorDir
 */
async function folderByteTotal(vendorDir) {
  if (!existsSync(vendorDir)) {
    return 0;
  }
  const entries = await readdir(vendorDir);
  let total = 0;
  for (const entry of entries) {
    total += (await stat(join(vendorDir, entry))).size;
  }
  return total;
}

/**
 * @param {string} vendorDir
 * @param {string} filename
 * @param {string} expectedHash
 */
export async function verifyFileChecksum(vendorDir, filename, expectedHash) {
  const targetPath = join(vendorDir, filename);
  const actual = await sha256File(targetPath);
  if (actual !== expectedHash) {
    throw new Error(
      `Checksum mismatch for ${filename}: expected ${expectedHash}, got ${actual}`,
    );
  }
}

/**
 * @param {string} vendorDir
 * @param {string} filename
 */
export async function downloadPyodideFile(vendorDir, filename) {
  const targetPath = join(vendorDir, filename);
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

/**
 * @param {object} options
 * @param {string} options.root
 * @param {boolean} [options.dryRun]
 */
export async function syncDibpPyodide({ root, dryRun = false }) {
  const vendorDir = join(
    root,
    "projects",
    "diamond-in-black-pearl",
    "vendor",
    "pyodide",
  );
  const manifest = loadChecksumManifest(root);
  const beforeBytes = await folderByteTotal(vendorDir);

  if (!dryRun) {
    mkdirSync(vendorDir, { recursive: true });
  }

  for (const filename of PYODIDE_FILES) {
    const targetPath = join(vendorDir, filename);
    const expectedHash = manifest.files[filename];
    if (!expectedHash) {
      throw new Error(`Missing checksum for ${filename} in manifest`);
    }

    if (existsSync(targetPath)) {
      if (!dryRun) {
        await verifyFileChecksum(vendorDir, filename, expectedHash);
      }
      continue;
    }

    if (dryRun) {
      process.stdout.write(`[dry-run] would download ${filename}\n`);
      continue;
    }

    process.stdout.write(`Syncing Pyodide ${filename}…\n`);
    await downloadPyodideFile(vendorDir, filename);
    await verifyFileChecksum(vendorDir, filename, expectedHash);
  }

  if (!dryRun) {
    const entries = await readdir(vendorDir);
    for (const entry of entries) {
      if (!PYODIDE_FILES.includes(entry)) {
        await unlink(join(vendorDir, entry));
        process.stdout.write(`Removed unused vendor file ${entry}\n`);
      }
    }
  }

  const afterBytes = dryRun ? beforeBytes : await folderByteTotal(vendorDir);
  return { vendorDir, beforeBytes, afterBytes, dryRun };
}
