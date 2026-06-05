import { expect, test } from "@playwright/test";
import { PAGES_DEFAULT_PROJECT_PATH } from "./fixtures/pages-env";

test.describe("playground sidebar toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGES_DEFAULT_PROJECT_PATH);
    await page.evaluate(() => sessionStorage.clear());
    await page.reload();
    await page.waitForLoadState("networkidle");
    const toggle = page.getByTestId("sidebar-toggle");
    await expect(toggle).toHaveAttribute("aria-label", "Hide sidebar");
    await expect(page.getByTestId("playground-shell")).toHaveAttribute(
      "data-sidebar-visible",
      "true",
    );
  });

  test("Given sidebar visible, when user clicks toggle twice, then sidebar hidden then visible and aria-expanded matches", async ({
    page,
  }) => {
    const shell = page.getByTestId("playground-shell");

    await page.getByTestId("sidebar-toggle").click();
    const hiddenToggle = page.getByTestId("sidebar-toggle");
    await expect(hiddenToggle).toHaveAttribute("aria-label", "Show sidebar");
    await expect(shell).toHaveAttribute("data-sidebar-visible", "false");
    await expect(hiddenToggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByTestId("sidebar")).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    await hiddenToggle.click();
    const visibleToggle = page.getByTestId("sidebar-toggle");
    await expect(visibleToggle).toHaveAttribute("aria-label", "Hide sidebar");
    await expect(shell).toHaveAttribute("data-sidebar-visible", "true");
    await expect(visibleToggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByTestId("sidebar")).toHaveAttribute(
      "aria-hidden",
      "false",
    );
  });

  test("Given sidebar hidden, when user reloads, then sidebar still hidden", async ({
    page,
  }) => {
    const shell = page.getByTestId("playground-shell");

    await page.getByTestId("sidebar-toggle").click();
    await expect(shell).toHaveAttribute("data-sidebar-visible", "false");

    await page.reload();

    await expect(shell).toHaveAttribute("data-sidebar-visible", "false");
    await expect(page.getByTestId("sidebar-toggle")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    await expect(page.getByTestId("sidebar")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
