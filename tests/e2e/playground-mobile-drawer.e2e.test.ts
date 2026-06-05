import { expect, test } from "@playwright/test";
import { PAGES_DEFAULT_PROJECT_PATH } from "./fixtures/pages-env";

test.use({ viewport: { width: 375, height: 667 } });

test.describe("playground mobile drawer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGES_DEFAULT_PROJECT_PATH);
    await page.evaluate(() => sessionStorage.clear());
    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(page.getByTestId("sidebar-toggle")).toHaveAttribute(
      "aria-label",
      "Show sidebar",
    );
    await expect(page.getByTestId("playground-shell")).toHaveAttribute(
      "data-sidebar-visible",
      "false",
    );
  });

  test("Given mobile viewport, when toggle opens drawer and user selects project, then navigation updates and drawer closes", async ({
    page,
  }) => {
    const shell = page.getByTestId("playground-shell");

    await page.getByTestId("sidebar-toggle").click();
    await expect(shell).toHaveAttribute("data-sidebar-visible", "true");
    await expect(page.getByTestId("mobile-drawer-backdrop")).toBeVisible();

    await page
      .locator('[data-testid="project-list-item"][data-slug="booklist"]')
      .click();
    await expect(page).toHaveURL(/\/project\/booklist$/);
    await expect(page.getByTestId("playground-title")).toContainText(
      "Book List",
    );
    await expect(shell).toHaveAttribute("data-sidebar-visible", "false");
  });

  test("Given mobile drawer open, when backdrop clicked, then drawer closes", async ({
    page,
  }) => {
    const shell = page.getByTestId("playground-shell");

    await page.getByTestId("sidebar-toggle").click();
    await expect(shell).toHaveAttribute("data-sidebar-visible", "true");

    const backdrop = page.getByTestId("mobile-drawer-backdrop");
    await expect(backdrop).toBeVisible();
    await backdrop.click({ position: { x: 340, y: 80 } });
    await expect(shell).toHaveAttribute("data-sidebar-visible", "false");
  });
});
