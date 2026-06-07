import { describe, expect, it } from "vitest";
import {
  cra4NodeVersionError,
  isCra4NodeVersion,
} from "./lib/archive-build-env.mjs";

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
