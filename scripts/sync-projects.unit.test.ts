import { describe, expect, it } from "vitest";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import {
  loadSyncExcludes,
  shouldExcludeSyncPath,
  syncProjects,
} from "./sync-projects.mjs";

const root = resolve(import.meta.dirname, "..");
const tempRoot = join(root, "scripts/.tmp-sync-test");

describe("sync-projects excludes", () => {
  it("loads diamond-in-black-pearl style-reference exclude", () => {
    const excludes = loadSyncExcludes(root);
    expect(excludes["diamond-in-black-pearl"]).toContain(
      "assets/scenes/00-style-reference.jpg",
    );
  });

  it("matches exclude paths for a slug", () => {
    const excludes = loadSyncExcludes(root);
    expect(
      shouldExcludeSyncPath(
        "diamond-in-black-pearl",
        "assets/scenes/00-style-reference.jpg",
        excludes,
      ),
    ).toBe(true);
    expect(
      shouldExcludeSyncPath(
        "diamond-in-black-pearl",
        "assets/scenes/intro.webp",
        excludes,
      ),
    ).toBe(false);
  });

  it("does not copy excluded files into static/projects", () => {
    rmSync(tempRoot, { recursive: true, force: true });
    mkdirSync(join(tempRoot, "projects", "demo-slug", "assets"), {
      recursive: true,
    });
    writeFileSync(
      join(tempRoot, "projects", "demo-slug", "assets", "keep.txt"),
      "keep",
    );
    writeFileSync(
      join(tempRoot, "projects", "demo-slug", "assets", "drop.txt"),
      "drop",
    );
    mkdirSync(join(tempRoot, "scripts"), { recursive: true });
    writeFileSync(
      join(tempRoot, "scripts", "sync-excludes.json"),
      JSON.stringify({ "demo-slug": ["assets/drop.txt"] }),
    );

    syncProjects({ rootDir: tempRoot });

    const targetKeep = join(
      tempRoot,
      "static",
      "projects",
      "demo-slug",
      "assets",
      "keep.txt",
    );
    const targetDrop = join(
      tempRoot,
      "static",
      "projects",
      "demo-slug",
      "assets",
      "drop.txt",
    );
    expect(existsSync(targetKeep)).toBe(true);
    expect(existsSync(targetDrop)).toBe(false);

    rmSync(tempRoot, { recursive: true, force: true });
  });
});
