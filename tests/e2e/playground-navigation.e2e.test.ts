import { expect, test } from "@playwright/test";
import { PAGES_DEFAULT_PROJECT_PATH } from "./fixtures/pages-env";

test.describe("playground navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGES_DEFAULT_PROJECT_PATH);
    await expect(page.getByTestId("sidebar")).toBeVisible();
  });

  test("Given app open, when user clicks two different sidebar items, then iframe src and title update", async ({
    page,
  }) => {
    await page
      .locator('[data-testid="project-list-item"][data-slug="loan-calculator"]')
      .click();
    await expect(page).toHaveURL(/\/project\/loan-calculator$/);
    await expect(page.getByTestId("playground-title")).toContainText(
      "Loan Calculator",
    );
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /loan-calculator\/$/,
    );

    await page
      .locator('[data-testid="project-list-item"][data-slug="weather-widget"]')
      .click();
    await expect(page).toHaveURL(/\/project\/weather-widget$/);
    await expect(page.getByTestId("playground-title")).toContainText(
      "Weather Widget",
    );
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /weather-widget\/$/,
    );
  });

  test("Given sidebar list, when user opens deprecated project, then deprecated badge is visible", async ({
    page,
  }) => {
    await page
      .locator('[data-testid="project-list-item"][data-slug="github-finder"]')
      .click();
    await expect(page).toHaveURL(/\/project\/github-finder$/);
    await expect(page.getByTestId("deprecated-badge")).toBeVisible();
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /github-finder\/$/,
    );
  });

  test("Given active project, when list item selected, then active state updates", async ({
    page,
  }) => {
    await page
      .locator('[data-testid="project-list-item"][data-slug="tracalorie"]')
      .click();
    const activeItem = page.locator(
      '[data-testid="project-list-item"][data-slug="tracalorie"]',
    );
    await expect(activeItem).toHaveAttribute("data-active", "true");
    await expect(activeItem).toHaveAttribute("aria-current", "page");
  });
});
