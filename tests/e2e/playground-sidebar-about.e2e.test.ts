import { expect, test } from "@playwright/test";
import { PAGES_DEFAULT_PROJECT_PATH } from "./fixtures/pages-env";

test.describe("playground sidebar about", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGES_DEFAULT_PROJECT_PATH);
    await expect(page.getByTestId("sidebar")).toBeVisible();
    await expect(page.getByTestId("playground-shell")).toHaveAttribute(
      "data-shell-hydrated",
      "true",
    );
  });

  test("Given playground open, when user clicks sidebar about button, then blog-app projects demo loads in iframe", async ({
    page,
  }) => {
    await page.getByTestId("sidebar-about-button").click();
    await expect(page).toHaveURL(/\/project\/blog-app\?demo=projects\.html$/);
    await expect(page.getByTestId("playground-title")).toContainText(
      "Blog App",
    );
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /blog-app\/projects\.html$/,
    );
  });

  test("Given about navigation complete, when user opens project info FAB, then modal still works", async ({
    page,
  }) => {
    await page.getByTestId("sidebar-about-button").click();
    await expect(page).toHaveURL(/\/project\/blog-app/);
    await page.getByTestId("project-info-fab").click();
    await expect(page.getByTestId("project-info-modal")).toBeVisible();
    await expect(page.getByTestId("project-info-surface")).toContainText(
      "Blog App",
    );
    await page.getByTestId("project-info-close").click();
    await expect(page.getByTestId("project-info-modal")).toHaveCount(0);
  });
});
