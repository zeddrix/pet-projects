import { describe, expect, it } from "vitest";
import {
  cra4NodeVersionError,
  isCra4NodeVersion,
  parseNodeMajor,
  resolveBlogAppBasePath,
} from "./archive-build-env.mjs";

describe("resolveBlogAppBasePath", () => {
  it("derives inner base from wrapper BASE_PATH", () => {
    expect(resolveBlogAppBasePath({ BASE_PATH: "/pet-projects" })).toBe(
      "/pet-projects/projects/blog-app",
    );
  });

  it("strips trailing slash from wrapper BASE_PATH", () => {
    expect(resolveBlogAppBasePath({ BASE_PATH: "/pet-projects/" })).toBe(
      "/pet-projects/projects/blog-app",
    );
  });

  it("prefers explicit BLOG_APP_BASE_PATH override", () => {
    expect(
      resolveBlogAppBasePath({
        BASE_PATH: "/pet-projects",
        BLOG_APP_BASE_PATH: "/custom/blog",
      }),
    ).toBe("/custom/blog");
  });

  it("defaults wrapper base when BASE_PATH is unset", () => {
    expect(resolveBlogAppBasePath({})).toBe("/pet-projects/projects/blog-app");
  });
});

describe("CRA 4 Node version guard", () => {
  it("accepts Node 16", () => {
    expect(isCra4NodeVersion("v16.20.2")).toBe(true);
    expect(cra4NodeVersionError("v16.20.2")).toBeNull();
  });

  it("rejects Node 20 and 22 with actionable message", () => {
    expect(isCra4NodeVersion("v20.19.2")).toBe(false);
    expect(isCra4NodeVersion("v22.11.0")).toBe(false);
    expect(cra4NodeVersionError("v22.11.0")).toContain("Node 16");
    expect(cra4NodeVersionError("v22.11.0")).toContain("v22.11.0");
  });

  it("parses node major from version string", () => {
    expect(parseNodeMajor("v16.20.2")).toBe(16);
    expect(parseNodeMajor("v22.0.0")).toBe(22);
  });
});
