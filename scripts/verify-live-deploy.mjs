#!/usr/bin/env node
/**
 * Post-deploy smoke checks against the live GitHub Pages site.
 * Usage: node scripts/verify-live-deploy.mjs
 *        LIVE_SITE_URL=https://example.github.io/repo node scripts/verify-live-deploy.mjs
 */
const siteBase =
  process.env.LIVE_SITE_URL ?? "https://zeddrix.github.io/pet-projects";

/**
 * @param {string} path
 */
async function fetchOk(path) {
  const url = `${siteBase}${path}`;
  const response = await fetch(url, { redirect: "follow" });
  const contentType = response.headers.get("content-type") ?? "";
  const isText =
    contentType.includes("text/html") ||
    contentType.includes("application/json") ||
    contentType.includes("text/plain");
  const body = isText
    ? await response.text()
    : Buffer.from(await response.arrayBuffer());
  return { url, response, contentType, body };
}

/** @type {{ name: string, run: () => Promise<boolean> }[]} */
const checks = [
  {
    name: "JW Guitar background WebP",
    run: async () => {
      const { response, contentType, body } = await fetchOk(
        "/projects/jw-guitar-templates/JWGuitar.webp",
      );
      return (
        response.ok &&
        contentType.includes("image/webp") &&
        body.length > 10_000
      );
    },
  },
  {
    name: "DIBP intro scene WebP",
    run: async () => {
      const { response, contentType, body } = await fetchOk(
        "/projects/diamond-in-black-pearl/assets/scenes/intro.webp",
      );
      return (
        response.ok &&
        contentType.includes("image/webp") &&
        body.length > 50_000
      );
    },
  },
  {
    name: "Blog app hobby image WebP",
    run: async () => {
      const { response, contentType, body } = await fetchOk(
        "/projects/blog-app/images/hobby-guitar.webp",
      );
      return (
        response.ok &&
        contentType.includes("image/webp") &&
        body.length > 10_000
      );
    },
  },
  {
    name: "GitHub Finder spinner media WebP",
    run: async () => {
      const { response, body } = await fetchOk(
        "/projects/github-finder-jsx/asset-manifest.json",
      );
      if (!response.ok || typeof body !== "string") {
        return false;
      }
      const manifest = JSON.parse(body);
      const spinnerEntry = Object.keys(manifest.files ?? {}).find(
        (key) => key.includes("spinner") && key.endsWith(".webp"),
      );
      if (!spinnerEntry) {
        return false;
      }
      const spinnerPath = manifest.files[spinnerEntry].replace(/^\./, "");
      const asset = await fetchOk(`/projects/github-finder-jsx/${spinnerPath}`);
      return (
        asset.response.ok &&
        asset.contentType.includes("image/webp") &&
        asset.body.length > 100
      );
    },
  },
  {
    name: "Loan calculator loading WebP",
    run: async () => {
      const { response, contentType, body } = await fetchOk(
        "/projects/loan-calculator/img/loading.webp",
      );
      return (
        response.ok && contentType.includes("image/webp") && body.length > 100
      );
    },
  },
  {
    name: "Playground shell loads",
    run: async () => {
      const { response, body } = await fetchOk("/project/github-finder-jsx");
      return (
        response.ok &&
        typeof body === "string" &&
        (body.includes("playground-shell") || body.includes("GitHub Finder"))
      );
    },
  },
];

let failed = 0;

for (const check of checks) {
  try {
    const ok = await check.run();
    if (ok) {
      process.stdout.write(`✓ ${check.name}\n`);
    } else {
      failed += 1;
      process.stderr.write(`✗ ${check.name}\n`);
    }
  } catch (error) {
    failed += 1;
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`✗ ${check.name} (${message})\n`);
  }
}

if (failed > 0) {
  process.stderr.write(`\n${failed} live check(s) failed.\n`);
  process.exit(1);
}

process.stdout.write(`\nAll ${checks.length} live deploy checks passed.\n`);
