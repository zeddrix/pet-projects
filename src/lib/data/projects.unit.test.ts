import { describe, expect, it } from "vitest";
import {
  getDefaultProject,
  getProjectBySlug,
  getProjectSlugs,
  getSortedProjects,
} from "./projects";

describe("projects manifest", () => {
  it("returns project for known slug", () => {
    const project = getProjectBySlug("github-finder-jsx");

    expect(project?.title).toBe("GitHub Finder (JSX)");
    expect(project?.slug).toBe("github-finder-jsx");
  });

  it("returns undefined for unknown slug", () => {
    expect(getProjectBySlug("missing-project")).toBeUndefined();
  });

  it("returns first non-deprecated project as default", () => {
    const project = getDefaultProject();

    expect(project.slug).toBe("github-finder-jsx");
    expect(project.deprecated).toBeUndefined();
  });

  it("returns 14 sorted projects", () => {
    expect(getSortedProjects()).toHaveLength(14);
  });

  it("marks github-finder as deprecated", () => {
    const project = getProjectBySlug("github-finder");

    expect(project?.deprecated).toBe(true);
  });

  it("exposes slugs for prerender entries", () => {
    const slugs = getProjectSlugs();
    expect(slugs).toHaveLength(14);
    expect(slugs).toContain("loan-calculator");
  });

  it("points sourceUrl at monorepo project folders", () => {
    for (const project of getSortedProjects()) {
      expect(project.sourceUrl).toBe(
        `https://github.com/zeddrix/pet-projects/tree/main/projects/${project.slug}`,
      );
    }
  });

  it("marks devcamper-api as readme display mode", () => {
    const project = getProjectBySlug("devcamper-api");

    expect(project?.displayMode).toBe("readme");
  });
});
