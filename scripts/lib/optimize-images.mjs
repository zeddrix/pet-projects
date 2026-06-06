import { readdir, readFile, stat, unlink } from "node:fs/promises";
import { join, relative } from "node:path";
import sharp from "sharp";

const RASTER_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif"]);

/** @typedef {{ pathPrefix?: string, basename?: string, basenamePattern?: string, maxWidth: number, square?: boolean, hasAlpha?: boolean, quality?: number, alphaQuality?: number, exclude?: boolean }} ProfileRule */
/** @typedef {{ slug: string, root: string, exclude?: string[], defaultMaxWidth: number, defaultQuality: number, defaultAlphaQuality?: number, rules?: ProfileRule[] }} ImageProfile */

/**
 * @param {string} root
 * @param {ImageProfile} profile
 */
export function resolveProfileRoot(root, profile) {
  return join(root, profile.root);
}

/**
 * @param {string} dir
 * @param {Set<string>} extensions
 * @param {string[]} excludeBasenames
 * @returns {Promise<string[]>}
 */
export async function collectImageFiles(
  dir,
  extensions,
  excludeBasenames = [],
) {
  const entries = await readdir(dir, { withFileTypes: true });
  /** @type {string[]} */
  const files = [];
  const excludeSet = new Set(excludeBasenames);

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(
        ...(await collectImageFiles(fullPath, extensions, excludeBasenames)),
      );
      continue;
    }
    const ext = entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase();
    if (!extensions.has(ext) || excludeSet.has(entry.name)) {
      continue;
    }
    files.push(fullPath);
  }

  return files.sort();
}

/**
 * @param {string} relPath
 * @param {string} basename
 * @param {ImageProfile} profile
 */
export function getMaxWidth(relPath, basename, profile) {
  const lower = basename.toLowerCase();

  for (const rule of profile.rules ?? []) {
    if (rule.exclude) {
      continue;
    }
    if (rule.basename && lower === rule.basename.toLowerCase()) {
      return rule.maxWidth;
    }
    if (
      rule.basenamePattern &&
      lower.includes(rule.basenamePattern.toLowerCase())
    ) {
      return rule.maxWidth;
    }
    if (rule.pathPrefix && relPath.startsWith(rule.pathPrefix)) {
      return rule.maxWidth;
    }
  }

  return profile.defaultMaxWidth;
}

/**
 * @param {string} relPath
 * @param {string} basename
 * @param {ImageProfile} profile
 */
export function hasAlpha(relPath, basename, profile) {
  const lower = basename.toLowerCase();

  for (const rule of profile.rules ?? []) {
    if (rule.hasAlpha === true) {
      if (rule.basename && lower === rule.basename.toLowerCase()) {
        return true;
      }
      if (
        rule.basenamePattern &&
        lower.includes(rule.basenamePattern.toLowerCase())
      ) {
        return true;
      }
      if (rule.pathPrefix && relPath.startsWith(rule.pathPrefix)) {
        return true;
      }
    }
  }

  return lower.endsWith(".png") || lower.endsWith(".gif");
}

/**
 * @param {string} inputPath
 * @returns {string}
 */
export function outputPathForInput(inputPath) {
  return inputPath.replace(/\.(jpe?g|png|gif)$/i, ".webp");
}

export function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  return `${(bytes / 1024).toFixed(1)} KB`;
}

/**
 * @param {string} dir
 * @param {Set<string>} extensions
 */
async function folderByteTotal(dir, extensions) {
  const files = await collectImageFiles(dir, extensions);
  let total = 0;
  for (const file of files) {
    total += (await stat(file)).size;
  }
  return total;
}

/**
 * @param {string} profilesDir
 * @param {string} profileName
 * @returns {Promise<ImageProfile>}
 */
export async function loadProfile(profilesDir, profileName) {
  const profilePath = join(profilesDir, `${profileName}.json`);
  const raw = await readFile(profilePath, "utf8");
  /** @type {ImageProfile} */
  const profile = JSON.parse(raw);

  if (typeof profile.root !== "string" || profile.root.length === 0) {
    throw new Error(
      `Invalid profile ${profileName}: root must be a non-empty string`,
    );
  }
  if (
    typeof profile.defaultMaxWidth !== "number" ||
    profile.defaultMaxWidth <= 0
  ) {
    throw new Error(
      `Invalid profile ${profileName}: defaultMaxWidth must be positive`,
    );
  }
  if (
    typeof profile.defaultQuality !== "number" ||
    profile.defaultQuality < 1
  ) {
    throw new Error(
      `Invalid profile ${profileName}: defaultQuality must be >= 1`,
    );
  }

  return profile;
}

/**
 * @param {object} options
 * @param {string} options.repoRoot
 * @param {ImageProfile} options.profile
 * @param {boolean} [options.dryRun]
 * @param {boolean} [options.keepSources]
 * @returns {Promise<{ inputs: string[], report: { rel: string, before: number, after: number, skipped?: boolean }[], beforeTotal: number, afterTotal: number }>}
 */
