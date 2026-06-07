import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const profilesDir = join(root, "scripts/image-profiles");

describe("image profile manifests", () => {
  const profileNames = readdirSync(profilesDir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => name.replace(/\.json$/, ""));

  it.each(profileNames)("%s profile root exists on disk", (profileName) => {
    const profile = JSON.parse(
      readFileSync(join(profilesDir, `${profileName}.json`), "utf8"),
    ) as {
      root: string;
      defaultMaxWidth: number;
      defaultQuality: number;
    };

    expect(existsSync(join(root, profile.root))).toBe(true);
    expect(profile.defaultMaxWidth).toBeGreaterThan(0);
    expect(profile.defaultMaxWidth).toBeLessThanOrEqual(4096);
    expect(profile.defaultQuality).toBeGreaterThanOrEqual(1);
    expect(profile.defaultQuality).toBeLessThanOrEqual(100);
  });
});
