import { defineConfig, devices } from "@playwright/test";
import {
  e2eHost,
  e2ePort,
  e2eWebServerUrl,
  sharedWebServerOptions,
  viteDevCommand,
} from "./playwright.shared";

export default defineConfig({
  testDir: "tests/e2e",
  testMatch: "**/*.e2e.test.ts",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  use: {
    ...devices["Desktop Chrome"],
    baseURL: e2eHost,
    trace: "off",
  },
  webServer: {
    command: viteDevCommand(e2ePort),
    url: e2eWebServerUrl,
    ...sharedWebServerOptions,
  },
});
