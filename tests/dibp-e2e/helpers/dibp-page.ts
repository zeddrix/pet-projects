import { expect, type FrameLocator, type Page } from "@playwright/test";
import { pagesPath } from "../../e2e/fixtures/pages-env";

export const DIBP_BASE = pagesPath("/projects/diamond-in-black-pearl");

export function dibpPath(subpath: string): string {
  const normalized = subpath.startsWith("/") ? subpath.slice(1) : subpath;
  return `${DIBP_BASE}/${normalized}`;
}

export function playgroundFrame(page: Page): FrameLocator {
  return page.frameLocator('[data-testid="playground-frame"]');
}

export async function startGameInPlaygroundIframe(
  page: Page,
): Promise<FrameLocator> {
  const frame = playgroundFrame(page);
  await frame.getByTestId("dibp-start-button").click();
  await expect(frame.getByTestId("dibp-game-ready")).toHaveAttribute(
    "data-ready",
    "true",
    { timeout: 120_000 },
  );
  return frame;
}

export async function clearDibpStorage(page: Page): Promise<void> {
  await page.addInitScript(() => {
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith("dibp-")) {
        localStorage.removeItem(key);
      }
    }
  });
}

export async function startGame(page: Page): Promise<void> {
  await page.getByTestId("dibp-start-button").click();
}

export async function waitForGameReady(page: Page): Promise<void> {
  await expect(page.getByTestId("dibp-game-ready")).toHaveAttribute(
    "data-ready",
    "true",
    { timeout: 120_000 },
  );
}

/** Asserts the readiness marker is screen-reader only (no visible "ready" text). */
export async function expectReadyMarkerHidden(page: Page): Promise<void> {
  const marker = page.getByTestId("dibp-game-ready");
  await expect(marker).toHaveAttribute("data-ready", "true");
  await expect(marker).toHaveText("");
  await expect(marker).toHaveClass(/visually-hidden/);
}

export async function clickChoice(page: Page, submit: string): Promise<void> {
  const button = page.getByTestId(`dibp-choice-${submit}`);
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
  await button.click();
}

export async function navigateChoices(
  page: Page,
  choices: string[],
): Promise<void> {
  for (const choice of choices) {
    await clickChoice(page, choice);
  }
}

export async function submitName(page: Page, name: string): Promise<void> {
  await page.getByTestId("dibp-name-input").fill(name);
  await page.getByTestId("dibp-name-submit").click();
}

export async function submitTypedAnswer(
  page: Page,
  text: string,
): Promise<void> {
  await page.locator("#typed-drawer").click();
  await page.getByTestId("dibp-typed-input").fill(text);
  await page.locator("#typed-form button[type='submit']").click();
}

export async function reachBlackPearlCheckpoint(page: Page): Promise<void> {
  await submitTypedAnswer(page, "BLACK PEARL");
  await expectSceneTitle(page, "Black Pearl");
}

export async function typeTerminalLine(
  page: Page,
  line: string,
): Promise<void> {
  const input = page.getByTestId("dibp-terminal-input");
  await input.fill(line);
  await input.press("Enter");
}

export async function expectSceneTitle(
  page: Page,
  titleFragment: string,
): Promise<void> {
  await expect(page.getByTestId("dibp-scene-title")).toContainText(
    titleFragment,
  );
}

export async function expectNarrative(
  page: Page,
  textFragment: string,
): Promise<void> {
  await expect(page.locator("#narrative-log")).toContainText(textFragment);
}

export async function startVisualGameWithName(
  page: Page,
  name = "Hero",
): Promise<void> {
  await page.goto(dibpPath("visual/index.html"));
  await startGame(page);
  await waitForGameReady(page);
  await submitName(page, name);
}
