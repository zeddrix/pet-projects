import { describe, expect, it } from "vitest";
import { getProjectSlugs } from "./projects";
import {
  FALLBACK_SIDEBAR_THEME,
  getProjectSidebarTheme,
  isFallbackSidebarTheme,
} from "./project-sidebar-themes";

const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

describe("project sidebar themes", () => {
  it("returns word-counter palette matching the demo colors", () => {
    const theme = getProjectSidebarTheme("word-counter");

    expect(theme).toEqual({
      primary: "#3497be",
      accent: "#f3e410",
      primaryDark: "#1e5b74",
    });
  });

  it("returns a defined palette for every manifest slug", () => {
    for (const slug of getProjectSlugs()) {
      const theme = getProjectSidebarTheme(slug);

      expect(isFallbackSidebarTheme(theme)).toBe(false);
      expect(theme.primary).toMatch(HEX_COLOR_PATTERN);
      expect(theme.accent).toMatch(HEX_COLOR_PATTERN);
      expect(theme.primaryDark).toMatch(HEX_COLOR_PATTERN);
    }
  });

  it("returns fallback theme for unknown slug without throwing", () => {
    expect(getProjectSidebarTheme("missing-project")).toEqual(
      FALLBACK_SIDEBAR_THEME,
    );
  });
});
