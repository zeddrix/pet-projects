#!/usr/bin/env node
import { resolve } from "node:path";
import { runProfileByName } from "./lib/optimize-images.mjs";

const root = resolve(import.meta.dirname, "..");
const profilesDir = resolve(root, "scripts/image-profiles");

await runProfileByName(root, profilesDir, "bible-query", {
  keepSources: false,
});
