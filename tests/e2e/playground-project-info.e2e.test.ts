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
    await expect(modal).toContainText("April 2020");
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

  test("Given justcolor selected, when user opens info modal, then created date, version labels, tech stack, and archive note appear", async ({
    page,
  }) => {
    await page
      .locator('[data-testid="project-list-item"][data-slug="justcolor"]')
      .click();
    await page.getByTestId("project-info-fab").click();
    const surface = page.getByTestId("project-info-surface");
    await expect(surface).toBeVisible();
    await expect(surface).toContainText("JustColor!");
    await expect(surface).toContainText("April 2020");
    await expect(surface).toContainText("SvelteKit");
    await expect(surface).toContainText("git history");
    await expect(surface).toContainText("zeddrix/justcolor");
    await expect(
      surface.getByRole("link", { name: "View in monorepo" }),
    ).toBeVisible();
  });

  test("Given bible-query selected, when user opens info modal, then created date, tech stack, and archive note appear", async ({
    page,
  }) => {
    await page
      .locator('[data-testid="project-list-item"][data-slug="bible-query"]')
      .click();
    await page.getByTestId("project-info-fab").click();
    const surface = page.getByTestId("project-info-surface");
    await expect(surface).toBeVisible();
    await expect(surface).toContainText("Bible Query");
    await expect(surface).toContainText("May 2020");
    await expect(surface).toContainText("Vanilla JS");
    await expect(surface).toContainText("Custom fonts");
    await expect(surface).toContainText("git history");
    await expect(surface).toContainText("zeddrix/bible-query");
    await expect(
      surface.locator('a[href*="pet-projects/tree/main/projects/bible-query"]'),
    ).toBeVisible();
  });

  test("Given diamond-in-black-pearl selected, when user opens info modal, then triple-version metadata and archive note appear", async ({
    page,
  }) => {
    await page
      .locator(
        '[data-testid="project-list-item"][data-slug="diamond-in-black-pearl"]',
      )
      .click();
    await page.getByTestId("project-info-fab").click();
    const surface = page.getByTestId("project-info-surface");
    await expect(surface).toBeVisible();
    await expect(surface).toContainText("Diamond in Black Pearl");
    await expect(surface).toContainText("June 2020");
    await expect(surface).toContainText("Python CLI game");
    await expect(surface).toContainText("Browser terminal");
    await expect(surface).toContainText("Visual adventure");
    await expect(surface).toContainText("git history");
    await expect(surface).toContainText("zeddrix/diamond-in-black-pearl");
    await expect(surface.locator('a[href*="original"]')).toBeVisible();
    await expect(surface.locator('a[href*="terminal"]')).toBeVisible();
    await expect(surface.locator('a[href*="visual"]')).toBeVisible();
  });

  test("Given unknown project slug, when page loads, then info FAB is hidden and not-found message shows", async ({
    page,
  }) => {
    await page.goto(pagesPath("/project/nonexistent-slug-xyz"));
    await expect(page.getByTestId("not-found-message")).toBeVisible();
    await expect(page.getByTestId("project-info-fab")).toHaveCount(0);
  });
});
