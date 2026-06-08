import { expect, test } from "@playwright/test";
import { PAGES_DEFAULT_PROJECT_PATH } from "./fixtures/pages-env";

test.describe("playground shell modernization", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGES_DEFAULT_PROJECT_PATH);
    await expect(page.getByTestId("sidebar")).toBeVisible();
    await expect(page.getByTestId("playground-shell")).toHaveAttribute(
      "data-shell-hydrated",
      "true",
    );
  });

  test("Given playground loads, when user views sidebar header, then about button is visible and layout picker is absent", async ({
    page,
  }) => {
    await expect(page.getByTestId("sidebar-about-button")).toBeVisible();
    await expect(page.getByTestId("sidebar-about-item")).toBeVisible();
    await expect(page.getByText("Pre-AI pet projects")).toBeVisible();
    await expect(page.getByTestId("project-info-layout-picker")).toHaveCount(0);
    await expect(page.getByText("Project details layout")).toHaveCount(0);
  });
});
