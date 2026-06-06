import { expect, test } from "@playwright/test";
import { clearDibpStorage, dibpPath } from "./helpers/dibp-page";

const ORIGINAL_SOURCE_URL =
  "https://github.com/zeddrix/pet-projects/blob/main/projects/diamond-in-black-pearl/original/game.py";

test.describe("DIBP launcher", () => {
  test.beforeEach(async ({ page }) => {
    await clearDibpStorage(page);
  });

  test("Given launcher footer, when user views original source link, then GitHub blob opens in new tab", async ({
    page,
  }) => {
    await page.goto(dibpPath("index.html"));
    const link = page.getByTestId("dibp-original-source-link");
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", ORIGINAL_SOURCE_URL);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("Given launcher footer, when user reads link label, then original path remains readable", async ({
    page,
  }) => {
    await page.goto(dibpPath("index.html"));
    await expect(page.getByTestId("dibp-launcher")).toContainText("python");
    await expect(page.getByTestId("dibp-original-source-link")).toContainText(
      "original/game.py",
    );
  });
});