export async function optimizeProfileImages({
  repoRoot,
  profile,
  dryRun = false,
  keepSources = true,
}) {
  const imgDir = resolveProfileRoot(repoRoot, profile);
  const excludeBasenames = profile.exclude ?? [];
  const inputs = await collectImageFiles(
    imgDir,
    RASTER_EXTENSIONS,
    excludeBasenames,
  );

  if (inputs.length === 0) {
    return {
      inputs: [],
      report: [],
      beforeTotal: 0,
      afterTotal: 0,
    };
  }

  const beforeTotal = await folderByteTotal(imgDir, RASTER_EXTENSIONS);
  /** @type {{ rel: string, before: number, after: number, skipped?: boolean }[]} */
  const report = [];

  for (const inputPath of inputs) {
    const rel = relative(imgDir, inputPath);
    const basename = rel.split("/").pop() ?? rel;
    const maxWidth = getMaxWidth(rel, basename, profile);
    const outputPath = outputPathForInput(inputPath);
    const beforeBytes = (await stat(inputPath)).size;

    if (dryRun) {
      report.push({
        rel,
        before: beforeBytes,
        after: beforeBytes,
        skipped: true,
      });
      continue;
    }

    let pipeline = sharp(inputPath, { animated: false }).rotate();

    const squareRule = (profile.rules ?? []).find(
      (rule) =>
        rule.square &&
        ((rule.pathPrefix && rel.startsWith(rule.pathPrefix)) ||
          (rule.basename &&
            basename.toLowerCase() === rule.basename.toLowerCase())),
    );

    if (squareRule) {
      pipeline = pipeline.resize(maxWidth, maxWidth, {
        fit: "inside",
        withoutEnlargement: true,
      });
    } else {
      pipeline = pipeline.resize(maxWidth, null, {
        withoutEnlargement: true,
      });
    }

    const useAlpha = hasAlpha(rel, basename, profile);
    const quality = profile.defaultQuality;
    const alphaQuality = profile.defaultAlphaQuality ?? 90;

    if (useAlpha) {
      pipeline = pipeline.webp({
        quality: alphaQuality,
        alphaQuality,
        effort: 6,
      });
    } else {
      pipeline = pipeline.webp({
        quality,
        effort: 6,
        smartSubsample: true,
      });
    }

    await pipeline.toFile(outputPath);

    if (!keepSources) {
      await unlink(inputPath);
    }

    const afterBytes = (await stat(outputPath)).size;
    report.push({ rel, before: beforeBytes, after: afterBytes });
  }

  const afterTotal = dryRun
    ? beforeTotal
    : await folderByteTotal(imgDir, new Set([".webp"]));

  return { inputs, report, beforeTotal, afterTotal };
}

/**
 * @param {string} repoRoot
 * @param {ImageProfile} profile
 * @param {{ dryRun?: boolean, keepSources?: boolean }} [options]
 */
export async function runOptimizeProfile(repoRoot, profile, options = {}) {
  const { dryRun = false, keepSources = true } = options;
  const imgDir = resolveProfileRoot(repoRoot, profile);
  const result = await optimizeProfileImages({
    repoRoot,
    profile,
    dryRun,
    keepSources,
  });

  if (result.inputs.length === 0) {
    console.error(`No raster images found under ${imgDir}`);
    process.exitCode = 1;
    return result;
  }

  console.log(
    `${dryRun ? "[dry-run] " : ""}Optimizing ${result.inputs.length} image(s) in ${profile.root} (before: ${formatBytes(result.beforeTotal)})`,
  );

  for (const entry of result.report) {
    const outName = entry.rel.replace(/\.(jpe?g|png|gif)$/i, ".webp");
    if (entry.skipped) {
      console.log(`  [dry-run] ${entry.rel} → ${outName}`);
      continue;
    }
    console.log(
      `  ${entry.rel} → ${outName}: ${formatBytes(entry.before)} → ${formatBytes(entry.after)}`,
    );
  }

  if (!dryRun) {
    const saved = result.beforeTotal - result.afterTotal;
    const pct =
      result.beforeTotal > 0
        ? ((saved / result.beforeTotal) * 100).toFixed(1)
        : "0";
    console.log("");
    console.log(
      `Done: ${formatBytes(result.beforeTotal)} → ${formatBytes(result.afterTotal)} (${pct}% saved)`,
    );
  }

  return result;
}

/**
 * @param {string} repoRoot
 * @param {string} profilesDir
 * @param {string} profileName
 * @param {{ dryRun?: boolean, keepSources?: boolean }} [options]
 */
export async function runProfileByName(
  repoRoot,
  profilesDir,
  profileName,
  options = {},
) {
  const profile = await loadProfile(profilesDir, profileName);
  return runOptimizeProfile(repoRoot, profile, options);
}
