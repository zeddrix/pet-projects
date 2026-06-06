import { expect, type Page } from "@playwright/test";
import { pagesPath } from "../../e2e/fixtures/pages-env";

export const DIBP_BASE = pagesPath("/projects/diamond-in-black-pearl");

export function dibpPath(subpath: string): string {
  const normalized = subpath.startsWith("/") ? subpath.slice(1) : subpath;
  return `${DIBP_BASE}/${normalized}`;
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
  await expect(page.getByTestId("dibp-game-ready")).toHaveText("ready", {
    timeout: 120_000,
  });
}

export async function clickChoice(page: Page, submit: string): Promise<void> {
  await page.getByTestId(`dibp-choice-${submit}`).click();
}

export async function submitName(page: Page, name: string): Promise<void> {
  await page.getByTestId("dibp-name-input").fill(name);
  await page.getByTestId("dibp-name-submit").click();
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
