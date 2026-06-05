import { expect, test, type Page } from "@playwright/test";
import { PAGES_DEFAULT_PROJECT_PATH } from "./fixtures/pages-env";

async function waitForShellHydrated(page: Page): Promise<void> {
  await expect(page.getByTestId("playground-shell")).toHaveAttribute(
    "data-shell-hydrated",
    "true",
  );
}

test.describe("playground shell modernization", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGES_DEFAULT_PROJECT_PATH);
    await expect(page.getByTestId("sidebar")).toBeVisible();
    await waitForShellHydrated(page);
  });

  test("Given playground loads, when user views sidebar header, then project details layout picker is visible", async ({
    page,
  }) => {
    await expect(page.getByText("Project details layout")).toBeVisible();
    const picker = page.getByTestId("project-info-layout-picker");
    await expect(picker).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="project-info-layout-option"][data-layout="panel"]',
      ),
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="project-info-layout-option"][data-layout="modal"]',
      ),
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="project-info-layout-option"][data-layout="inline"]',
      ),
    ).toBeVisible();
  });

  test("Given Modal layout selected, when user hides and reopens sidebar, then Modal remains selected", async ({
    page,
  }) => {
    await page
      .locator(
        '[data-testid="project-info-layout-option"][data-layout="modal"]',
      )
      .click();
    await expect(page.getByTestId("playground-shell")).toHaveAttribute(
      "data-project-info-layout",
      "modal",
    );
    await page.getByTestId("sidebar-toggle").click();
    await expect(page.getByTestId("sidebar")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    await page.getByTestId("sidebar-toggle").click();
    await expect(page.getByTestId("sidebar")).toBeVisible();
    await expect(page.getByTestId("playground-shell")).toHaveAttribute(
      "data-project-info-layout",
      "modal",
    );
    await expect(
      page.locator(
        '[data-testid="project-info-layout-option"][data-layout="modal"]',
      ),
    ).toHaveAttribute("aria-checked", "true");
  });
});
