import { buildAppPath } from "./build-app-path";

export class ProjectReadmeFetchError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "ProjectReadmeFetchError";
  }
}

/** Builds the static README URL for a project slug. */
export function projectReadmeUrl(base: string, slug: string): string {
  return buildAppPath(base, `/projects/${slug}/README.md`);
}

/** Fetches a project README from the synced static projects folder. */
export async function fetchProjectReadme(
  base: string,
  slug: string,
): Promise<string> {
  const response = await fetch(projectReadmeUrl(base, slug));

  if (!response.ok) {
    throw new ProjectReadmeFetchError(
      `Failed to load README for ${slug}`,
      response.status,
    );
  }

  return response.text();
}
