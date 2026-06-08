import { defineConfig, devices } from "@playwright/test";
import {
  dibpHost,
  dibpPort,
  dibpWebServerUrl,
  sharedWebServerOptions,
  viteDevCommand,
} from "./playwright.shared";

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
    command: viteDevCommand(dibpPort),
    url: dibpWebServerUrl,
    ...sharedWebServerOptions,
  },
});
