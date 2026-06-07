import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import {
  getMaxWidth,
  hasAlpha,
  loadProfile,
  optimizeProfileImages,
  outputPathForInput,
  resolveProfileRoot,
} from "../../scripts/lib/optimize-images.mjs";

const root = resolve(import.meta.dirname, "../..");
const profilesDir = join(root, "scripts/image-profiles");

describe("optimize-images lib", () => {
  it("maps raster inputs to webp output paths", () => {
    expect(outputPathForInput("/tmp/foo/bar.jpg")).toBe("/tmp/foo/bar.webp");
    expect(outputPathForInput("/tmp/spinner.gif")).toBe("/tmp/spinner.webp");
  });

  it("loads bible-query profile with sane defaults", async () => {
    const profile = await loadProfile(profilesDir, "bible-query");
    expect(profile.root).toBe("projects/bible-query/img");
    expect(profile.defaultMaxWidth).toBeGreaterThan(0);
    expect(profile.defaultQuality).toBeGreaterThanOrEqual(1);
  });

  it("applies bible-query button logo max width rule", async () => {
    const profile = await loadProfile(profilesDir, "bible-query");
    expect(
      getMaxWidth("btn-logos/about-logo.png", "about-logo.png", profile),
    ).toBe(256);
    expect(getMaxWidth("background.webp", "background.webp", profile)).toBe(
      760,
    );
  });

  it("dry-run does not write or delete files", async () => {
    const profile = await loadProfile(profilesDir, "diamond-in-black-pearl");
    const imgDir = resolveProfileRoot(root, profile);
    const sample = join(imgDir, "intro.webp");
    expect(existsSync(sample)).toBe(true);

    const result = await optimizeProfileImages({
      repoRoot: root,
      profile,
      dryRun: true,
      keepSources: true,
    });

    expect(result.inputs.length).toBe(0);
    expect(existsSync(sample)).toBe(true);
  });

  it("detects alpha for png wireframe profile rule", async () => {
    const profile = await loadProfile(profilesDir, "blog-app");
    expect(
      hasAlpha("original-wireframe.png", "original-wireframe.png", profile),
    ).toBe(true);
  });
});
