import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import {
  clearDibpStorage,
  clickChoice,
  dibpPath,
  expectSceneTitle,
  reachBlackPearlCheckpoint,
  startGame,
  submitName,
  submitTypedAnswer,
  typeTerminalLine,
  waitForGameReady,
} from "./helpers/dibp-page";

const winPathFixture = JSON.parse(
  readFileSync(
    resolve(
      import.meta.dirname,
      "../../projects/diamond-in-black-pearl/tests/fixtures/win-path.json",
    ),
    "utf8",
  ),
) as { visualChoices: string[]; terminalInputs: string[] };

const WIN_TERMINAL_INPUTS = winPathFixture.terminalInputs;
const WIN_VISUAL_CHOICES = winPathFixture.visualChoices;

test.describe("DIBP visual journeys", () => {
  test.beforeEach(async ({ page }) => {
    await clearDibpStorage(page);
  });

  test("Given visual demo loaded, when player wins via choices, then victory scene appears", async ({
    page,
  }) => {
    await page.goto(dibpPath("visual/index.html"));
    await startGame(page);
    await waitForGameReady(page);
    await submitName(page, "Hero");
    for (const choice of WIN_VISUAL_CHOICES) {
      await clickChoice(page, choice);
    }
    await expectSceneTitle(page, "Victory");
    await expect(page.getByTestId("dibp-scene-title")).toContainText("Victory");
    await expect(page.getByTestId("dibp-scene-art")).toHaveAttribute(
      "src",
      /\.webp$/,
    );
    await expect(page.locator("#narrative-log")).toContainText("GAME OVER");
  });

  test("Given jungle fork, when player goes LEFT then BACK, then jungle fork returns", async ({
    page,
  }) => {
    await page.goto(dibpPath("visual/index.html"));
    await startGame(page);
    await waitForGameReady(page);
    await submitName(page, "Hero");
    await clickChoice(page, "LEFT");
    await expectSceneTitle(page, "Deadly Lake");
    await clickChoice(page, "BACK");
    await expectSceneTitle(page, "Uncharted Jungle");
  });

  test("Given scorpion road, when player walks, then death and intro restart", async ({
    page,
  }) => {
    await page.goto(dibpPath("visual/index.html"));
    await startGame(page);
    await waitForGameReady(page);
    await submitName(page, "Hero");
    await clickChoice(page, "RIGHT");
    await clickChoice(page, "WALK");
    await expectSceneTitle(page, "You Died");
    await clickChoice(page, "YES");
    await expect(page.getByTestId("dibp-name-form")).toBeVisible();
    await expectSceneTitle(page, "Welcome");
  });

  test("Given checkpoint death, when player restarts YES, then pirate checkpoint returns", async ({
    page,
  }) => {
    await page.goto(dibpPath("visual/index.html"));
    await startGame(page);
    await waitForGameReady(page);
    await submitName(page, "Hero");
    await reachBlackPearlCheckpoint(page);
    await clickChoice(page, "LOOK");
    await clickChoice(page, "PUNCH");
    await expectSceneTitle(page, "Checkpoint");
    await clickChoice(page, "YES");
    await expectSceneTitle(page, "Black Pearl");
  });

  test("Given sound toggle, when user enables it, then aria-pressed becomes true", async ({
    page,
  }) => {
    await page.goto(dibpPath("visual/index.html"));
    await startGame(page);
    await waitForGameReady(page);
    const toggle = page.getByTestId("dibp-sound-toggle");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await submitName(page, "Hero");
    await clickChoice(page, "RIGHT");
    await expect(
      page.locator('[data-testid="dibp-ambient-audio"]'),
    ).toHaveCount(1, { timeout: 10_000 });
  });

  test("Given jungle fork, when player types Black Pearl, then ship checkpoint appears", async ({
    page,
  }) => {
    await page.goto(dibpPath("visual/index.html"));
    await startGame(page);
    await waitForGameReady(page);
    await submitName(page, "Hero");
    await submitTypedAnswer(page, "BLACK PEARL");
    await expectSceneTitle(page, "Black Pearl");
  });

  test("Given jungle fork after death restart, when map renders, then visited nodes reset", async ({
    page,
  }) => {
    await page.goto(dibpPath("visual/index.html"));
    await startGame(page);
    await waitForGameReady(page);
    await submitName(page, "Hero");
    await clickChoice(page, "RIGHT");
    await expect(
      page.locator('[data-node="road"].map-node--visited'),
    ).toBeVisible();
    await clickChoice(page, "WALK");
    await expectSceneTitle(page, "You Died");
    await clickChoice(page, "YES");
    await expectSceneTitle(page, "Welcome");
    await expect(
      page.locator('[data-node="road"].map-node--visited'),
    ).toHaveCount(0);
  });
});

test.describe("DIBP terminal journeys", () => {
  test.beforeEach(async ({ page }) => {
    await clearDibpStorage(page);
  });

  test("Given terminal demo, when player types win path, then output shows victory", async ({
    page,
  }) => {
    await page.goto(dibpPath("terminal/index.html"));
    await startGame(page);
    await waitForGameReady(page);
    for (const line of WIN_TERMINAL_INPUTS) {
      await typeTerminalLine(page, line);
    }
    await expect(page.locator("#terminal-output")).toContainText("GAME OVER");
    await expect(page.locator("#terminal-output")).toContainText(
      "PINK PANTHER",
    );
  });

  test("Given terminal demo, when player types invalid input, then no-idea message appears", async ({
    page,
  }) => {
    await page.goto(dibpPath("terminal/index.html"));
    await startGame(page);
    await waitForGameReady(page);
    await typeTerminalLine(page, "Hero");
    await typeTerminalLine(page, "MAYBE");
    await expect(page.locator("#terminal-output")).toContainText(
      "NO IDEA WHAT YOU'RE SAYING",
    );
  });

  test("Given terminal death, when player restarts YES, then welcome and name prompt return", async ({
    page,
  }) => {
    await page.goto(dibpPath("terminal/index.html"));
    await startGame(page);
    await waitForGameReady(page);
    await typeTerminalLine(page, "Hero");
    await typeTerminalLine(page, "LEFT");
    await typeTerminalLine(page, "EAT");
    await typeTerminalLine(page, "YES");
    await expect(page.locator("#terminal-output")).toContainText(
      "WELCOME BACK",
    );
    await expect(page.locator("#terminal-output")).toContainText("Name:");
  });
});
