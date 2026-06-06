import { defineConfig, devices } from "@playwright/test";
import {
  PAGES_BASE_PATH,
  PAGES_SITE_URL,
} from "./tests/e2e/fixtures/pages-env";

const dibpPort = 7214;
const dibpHost = `http://127.0.0.1:${dibpPort}`;
const dibpAppURL = `${dibpHost}${PAGES_BASE_PATH}`;

export default defineConfig({
  testDir: "tests/dibp-e2e",
  testMatch: "**/*.e2e.test.ts",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 120_000,
  expect: { timeout: 30_000 },
  use: {
    ...devices["Desktop Chrome"],
    baseURL: dibpHost,
    trace: "off",
  },
  webServer: {
    command: `pnpm dev --host 127.0.0.1 --port ${dibpPort}`,
    url: dibpAppURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      BASE_PATH: PAGES_BASE_PATH,
      PUBLIC_SITE_URL: PAGES_SITE_URL,
    },
  },
});
