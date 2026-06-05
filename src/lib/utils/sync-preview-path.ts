export interface PreviewManifest {
  sourceSubpath: string;
}

/** Resolves the on-disk source folder for syncing a project slug to static. */
export function resolveProjectSyncSource(
  slug: string,
  manifest: PreviewManifest | null,
): string {
  if (manifest?.sourceSubpath) {
    return `${slug}/${manifest.sourceSubpath}`;
  }

  return slug;
}
