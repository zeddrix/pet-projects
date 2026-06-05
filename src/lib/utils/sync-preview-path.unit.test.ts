import { describe, expect, it } from "vitest";
import { resolveProjectSyncSource } from "./sync-preview-path";

describe("resolveProjectSyncSource", () => {
  it("returns slug root when no manifest is provided", () => {
    expect(resolveProjectSyncSource("loan-calculator", null)).toBe(
      "loan-calculator",
    );
  });

  it("returns nested preview subpath when manifest is provided", () => {
    expect(
      resolveProjectSyncSource("blog-app", {
        sourceSubpath: "sveltekit-static/build",
      }),
    ).toBe("blog-app/sveltekit-static/build");
  });

  it("returns microposts dist subpath from manifest", () => {
    expect(
      resolveProjectSyncSource("microposts", {
        sourceSubpath: "updated-static/dist",
      }),
    ).toBe("microposts/updated-static/dist");
  });
});
