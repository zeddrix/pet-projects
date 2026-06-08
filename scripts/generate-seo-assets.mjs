#!/usr/bin/env node
/**
 * Generates raster SEO assets from SVG sources in static/.
 */
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const staticDir = join(root, "static");

async function generateOgImage() {
  const svg = await readFile(join(staticDir, "og-image.svg"));
  await sharp(svg)
    .resize(1200, 630)
    .png()
    .toFile(join(staticDir, "og-image.png"));
}

async function generateAppleTouchIcon() {
  const svg = await readFile(join(staticDir, "favicon.svg"));
  await sharp(svg)
    .resize(180, 180)
    .png()
    .toFile(join(staticDir, "apple-touch-icon.png"));
}

await generateOgImage();
await generateAppleTouchIcon();
console.log("Generated static/og-image.png and static/apple-touch-icon.png");
