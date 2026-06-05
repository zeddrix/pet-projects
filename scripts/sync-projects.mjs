import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sourceDir = join(root, "projects");
const targetDir = join(root, "static", "projects");

/** @param {string} slug */
function readPreviewManifest(slug) {
  const manifestPath = join(sourceDir, slug, "preview.json");
  if (!existsSync(manifestPath)) {
    return null;
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (
    typeof manifest.sourceSubpath !== "string" ||
    manifest.sourceSubpath.length === 0
  ) {
    throw new Error(
      `Invalid preview.json for ${slug}: sourceSubpath must be a non-empty string`,
    );
  }

  return manifest;
}

/** @param {string} slug */
function resolveSyncSource(slug) {
  const manifest = readPreviewManifest(slug);
  if (manifest) {
    return join(sourceDir, slug, manifest.sourceSubpath);
  }

  return join(sourceDir, slug);
}

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
  (entry) => entry.isDirectory(),
);

let syncedCount = 0;

for (const entry of entries) {
  const slug = entry.name;
  const manifest = readPreviewManifest(slug);
  const syncSource = resolveSyncSource(slug);

  if (!existsSync(syncSource)) {
    if (manifest) {
      console.warn(
        `Skipping ${slug}: preview source missing at projects/${slug}/${manifest.sourceSubpath}`,
      );
      continue;
    }

    console.warn(`Skipping ${slug}: projects/${slug} not found`);
    continue;
  }

  const syncTarget = join(targetDir, slug);
  mkdirSync(syncTarget, { recursive: true });
  cpSync(syncSource, syncTarget, { recursive: true });

  if (manifest?.sourceSubpath) {
    console.log(
      `Synced projects/${slug}/${manifest.sourceSubpath} → static/projects/${slug}`,
    );
  } else {
    console.log(`Synced projects/${slug} → static/projects/${slug}`);
  }

  syncedCount += 1;
}

console.log(`Synced ${syncedCount} project folder(s)`);
