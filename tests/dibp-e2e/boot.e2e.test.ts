import { expect, test } from "@playwright/test";
import { pagesPath } from "../e2e/fixtures/pages-env";
import {
  clearDibpStorage,
  dibpPath,
  startGame,
  startGameInPlaygroundIframe,
  waitForGameReady,
} from "./helpers/dibp-page";

test.describe("DIBP boot", () => {
  test.beforeEach(async ({ page }) => {
    await clearDibpStorage(page);
  });

  test("Given direct terminal URL, when user starts game, then game becomes ready with input enabled", async ({
    page,
  }) => {
    await page.goto(dibpPath("terminal/index.html"));
    await startGame(page);
    await waitForGameReady(page);
    await expect(page.getByTestId("dibp-terminal-loader")).toBeHidden();
    await expect(page.getByTestId("dibp-terminal-input")).toBeEnabled();
  });

  test("Given direct visual URL, when user starts game, then game becomes ready with welcome or name prompt", async ({
    page,
  }) => {
    await page.goto(dibpPath("visual/index.html"));
    await startGame(page);
    await waitForGameReady(page);
    await expect(page.getByTestId("dibp-visual-loader")).toBeHidden();
    await expect(page.getByTestId("dibp-scene-title")).toContainText("Welcome");
    await expect(page.getByTestId("dibp-name-form")).toBeVisible();
    await expect(page.getByTestId("dibp-scene-art")).toHaveAttribute(
      "src",
      /\.webp$/,
    );
  });

  test("Given playground iframe on terminal demo, when user starts game, then frame shows ready signals", async ({
    page,
  }) => {
    await page.goto(
      pagesPath("/project/diamond-in-black-pearl?demo=terminal/"),
    );
    await expect(page.getByTestId("playground-shell")).toHaveAttribute(
      "data-shell-hydrated",
      "true",
    );
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /terminal\/index\.html/,
    );
    const frame = await startGameInPlaygroundIframe(page);
    await expect(frame.getByTestId("dibp-terminal-input")).toBeEnabled();
  });

  test("Given playground visual iframe, when user starts game, then scene art loads as webp", async ({
    page,
  }) => {
    await page.goto(pagesPath("/project/diamond-in-black-pearl?demo=visual/"));
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /visual\/index\.html/,
    );
    const frame = await startGameInPlaygroundIframe(page);
    await expect(frame.getByTestId("dibp-scene-art")).toHaveAttribute(
      "src",
      /\.webp$/,
    );
    await expect(frame.getByTestId("dibp-scene-title")).toContainText(
      "Welcome",
    );
  });

  test("Given playground visual iframe booted, when user clicks first choice, then scene title updates", async ({
    page,
  }) => {
    await page.goto(pagesPath("/project/diamond-in-black-pearl?demo=visual/"));
    const frame = await startGameInPlaygroundIframe(page);
    await frame.getByTestId("dibp-name-input").fill("Hero");
    await frame.getByTestId("dibp-name-submit").click();
    await frame.getByTestId("dibp-choice-RIGHT").click();
    await expect(frame.getByTestId("dibp-scene-title")).toContainText(
      "Scorpion",
    );
  });

  test("Given terminal loading, when user starts game, then boot status advances beyond tap start", async ({
    page,
  }) => {
    await page.goto(dibpPath("terminal/index.html"));
    const status = page.getByTestId("dibp-boot-status");
    await expect(status).toContainText(/Tap Start/i);

    await startGame(page);
    await expect
      .poll(async () => (await status.textContent()) ?? "", {
        timeout: 120_000,
      })
      .not.toBe("Tap Start to play");

    await waitForGameReady(page);
  });

  test("Given launcher before play, when page idle, then Pyodide is not requested", async ({
    page,
  }) => {
    const pyodideRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("pyodide")) {
        pyodideRequests.push(request.url());
      }
    });

    await page.goto(dibpPath("index.html"));
    await expect(page.getByTestId("dibp-launcher")).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(pyodideRequests).toHaveLength(0);
  });
});
