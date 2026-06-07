/**
 * Resolve SvelteKit base path for blog-app static preview builds.
 * Wrapper CI sets BASE_PATH=/pet-projects; inner preview must use
 * /pet-projects/projects/blog-app, not the wrapper root alone.
 *
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {string}
 */
export function resolveBlogAppBasePath(env = process.env) {
  if (env.BLOG_APP_BASE_PATH) {
    return env.BLOG_APP_BASE_PATH.replace(/\/$/, "");
  }

  const wrapperBase = (env.BASE_PATH ?? "/pet-projects").replace(/\/$/, "");
  return `${wrapperBase}/projects/blog-app`;
}

/**
 * CRA 4 (react-scripts@4) requires Node 16.
 *
 * @param {string} [nodeVersion]
 * @returns {number}
 */
export function parseNodeMajor(nodeVersion = process.version) {
  return Number.parseInt(nodeVersion.slice(1).split(".")[0] ?? "0", 10);
}

/**
 * @param {string} [nodeVersion]
 * @returns {boolean}
 */
export function isCra4NodeVersion(nodeVersion = process.version) {
  return parseNodeMajor(nodeVersion) === 16;
}

/**
 * @param {string} [nodeVersion]
 * @returns {string | null} Error message when Node is unsuitable for CRA 4
 */
export function cra4NodeVersionError(nodeVersion = process.version) {
  if (isCra4NodeVersion(nodeVersion)) {
    return null;
  }

  return (
    `github-finder-jsx CRA 4 build requires Node 16; current ${nodeVersion}. ` +
    "In CI, run setup-node with node-version: 16 before this script. " +
    "Locally, use nvm or similar to switch to Node 16."
  );
}
