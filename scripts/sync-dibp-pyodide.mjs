#!/usr/bin/env node
import { resolve } from "node:path";
import {
  PYODIDE_VERSION,
  syncDibpPyodide,
} from "./lib/sync-dibp-pyodide-lib.mjs";

const root = resolve(import.meta.dirname, "..");
const dryRun = process.argv.includes("--dry-run");

const result = await syncDibpPyodide({ root, dryRun });

if (dryRun) {
  console.log(
    `[dry-run] Pyodide v${PYODIDE_VERSION} vendor at ${result.vendorDir} (${(result.beforeBytes / 1024 / 1024).toFixed(2)} MB)`,
  );
} else {
  const saved = result.beforeBytes - result.afterBytes;
  console.log(
    `Pyodide v${PYODIDE_VERSION} vendor ready (${(result.afterBytes / 1024 / 1024).toFixed(2)} MB${saved > 0 ? `, saved ${(saved / 1024).toFixed(1)} KB` : ""})`,
  );
}
