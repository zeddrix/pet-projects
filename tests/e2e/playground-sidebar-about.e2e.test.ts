import { expect, test } from "@playwright/test";
import { expectHorizontallyCentered } from "./fixtures/pane-layout";
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

  test("Given playground open, when user clicks sidebar about button, then wrapper about pane loads", async ({
    page,
  }) => {
    await page.getByTestId("sidebar-about-button").click();
    await expect(page).toHaveURL(/\/pet-projects\/?\?view=about$/);
    await expect(page.getByTestId("playground-title")).toContainText(
      "About this monorepo",
    );
    await expect(
      page.getByRole("heading", { name: "Zeddrix Fabian" }),
    ).toBeVisible();
    await expect(page.getByTestId("playground-frame")).toHaveCount(0);
    await expect(page.getByText("What is pet-projects?")).toBeVisible();
  });

  test("Given playground open, when user clicks sidebar about item, then about pane is active", async ({
    page,
  }) => {
    await page.getByTestId("sidebar-about-item").click();
    await expect(page).toHaveURL(/\/pet-projects\/?\?view=about$/);
    await expect(page.getByTestId("sidebar-about-item")).toHaveAttribute(
      "data-active",
      "true",
    );
    await expect(page.getByText("What you will find")).toBeVisible();
  });

  test("Given playground open, when user opens about pane, then about content is centered in main view", async ({
    page,
  }) => {
    await page.getByTestId("sidebar-about-button").click();
    await expect(page).toHaveURL(/\/pet-projects\/?\?view=about$/);
    await expect(page.getByTestId("about-pane-content")).toBeVisible();

    await expectHorizontallyCentered(
      page.getByTestId("home-landing"),
      page.getByTestId("about-pane-content"),
    );
  });
});
