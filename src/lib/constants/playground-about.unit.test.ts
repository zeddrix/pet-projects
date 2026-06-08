import { describe, expect, it } from "vitest";
import { readPlaygroundAboutView } from "./playground-about";

describe("readPlaygroundAboutView", () => {
  it("returns true when view=about is present", () => {
    expect(
      readPlaygroundAboutView("https://example.test/pet-projects/?view=about"),
    ).toBe(true);
  });

  it("returns false for the default home URL", () => {
    expect(readPlaygroundAboutView("https://example.test/pet-projects/")).toBe(
      false,
    );
  });
});
