import { describe, expect, it } from "vitest";
import { resolveJustcolorBasePath } from "./lib/archive-build-env.mjs";

describe("build-justcolor-static base path", () => {
  it("does not pass wrapper BASE_PATH directly to SvelteKit", () => {
    expect(resolveJustcolorBasePath({ BASE_PATH: "/pet-projects" })).toBe(
      "/pet-projects/projects/justcolor",
    );
  });
});
