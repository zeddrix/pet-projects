import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import {
  PYODIDE_FILES,
  loadChecksumManifest,
} from "./sync-dibp-pyodide-lib.mjs";

const root = resolve(import.meta.dirname, "../..");

describe("sync-dibp-pyodide manifest", () => {
  it("lists only stdlib runtime files without lock json", () => {
    expect(PYODIDE_FILES).toEqual([
      "pyodide.js",
      "pyodide.asm.js",
      "pyodide.asm.wasm",
      "python_stdlib.zip",
      "pyodide-lock.json",
    ]);
    expect(PYODIDE_FILES).toContain("pyodide-lock.json");
  });

  it("has sha256 checksums for every manifest file", () => {
    const manifest = loadChecksumManifest(root);
    expect(manifest.version).toBe("0.26.4");
    for (const filename of PYODIDE_FILES) {
      expect(manifest.files[filename]).toMatch(/^[a-f0-9]{64}$/);
    }
  });

  it("checksum manifest is valid json on disk", () => {
    const raw = readFileSync(
      join(root, "scripts/dibp-pyodide-checksums.json"),
      "utf8",
    );
    const parsed = JSON.parse(raw);
    expect(Object.keys(parsed.files)).toHaveLength(PYODIDE_FILES.length);
  });
});
