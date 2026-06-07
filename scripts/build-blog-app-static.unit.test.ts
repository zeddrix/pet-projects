import { describe, expect, it } from "vitest";
import { resolveBlogAppBasePath } from "./lib/archive-build-env.mjs";

describe("build-blog-app-static base path", () => {
  it("does not pass wrapper BASE_PATH directly to SvelteKit", () => {
    expect(resolveBlogAppBasePath({ BASE_PATH: "/pet-projects" })).toBe(
      "/pet-projects/projects/blog-app",
    );
  });
});
