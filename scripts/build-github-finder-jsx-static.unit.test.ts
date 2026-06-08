import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  cra4NodeVersionError,
  isCra4NodeVersion,
} from "./lib/archive-build-env.mjs";

const jsxIndexPath = join(
  process.cwd(),
  "projects/github-finder-jsx/index.html",
);
const jsxStaticIndexPath = join(
  process.cwd(),
  "static/projects/github-finder-jsx/index.html",
);

function expectRelativePlaygroundAssetPaths(html: string): void {
  expect(html).not.toMatch(/src="\/static\//);
  expect(html).not.toMatch(/href="\/static\//);
  expect(html).toMatch(/src="\.\/static\//);
}

describe("build-github-finder-jsx-static Node guard", () => {
  it("requires Node 16 for CRA 4 toolchain", () => {
    expect(isCra4NodeVersion("v16.20.2")).toBe(true);
    expect(cra4NodeVersionError("v16.20.2")).toBeNull();
  });

  it("rejects Node 22 used by wrapper CI default", () => {
    expect(isCra4NodeVersion("v22.11.0")).toBe(false);
    expect(cra4NodeVersionError("v22.11.0")).toMatch(/Node 16/);
  });
});

describe("github-finder-jsx static bundle paths", () => {
  it("uses relative asset paths suitable for playground iframe hosting", () => {
    const html = readFileSync(jsxIndexPath, "utf8");
    expectRelativePlaygroundAssetPaths(html);
  });

  it("syncs relative asset paths into static/projects for GitHub Pages deploy", () => {
    const html = readFileSync(jsxStaticIndexPath, "utf8");
    expectRelativePlaygroundAssetPaths(html);
  });
});
