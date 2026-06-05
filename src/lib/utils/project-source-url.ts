const MONOREPO_PROJECTS_BASE =
  "https://github.com/zeddrix/pet-projects/tree/main/projects";

export function buildVariantSourceUrl(
  slug: string,
  folderPath: string,
): string {
  const normalized = folderPath.replace(/^\.\/?/, "").replace(/\/$/, "");
  if (normalized.length === 0) {
    return `${MONOREPO_PROJECTS_BASE}/${slug}`;
  }
  return `${MONOREPO_PROJECTS_BASE}/${slug}/${normalized}`;
}
