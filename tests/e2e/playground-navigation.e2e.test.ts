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

  test("Given sidebar list, when user opens blog-app, then iframe src targets blog-app preview", async ({
    page,
  }) => {
    await page
      .locator('[data-testid="project-list-item"][data-slug="blog-app"]')
      .click();
    await expect(page).toHaveURL(/\/project\/blog-app$/);
    await expect(page.getByTestId("playground-title")).toContainText(
      "Blog App",
    );
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /blog-app\/$/,
    );
  });

  test("Given sidebar list, when user opens microposts, then iframe src targets microposts preview", async ({
    page,
  }) => {
    await page
      .locator('[data-testid="project-list-item"][data-slug="microposts"]')
      .click();
    await expect(page).toHaveURL(/\/project\/microposts$/);
    await expect(page.getByTestId("playground-title")).toContainText(
      "Microposts",
    );
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /microposts\/$/,
    );
  });

  test("Given sidebar list, when user opens diamond-in-black-pearl, then iframe src targets launcher", async ({
    page,
  }) => {
    await page
      .locator(
        '[data-testid="project-list-item"][data-slug="diamond-in-black-pearl"]',
      )
      .click();
    await expect(page).toHaveURL(/\/project\/diamond-in-black-pearl$/);
    await expect(page.getByTestId("playground-title")).toContainText(
      "Diamond in Black Pearl",
    );
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /diamond-in-black-pearl\/$/,
    );
  });

  test("Given sidebar list, when user opens devcamper-api, then readme pane is shown instead of iframe", async ({
    page,
  }) => {
    await page
      .locator('[data-testid="project-list-item"][data-slug="devcamper-api"]')
      .click();
    await expect(page).toHaveURL(/\/project\/devcamper-api$/);
    await expect(page.getByTestId("playground-title")).toContainText(
      "DevCamper API",
    );
    await expect(page.getByTestId("playground-readme")).toBeVisible();
    await expect(page.getByTestId("playground-frame")).toHaveCount(0);
    await expect(page.getByTestId("playground-readme")).toContainText(
      "DevCamper API",
    );
  });
});
