import { describe, expect, it } from "vitest";
import { buildVariantSourceUrl } from "./project-source-url";

describe("buildVariantSourceUrl", () => {
  it("builds monorepo root URL for slug-only path", () => {
    expect(buildVariantSourceUrl("blog-app", ".")).toBe(
      "https://github.com/zeddrix/pet-projects/tree/main/projects/blog-app",
    );
  });

  it("builds nested folder URL for variant path", () => {
    expect(buildVariantSourceUrl("blog-app", "django-original")).toBe(
      "https://github.com/zeddrix/pet-projects/tree/main/projects/blog-app/django-original",
    );
  });

  it("strips leading ./ from folder path", () => {
    expect(buildVariantSourceUrl("microposts", "./updated-static")).toBe(
      "https://github.com/zeddrix/pet-projects/tree/main/projects/microposts/updated-static",
    );
  });
});
