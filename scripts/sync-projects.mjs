import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");

/** @param {string} rootDir @returns {Record<string, string[]>} */
export function loadSyncExcludes(rootDir) {
  const excludesPath = join(rootDir, "scripts", "sync-excludes.json");
  if (!existsSync(excludesPath)) {
    return {};
  }
  return JSON.parse(readFileSync(excludesPath, "utf8"));
}

/** @param {string} slug @param {string} relativePath @param {Record<string, string[]>} excludes */
export function shouldExcludeSyncPath(slug, relativePath, excludes) {
  const patterns = excludes[slug] ?? [];
  return patterns.some(
    (pattern) =>
      relativePath === pattern || relativePath.endsWith(`/${pattern}`),
  );
}

/**
 * @param {object} [options]
 * @param {string} [options.rootDir]
 */
export function syncProjects(options = {}) {
  const rootDir = options.rootDir ?? root;
  const projectsSource = join(rootDir, "projects");
  const projectsTarget = join(rootDir, "static", "projects");
  const excludes = loadSyncExcludes(rootDir);

  /** @param {string} slug */
  function readPreviewManifestForRoot(slug) {
    const manifestPath = join(projectsSource, slug, "preview.json");
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
  function resolveSyncSourceForRoot(slug) {
    const manifest = readPreviewManifestForRoot(slug);
    if (manifest) {
      return join(projectsSource, slug, manifest.sourceSubpath);
    }

    return join(projectsSource, slug);
  }

  /** @param {string} dir @param {string} slug */
  function removeExcludedFilesForRoot(dir, slug) {
    if (!existsSync(dir)) {
      return;
    }

    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      const relPath = relative(join(projectsTarget, slug), fullPath);
      if (entry.isDirectory()) {
        removeExcludedFilesForRoot(fullPath, slug);
        continue;
      }
      if (shouldExcludeSyncPath(slug, relPath, excludes)) {
        rmSync(fullPath, { force: true });
      }
    }
  }

  if (!existsSync(projectsSource)) {
    mkdirSync(projectsSource, { recursive: true });
    console.log("Created empty projects/ directory");
    return 0;
  }

  if (existsSync(projectsTarget)) {
    rmSync(projectsTarget, { recursive: true, force: true });
  }

  mkdirSync(projectsTarget, { recursive: true });

  const entries = readdirSync(projectsSource, { withFileTypes: true }).filter(
    (entry) => entry.isDirectory(),
  );

  let syncedCount = 0;

  for (const entry of entries) {
    const slug = entry.name;
    const manifest = readPreviewManifestForRoot(slug);
    const syncSource = resolveSyncSourceForRoot(slug);

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

    const syncTarget = join(projectsTarget, slug);
    mkdirSync(syncTarget, { recursive: true });
    cpSync(syncSource, syncTarget, { recursive: true });
    removeExcludedFilesForRoot(syncTarget, slug);

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
  return syncedCount;
}

const isDirectRun =
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isDirectRun) {
  syncProjects();

  const syncPyodideScript = join(root, "scripts", "sync-dibp-pyodide.mjs");
  if (existsSync(syncPyodideScript)) {
    const result = spawnSync(process.execPath, [syncPyodideScript], {
      stdio: "inherit",
      cwd: root,
    });
    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }
  }
}
