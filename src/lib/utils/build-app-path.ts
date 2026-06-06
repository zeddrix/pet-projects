/** Pure helper for building in-app paths with a base segment. */
export function buildAppPath(base: string, path: string): string {
  if (path.length === 0) {
    return base || "/";
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Pure helper for building pet demo iframe src (absolute path). */
export function buildPlaygroundFrameSrc(
  base: string,
  slug: string,
  demoEntry?: string | null,
): string {
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  if (demoEntry) {
    const normalizedEntry = demoEntry.endsWith("/")
      ? `${demoEntry}index.html`
      : demoEntry;
    return `${normalizedBase}/projects/${slug}/${normalizedEntry}`;
  }
  return `${normalizedBase}/projects/${slug}/`;
}
