export const PLAYGROUND_ABOUT_VIEW_PARAM = "about";

/** Read about view from a location href (client-only; safe during prerender). */
export function readPlaygroundAboutView(href: string): boolean {
  return (
    new URL(href).searchParams.get("view") === PLAYGROUND_ABOUT_VIEW_PARAM
  );
}

export function playgroundAboutHref(basePath: string): string {
  const normalizedBase = basePath.endsWith("/")
    ? basePath.slice(0, -1)
    : basePath;
  const prefix = normalizedBase === "" ? "" : normalizedBase;
  return `${prefix}/?view=${PLAYGROUND_ABOUT_VIEW_PARAM}`;
}
