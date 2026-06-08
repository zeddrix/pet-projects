/**
 * Whether a response Content-Type should be read as text in live deploy checks.
 *
 * @param {string} contentType
 * @returns {boolean}
 */
export function isTextContentType(contentType) {
  return (
    contentType.includes("text/html") ||
    contentType.includes("application/json") ||
    contentType.includes("application/xml") ||
    contentType.includes("text/xml") ||
    contentType.includes("text/plain")
  );
}

/**
 * Normalize CRA asset-manifest file paths for URL joining.
 *
 * @param {string} manifestPath
 * @returns {string}
 */
export function normalizeManifestAssetPath(manifestPath) {
  return manifestPath.replace(/^\.\//, "").replace(/^\//, "");
}

/**
 * Join site base URL with a path segment without double slashes.
 *
 * @param {string} siteBase
 * @param {string} path
 * @returns {string}
 */
export function joinSitePath(siteBase, path) {
  const normalizedBase = siteBase.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

/**
 * @param {number} value
 * @param {number} fallback
 * @returns {number}
 */
export function parsePositiveInt(value, fallback) {
  if (value === undefined || value === "") {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

/**
 * Sleep helper for retry backoff.
 *
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Run an async check with retries (for Pages CDN propagation lag).
 *
 * @template T
 * @param {() => Promise<T>} fn
 * @param {(result: T) => boolean} isSuccess
 * @param {{ retries?: number, delayMs?: number, onRetry?: (attempt: number, result: T) => void }} [options]
 * @returns {Promise<T>}
 */
export async function withRetries(fn, isSuccess, options = {}) {
  const retries = options.retries ?? 1;
  const delayMs = options.delayMs ?? 0;
  let lastResult = await fn();

  for (
    let attempt = 1;
    attempt < retries && !isSuccess(lastResult);
    attempt += 1
  ) {
    options.onRetry?.(attempt, lastResult);
    if (delayMs > 0) {
      await sleep(delayMs);
    }
    lastResult = await fn();
  }

  return lastResult;
}
