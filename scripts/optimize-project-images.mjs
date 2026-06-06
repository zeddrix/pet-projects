#!/usr/bin/env node
import { readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { runProfileByName } from "./lib/optimize-images.mjs";

const root = resolve(import.meta.dirname, "..");
const profilesDir = join(root, "scripts/image-profiles");

/** @param {string[]} argv */
function parseArgs(argv) {
  /** @type {{ profile?: string, dryRun: boolean, keepSources: boolean, list: boolean }} */
  const options = {
    dryRun: false,
    keepSources: true,
    list: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--keep-sources") {
      options.keepSources = true;
    } else if (arg === "--no-keep-sources") {
      options.keepSources = false;
    } else if (arg === "--list") {
      options.list = true;
    } else if (arg === "--profile") {
      options.profile = argv[i + 1];
      i += 1;
    } else if (arg.startsWith("--profile=")) {
      options.profile = arg.slice("--profile=".length);
    }
  }

  return options;
}

const options = parseArgs(process.argv.slice(2));

if (options.list) {
  const entries = await readdir(profilesDir);
  for (const entry of entries.filter((name) => name.endsWith(".json")).sort()) {
    console.log(entry.replace(/\.json$/, ""));
  }
  process.exit(0);
}

if (!options.profile) {
  console.error(
    "Usage: node scripts/optimize-project-images.mjs --profile <name> [--dry-run] [--keep-sources|--no-keep-sources]",
  );
  console.error("       node scripts/optimize-project-images.mjs --list");
  process.exit(1);
}

const result = await runProfileByName(root, profilesDir, options.profile, {
  dryRun: options.dryRun,
  keepSources: options.keepSources,
});

if (result.inputs.length === 0) {
  process.exit(1);
}
