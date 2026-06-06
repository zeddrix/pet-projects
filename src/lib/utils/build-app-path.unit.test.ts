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

  it("builds iframe src with demo entry", () => {
    expect(buildPlaygroundFrameSrc("", "blog-app", "projects.html")).toBe(
      "/projects/blog-app/projects.html",
    );
  });

  it("builds iframe src with demo entry and GitHub Pages base", () => {
    expect(
      buildPlaygroundFrameSrc("/pet-projects", "blog-app", "projects.html"),
    ).toBe("/pet-projects/projects/blog-app/projects.html");
  });

  it("appends index.html for demo entry directories", () => {
    expect(
      buildPlaygroundFrameSrc(
        "/pet-projects",
        "diamond-in-black-pearl",
        "visual/",
      ),
    ).toBe("/pet-projects/projects/diamond-in-black-pearl/visual/index.html");
  });
});
