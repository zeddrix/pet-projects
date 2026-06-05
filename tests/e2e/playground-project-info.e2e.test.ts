import { expect, test } from "@playwright/test";
import { PAGES_DEFAULT_PROJECT_PATH, pagesPath } from "./fixtures/pages-env";

test.describe("playground project info", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGES_DEFAULT_PROJECT_PATH);
    await expect(page.getByTestId("sidebar")).toBeVisible();
    await expect(page.getByTestId("playground-shell")).toHaveAttribute(
      "data-shell-hydrated",
      "true",
    );
  });

  test("Given default project, when user opens and closes info FAB, then modal shows created date", async ({
    page,
  }) => {
    await page.getByTestId("project-info-fab").click();
    const modal = page.getByTestId("project-info-modal");
    await expect(modal).toBeVisible();
    await expect(modal).toContainText("November 2020");
    await expect(page.getByTestId("project-info-panel")).toHaveCount(0);
    await expect(page.getByTestId("project-info-inline")).toHaveCount(0);
    await page.getByTestId("project-info-close").click();
    await expect(modal).toHaveCount(0);
  });

  test("Given blog-app selected, when user opens info modal, then dual-version metadata and folder links appear", async ({
    page,
  }) => {
    await page
      .locator('[data-testid="project-list-item"][data-slug="blog-app"]')
      .click();
    await page.getByTestId("project-info-fab").click();
    const surface = page.getByTestId("project-info-surface");
    await expect(surface).toBeVisible();
    await expect(surface).toContainText("Django");
    await expect(surface).toContainText("SvelteKit");
    await expect(surface).toContainText("GitHub Pages");
    await expect(surface.locator('a[href*="django-original"]')).toBeVisible();
    await expect(surface.locator('a[href*="sveltekit-static"]')).toBeVisible();
  });

  test("Given info modal open, when user presses Escape, then modal is dismissed", async ({
    page,
  }) => {
    await page.getByTestId("project-info-fab").click();
    const modal = page.getByTestId("project-info-modal");
    await expect(modal).toBeVisible();
    await expect(page.getByTestId("project-info-modal-backdrop")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(modal).toHaveCount(0);
  });

  test("Given info open on loan-calculator, when user navigates to weather-widget, then modal stays open with updated content", async ({
    page,
  }) => {
    await page
      .locator('[data-testid="project-list-item"][data-slug="loan-calculator"]')
      .click();
    await page.getByTestId("project-info-fab").click();
    await expect(page.getByTestId("project-info-surface")).toContainText(
      "Loan Calculator",
    );
    await page
      .locator('[data-testid="project-list-item"][data-slug="weather-widget"]')
      .click();
    await expect(page.getByTestId("project-info-modal")).toBeVisible();
    await expect(page.getByTestId("project-info-surface")).toContainText(
      "Weather Widget",
    );
    await expect(page.getByTestId("project-info-surface")).toContainText(
      "OpenWeatherMap",
    );
  });

  test("Given unknown project slug, when page loads, then info FAB is hidden and not-found message shows", async ({
    page,
  }) => {
    await page.goto(pagesPath("/project/nonexistent-slug-xyz"));
    await expect(page.getByTestId("not-found-message")).toBeVisible();
    await expect(page.getByTestId("project-info-fab")).toHaveCount(0);
  });
});
