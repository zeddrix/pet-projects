import { describe, expect, it } from "vitest";
import {
  monorepoAboutAuthorName,
  monorepoAboutSections,
  PLAYGROUND_LIVE_URL,
} from "./monorepo-about-copy";

describe("monorepoAboutSections", () => {
  it("includes expected section ids in order", () => {
    expect(monorepoAboutSections.map((section) => section.id)).toEqual([
      "what-is",
      "inside",
      "shipped",
      "reflection",
    ]);
  });

  it("links to the live playground and GitHub repo", () => {
    const links = monorepoAboutSections.flatMap((section) =>
      section.paragraphs.flatMap((paragraph) =>
        paragraph.filter((part) => part.kind === "link"),
      ),
    );

    expect(links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "link",
          href: "https://github.com/zeddrix/pet-projects",
        }),
        expect.objectContaining({
          kind: "link",
          href: PLAYGROUND_LIVE_URL,
        }),
        expect.objectContaining({
          kind: "link",
          href: "https://zeddrix.github.io/portfolio/",
        }),
      ]),
    );
  });

  it("exposes the author name for SEO copy", () => {
    expect(monorepoAboutAuthorName).toBe("Zeddrix Fabian");
  });
});
