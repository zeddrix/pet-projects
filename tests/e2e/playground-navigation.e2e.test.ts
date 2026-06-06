import { expect, test, type Locator } from "@playwright/test";
import { PAGES_DEFAULT_PROJECT_PATH } from "./fixtures/pages-env";

function projectListItem(page: import("@playwright/test").Page, slug: string) {
  return page.locator(`[data-testid="project-list-item"][data-slug="${slug}"]`);
}

async function backgroundLuminance(locator: Locator): Promise<number> {
  return locator.evaluate((element) => {
    const rgb = getComputedStyle(element).backgroundColor.match(/\d+/g);
    if (!rgb || rgb.length < 3) {
      return 0;
    }
    const [r, g, b] = rgb.map(Number);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  });
}

test.describe("playground navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGES_DEFAULT_PROJECT_PATH);
    await expect(page.getByTestId("sidebar")).toBeVisible();
  });

  test("Given app open, when user clicks two different sidebar items, then iframe src and title update", async ({
    page,
  }) => {
    await projectListItem(page, "loan-calculator").click();
    await expect(page).toHaveURL(/\/project\/loan-calculator$/);
    await expect(page.getByTestId("playground-title")).toContainText(
      "Loan Calculator",
    );
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /loan-calculator\/$/,
    );
    await expect(projectListItem(page, "loan-calculator")).toHaveAttribute(
      "data-sidebar-primary",
      "#343a40",
    );

    await projectListItem(page, "weather-widget").click();
    await expect(page).toHaveURL(/\/project\/weather-widget$/);
    await expect(page.getByTestId("playground-title")).toContainText(
      "Weather Widget",
    );
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /weather-widget\/$/,
    );
    await expect(projectListItem(page, "weather-widget")).toHaveAttribute(
      "data-sidebar-primary",
      "#007bff",
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

  test("Given playground loaded, when user selects word-counter, then theme tokens and navigation update", async ({
    page,
  }) => {
    await projectListItem(page, "word-counter").click();
    const activeItem = projectListItem(page, "word-counter");
    await expect(page).toHaveURL(/\/project\/word-counter$/);
    await expect(page.getByTestId("playground-title")).toContainText(
      "Word Counter",
    );
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /word-counter\/$/,
    );
    await expect(activeItem).toHaveAttribute("data-active", "true");
    await expect(activeItem).toHaveAttribute("data-sidebar-primary", "#3497be");
    await expect(activeItem).toHaveAttribute("data-sidebar-accent", "#f3e410");
  });

  test("Given word-counter active, when user selects loan-calculator, then active theme applies and inactive item uses lighter tint", async ({
    page,
  }) => {
    await projectListItem(page, "word-counter").click();
    await expect(projectListItem(page, "word-counter")).toHaveAttribute(
      "data-active",
      "true",
    );

    await projectListItem(page, "loan-calculator").click();
    const loanItem = projectListItem(page, "loan-calculator");
    const wordCounterItem = projectListItem(page, "word-counter");

    await expect(page).toHaveURL(/\/project\/loan-calculator$/);
    await expect(loanItem).toHaveAttribute("data-active", "true");
    await expect(loanItem).toHaveAttribute("aria-current", "page");
    await expect(loanItem).toHaveAttribute("data-sidebar-primary", "#343a40");
    await expect(wordCounterItem).toHaveAttribute("data-active", "false");
    await expect(wordCounterItem).toHaveAttribute(
      "data-sidebar-primary",
      "#3497be",
    );

    const inactiveLuminance = await backgroundLuminance(wordCounterItem);
    const activeLuminance = await backgroundLuminance(loanItem);
    expect(inactiveLuminance).toBeGreaterThan(activeLuminance);
  });

  test("Given loan-calculator active, when user hovers weather-widget then clicks it, then URL updates only after click", async ({
    page,
  }) => {
    await projectListItem(page, "loan-calculator").click();
    await expect(page).toHaveURL(/\/project\/loan-calculator$/);

    const weatherItem = projectListItem(page, "weather-widget");
    await weatherItem.hover();
    await expect(page).toHaveURL(/\/project\/loan-calculator$/);

    await weatherItem.click();
    await expect(page).toHaveURL(/\/project\/weather-widget$/);
    await expect(weatherItem).toHaveAttribute("data-active", "true");
    await expect(weatherItem).toHaveAttribute(
      "data-sidebar-primary",
      "#007bff",
    );
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
