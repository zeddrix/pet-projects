import { describe, expect, it } from "vitest";
import {
  joinSitePath,
  normalizeManifestAssetPath,
} from "./lib/live-verify.mjs";

describe("verify-live-deploy manifest paths", () => {
  it("normalizes CRA spinner path for URL join", () => {
    const manifestValue = "/static/media/spinner.35ada5a9.webp";
    const spinnerPath = normalizeManifestAssetPath(manifestValue);
    const url = joinSitePath(
      "https://zeddrix.github.io/pet-projects",
      `/projects/github-finder-jsx/${spinnerPath}`,
    );

    expect(url).toBe(
      "https://zeddrix.github.io/pet-projects/projects/github-finder-jsx/static/media/spinner.35ada5a9.webp",
    );
    expect(url).not.toContain("//projects");
  });
});
