import { describe, expect, it } from "vitest";
import { buildAppPath, buildPlaygroundFrameSrc } from "./build-app-path";

describe("buildAppPath", () => {
  it("returns root path when base is empty", () => {
    expect(buildAppPath("", "/project/test")).toBe("/project/test");
    expect(buildAppPath("", "")).toBe("/");
  });

  it("prefixes path with GitHub Pages base", () => {
    expect(buildAppPath("/pet-projects", "/project/test")).toBe(
      "/pet-projects/project/test",
    );
  });
});

describe("buildPlaygroundFrameSrc", () => {
  it("builds iframe src without base path", () => {
    expect(buildPlaygroundFrameSrc("", "loan-calculator")).toBe(
      "/projects/loan-calculator/",
    );
  });

  it("builds iframe src with GitHub Pages base", () => {
    expect(buildPlaygroundFrameSrc("/pet-projects", "weather-widget")).toBe(
      "/pet-projects/projects/weather-widget/",
    );
  });
});
