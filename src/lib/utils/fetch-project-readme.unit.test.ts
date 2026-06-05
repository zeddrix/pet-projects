import { afterEach, describe, expect, it, vi } from "vitest";
import {
  fetchProjectReadme,
  projectReadmeUrl,
  ProjectReadmeFetchError,
} from "./fetch-project-readme";

describe("projectReadmeUrl", () => {
  it("builds readme path under static projects", () => {
    expect(projectReadmeUrl("/pet-projects", "devcamper-api")).toBe(
      "/pet-projects/projects/devcamper-api/README.md",
    );
  });
});

describe("fetchProjectReadme", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns readme text when fetch succeeds", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        text: async () => "# DevCamper API",
      }),
    );

    await expect(fetchProjectReadme("", "devcamper-api")).resolves.toBe(
      "# DevCamper API",
    );
  });

  it("throws ProjectReadmeFetchError when fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      }),
    );

    await expect(
      fetchProjectReadme("", "devcamper-api"),
    ).rejects.toBeInstanceOf(ProjectReadmeFetchError);
  });
});
