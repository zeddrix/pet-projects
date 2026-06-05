import { expect, test, type Page } from "@playwright/test";
import { PAGES_DEFAULT_PROJECT_PATH, pagesPath } from "./fixtures/pages-env";

type ProjectInfoLayout = "panel" | "modal" | "inline";

async function waitForShellHydrated(page: Page): Promise<void> {
  await expect(page.getByTestId("playground-shell")).toHaveAttribute(
    "data-shell-hydrated",
    "true",
  );
}

async function selectLayout(
  page: Page,
  layout: ProjectInfoLayout,
): Promise<void> {
  await waitForShellHydrated(page);
  await page
    .locator(
      `[data-testid="project-info-layout-option"][data-layout="${layout}"]`,
    )
    .click();
  await expect(page.getByTestId("playground-shell")).toHaveAttribute(
    "data-project-info-layout",
    layout,
  );
}

test.describe("playground project info", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGES_DEFAULT_PROJECT_PATH);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.getByTestId("sidebar")).toBeVisible();
  });

  test("Given default project with Side panel selected, when user opens and closes info FAB, then side panel shows created date", async ({
    page,
  }) => {
    await selectLayout(page, "panel");
    await page.getByTestId("project-info-fab").click();
    const panel = page.getByTestId("project-info-panel");
    await expect(panel).toBeVisible();
    await expect(panel).toContainText("November 2020");
    await expect(page.getByTestId("project-info-modal")).toHaveCount(0);
    await expect(page.getByTestId("project-info-inline")).toHaveCount(0);
    await page.getByTestId("project-info-close").click();
    await expect(panel).toHaveCount(0);
  });

  test("Given Side panel layout, when user opens blog-app info, then dual-version metadata and folder links appear", async ({
    page,
  }) => {
    await selectLayout(page, "panel");
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

  test("Given Modal layout selected, when user opens info then presses Escape, then modal surface is shown and dismissed", async ({
    page,
  }) => {
    await selectLayout(page, "modal");
    await page.getByTestId("project-info-fab").click();
    const modal = page.getByTestId("project-info-modal");
    await expect(modal).toBeVisible();
    await expect(page.getByTestId("project-info-panel")).toHaveCount(0);
    await expect(page.getByTestId("project-info-modal-backdrop")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(modal).toHaveCount(0);
  });

  test("Given Inline layout selected, when user toggles info FAB twice, then inline region expands and collapses", async ({
    page,
  }) => {
    await selectLayout(page, "inline");
    const fab = page.getByTestId("project-info-fab");
    await fab.click();
    const inline = page.getByTestId("project-info-inline");
    await expect(inline).toHaveAttribute("data-expanded", "true");
    await expect(page.getByTestId("project-info-panel")).toHaveCount(0);
    await expect(page.getByTestId("project-info-modal")).toHaveCount(0);
    await expect(page.getByTestId("playground-frame")).toBeVisible();
    await fab.click();
    await expect(inline).toHaveAttribute("data-expanded", "false");
  });

  test("Given Modal layout selected, when page reloads and user opens info, then Modal remains selected and modal opens", async ({
    page,
  }) => {
    await selectLayout(page, "modal");
    await page.reload();
    await expect(page.getByTestId("sidebar")).toBeVisible();
    await waitForShellHydrated(page);
    const modalOption = page.locator(
      '[data-testid="project-info-layout-option"][data-layout="modal"]',
    );
    await expect(page.getByTestId("playground-shell")).toHaveAttribute(
      "data-project-info-layout",
      "modal",
    );
    await expect(modalOption).toHaveAttribute("aria-checked", "true");
    await page.getByTestId("project-info-fab").click();
    await expect(page.getByTestId("project-info-modal")).toBeVisible();
    await expect(page.getByTestId("project-info-panel")).toHaveCount(0);
  });

  test("Given info open on loan-calculator, when user navigates to weather-widget, then info stays open with updated content", async ({
    page,
  }) => {
    await selectLayout(page, "panel");
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
    await expect(page.getByTestId("project-info-panel")).toBeVisible();
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

  test("Given sidebar visible, when user views layout picker, then clear layout labels are shown", async ({
    page,
  }) => {
    const picker = page.getByTestId("project-info-layout-picker");
    await expect(picker).toBeVisible();
    await expect(picker).toContainText("Side panel");
    await expect(picker).toContainText("Modal");
    await expect(picker).toContainText("Inline");
    await expect(picker.getByText("A", { exact: true })).toHaveCount(0);
    await expect(picker.getByText("B", { exact: true })).toHaveCount(0);
    await expect(picker.getByText("C", { exact: true })).toHaveCount(0);
  });
});
