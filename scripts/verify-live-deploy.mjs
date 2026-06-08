#!/usr/bin/env node
/**
 * Post-deploy smoke checks against the live GitHub Pages site.
 * Usage: node scripts/verify-live-deploy.mjs
 *        LIVE_SITE_URL=https://example.github.io/repo node scripts/verify-live-deploy.mjs
 */
import {
  joinSitePath,
  normalizeManifestAssetPath,
  parsePositiveInt,
  withRetries,
} from "./lib/live-verify.mjs";

const siteBase =
  process.env.LIVE_SITE_URL ?? "https://zeddrix.github.io/pet-projects";

const checkRetries = parsePositiveInt(process.env.LIVE_VERIFY_RETRIES, 1);
const checkDelayMs = parsePositiveInt(process.env.LIVE_VERIFY_DELAY_MS, 0);

/**
 * @param {string} path
 */
async function fetchOk(path) {
  const url = joinSitePath(siteBase, path);
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

/**
 * @param {string} name
 * @param {() => Promise<boolean>} run
 */
async function runCheck(name, run) {
  let attempts = 0;

  const ok = await withRetries(
    async () => {
      attempts += 1;
      return run();
    },
    (result) => result === true,
    {
      retries: checkRetries,
      delayMs: checkDelayMs,
      onRetry: (attempt) => {
        process.stderr.write(
          `  retry ${attempt}/${checkRetries - 1} for ${name}…\n`,
        );
      },
    },
  );

  if (ok) {
    process.stdout.write(`✓ ${name}\n`);
    return false;
  }

  process.stderr.write(`✗ ${name} (${attempts} attempt(s))\n`);
  return true;
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
      const spinnerPath = normalizeManifestAssetPath(
        manifest.files[spinnerEntry],
      );
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
  {
    name: "SEO home landing",
    run: async () => {
      const { response, body } = await fetchOk("/");
      return (
        response.ok &&
        typeof body === "string" &&
        body.includes("Zeddrix Fabian") &&
        body.includes('rel="canonical"')
      );
    },
  },
  {
    name: "SEO sitemap.xml",
    run: async () => {
      const { response, body } = await fetchOk("/sitemap.xml");
      return (
        response.ok &&
        typeof body === "string" &&
        body.includes("<urlset") &&
        body.includes("/project/loan-calculator")
      );
    },
  },
  {
    name: "SEO robots.txt",
    run: async () => {
      const { response, body } = await fetchOk("/robots.txt");
      return (
        response.ok &&
        typeof body === "string" &&
        body.includes("Sitemap:") &&
        body.includes("/sitemap.xml")
      );
    },
  },
];

let failed = 0;

for (const check of checks) {
  try {
    const checkFailed = await runCheck(check.name, check.run);
    if (checkFailed) {
      failed += 1;
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
