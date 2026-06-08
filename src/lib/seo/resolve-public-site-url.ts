/** Resolves the public site origin used for canonical and Open Graph absolute URLs. */
export function resolvePublicSiteUrl(
  publicSiteUrl: string | undefined,
  devFallback: string,
): string {
  const trimmed = publicSiteUrl?.trim();
  if (trimmed) {
    return trimmed.replace(/\/$/, "");
  }
  return devFallback.replace(/\/$/, "");
}
