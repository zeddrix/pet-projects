import { readdir, stat, unlink } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const imgDir = join(root, "projects/bible-query/img");

const RASTER_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

/** @param {string} relPath @param {string} basename */
function getMaxWidth(relPath, basename) {
  const lower = basename.toLowerCase();

  if (relPath.startsWith("btn-logos/")) {
    return 256;
  }
  if (lower === "background.jpg" || lower === "background.jpeg") {
    return 840;
  }
  if (lower === "levels-stars.jpg" || lower === "levels-stars.jpeg") {
    return 760;
  }
  if (lower.endsWith(".png") && lower.includes("star")) {
    return 760;
  }
  if (lower.includes("-sm-") || lower.includes("-sm.")) {
    return 220;
  }
  if (lower.endsWith("-btn.jpg") || lower.endsWith("-btn.jpeg")) {
    return 660;
  }

  return 760;
}

/** @param {string} relPath @param {string} basename */
function hasAlpha(relPath, basename) {
  const lower = basename.toLowerCase();
  return (
    relPath.startsWith("btn-logos/") ||
    (lower.endsWith(".png") && lower.includes("star"))
  );
}

const OUTPUT_EXTENSIONS = new Set([".webp"]);

/** @param {string} dir @param {Set<string>} extensions @returns {Promise<string[]>} */
async function collectImageFiles(dir, extensions) {
  const entries = await readdir(dir, { withFileTypes: true });
  /** @type {string[]} */
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImageFiles(fullPath, extensions)));
      continue;
    }
    const ext = entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase();
    if (extensions.has(ext)) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

/** @param {string} dir @returns {Promise<string[]>} */
async function collectRasterFiles(dir) {
  return collectImageFiles(dir, RASTER_EXTENSIONS);
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function folderByteTotal(dir, extensions) {
  const files = await collectImageFiles(dir, extensions);
  let total = 0;
  for (const file of files) {
    total += (await stat(file)).size;
  }
  return total;
}

const inputs = await collectRasterFiles(imgDir);
if (inputs.length === 0) {
  console.error(`No raster images found under ${imgDir}`);
  process.exit(1);
}

const beforeTotal = await folderByteTotal(imgDir, RASTER_EXTENSIONS);
console.log(
  `Optimizing ${inputs.length} image(s) in projects/bible-query/img (before: ${formatBytes(beforeTotal)})`,
);

/** @type {{ rel: string, before: number, after: number }[]} */
const report = [];

for (const inputPath of inputs) {
  const rel = relative(imgDir, inputPath);
  const basename = rel.split("/").pop() ?? rel;
  const maxWidth = getMaxWidth(rel, basename);
  const outputPath = inputPath.replace(/\.(jpe?g|png)$/i, ".webp");
  const beforeBytes = (await stat(inputPath)).size;

  let pipeline = sharp(inputPath).rotate();

  if (rel.startsWith("btn-logos/")) {
    pipeline = pipeline.resize(maxWidth, maxWidth, {
      fit: "inside",
      withoutEnlargement: true,
    });
  } else {
    pipeline = pipeline.resize(maxWidth, null, {
      withoutEnlargement: true,
    });
  }

  if (hasAlpha(rel, basename)) {
    pipeline = pipeline.webp({
      quality: 90,
      alphaQuality: 90,
      effort: 6,
    });
  } else {
    pipeline = pipeline.webp({
      quality: 82,
      effort: 6,
      smartSubsample: true,
    });
  }

  await pipeline.toFile(outputPath);
  await unlink(inputPath);

  const afterBytes = (await stat(outputPath)).size;
  report.push({ rel, before: beforeBytes, after: afterBytes });
  console.log(
    `  ${rel} → ${basename.replace(/\.(jpe?g|png)$/i, ".webp")}: ${formatBytes(beforeBytes)} → ${formatBytes(afterBytes)} (max ${maxWidth}px)`,
  );
}

const afterTotal = await folderByteTotal(imgDir, OUTPUT_EXTENSIONS);
const saved = beforeTotal - afterTotal;
const pct = beforeTotal > 0 ? ((saved / beforeTotal) * 100).toFixed(1) : "0";

console.log("");
console.log(
  `Done: ${formatBytes(beforeTotal)} → ${formatBytes(afterTotal)} (${pct}% saved)`,
);

if (afterTotal >= 1024 * 1024) {
  console.warn(
    `Warning: img/ is still ${formatBytes(afterTotal)} (target was under 1 MB). Review quality settings if needed.`,
  );
}
