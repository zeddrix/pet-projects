import {
  PAGES_BASE_PATH,
  PAGES_SITE_URL,
} from "./tests/e2e/fixtures/pages-env";

export const e2ePort = Number(process.env.PLAYWRIGHT_PORT ?? 7213);
export const dibpPort = Number(process.env.PLAYWRIGHT_DIBP_PORT ?? 7214);
export const e2eHost = `http://127.0.0.1:${e2ePort}`;
export const dibpHost = `http://127.0.0.1:${dibpPort}`;
export const e2eWebServerUrl = `${e2eHost}${PAGES_BASE_PATH}`;
export const dibpWebServerUrl = `${dibpHost}${PAGES_BASE_PATH}`;

export const e2eWebServerEnv = {
  BASE_PATH: PAGES_BASE_PATH,
  PUBLIC_SITE_URL: PAGES_SITE_URL,
};

/**
 * Reuse an already-running dev server locally to avoid port churn when
 * invoking Playwright file-by-file. Set PLAYWRIGHT_FORCE_WEBSERVER=1 to
 * always start a fresh server (CI sets this implicitly via CI=true).
 */
export function shouldReuseExistingServer(): boolean {
  if (process.env.PLAYWRIGHT_FORCE_WEBSERVER === "1") {
    return false;
  }
  if (process.env.CI) {
    return false;
  }
  return true;
}

export const sharedWebServerOptions = {
  reuseExistingServer: shouldReuseExistingServer(),
  timeout: 180_000,
  env: e2eWebServerEnv,
};
