import { expect, test } from "@playwright/test";
import {
  PAGES_DEFAULT_PROJECT_PATH,
  demoIframeSrcPattern,
} from "./fixtures/pages-env";

function projectListItem(page: import("@playwright/test").Page, slug: string) {
  return page.locator(`[data-testid="project-list-item"][data-slug="${slug}"]`);
}

async function backgroundMatchesPrimary(
  locator: ReturnType<typeof projectListItem>,
): Promise<boolean> {
  return locator.evaluate((element) => {
    const primary = element.getAttribute("data-sidebar-primary");
    if (!primary || !primary.startsWith("#")) {
      return false;
    }
    const hex = primary.slice(1);
    const expectedR = Number.parseInt(hex.slice(0, 2), 16);
    const expectedG = Number.parseInt(hex.slice(2, 4), 16);
    const expectedB = Number.parseInt(hex.slice(4, 6), 16);
    const rgb = getComputedStyle(element).backgroundColor.match(/\d+/g);
    if (!rgb || rgb.length < 3) {
      return false;
    }
    const [actualR, actualG, actualB] = rgb.map(Number);
    return (
      actualR === expectedR && actualG === expectedG && actualB === expectedB
    );
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
      demoIframeSrcPattern("loan-calculator"),
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
      demoIframeSrcPattern("weather-widget"),
    );
    await expect(projectListItem(page, "weather-widget")).toHaveAttribute(
      "data-sidebar-primary",
      "#007bff",
    );
  });

  test("Given sidebar list, when user opens github-finder, then no deprecated badge and iframe loads", async ({
    page,
  }) => {
    await projectListItem(page, "loan-calculator").click();
    await expect(page).toHaveURL(/\/project\/loan-calculator$/);

    await projectListItem(page, "github-finder").click();
    await expect(page).toHaveURL(/\/project\/github-finder$/);
    await expect(page.getByTestId("deprecated-badge")).toHaveCount(0);
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      demoIframeSrcPattern("github-finder"),
    );
    await expect(page.getByTestId("playground-title")).toContainText(
      "GitHub Finder",
    );
  });

  test("Given playground loaded, when user selects word-counter, then theme tokens navigation and arrow update", async ({
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
      demoIframeSrcPattern("word-counter"),
    );
    await expect(activeItem).toHaveAttribute("data-active", "true");
    await expect(activeItem).toHaveAttribute("data-sidebar-primary", "#3497be");
    await expect(activeItem).toHaveAttribute("data-sidebar-accent", "#f3e410");
    await expect(page.getByTestId("sidebar-active-arrow")).toBeVisible();
    await expect(page.getByTestId("sidebar-active-arrow")).toHaveAttribute(
      "data-arrow-mode",
      "attached",
    );
  });

  test("Given word-counter then loan-calculator selected, when both items viewed, then each uses full primary background and only active item has arrow", async ({
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

    expect(await backgroundMatchesPrimary(loanItem)).toBe(true);
    expect(await backgroundMatchesPrimary(wordCounterItem)).toBe(true);
    await expect(page.getByTestId("sidebar-active-arrow")).toBeVisible();
  });

  test("Given loan-calculator active with arrow, when user clicks weather-widget, then arrow stays attached to new active item", async ({
    page,
  }) => {
    await projectListItem(page, "loan-calculator").click();
    await expect(page.getByTestId("sidebar-active-arrow")).toHaveAttribute(
      "data-arrow-mode",
      "attached",
    );

    await projectListItem(page, "weather-widget").click();
    await expect(page).toHaveURL(/\/project\/weather-widget$/);
    await expect(projectListItem(page, "weather-widget")).toHaveAttribute(
      "data-active",
      "true",
    );
    await expect(projectListItem(page, "loan-calculator")).toHaveAttribute(
      "data-active",
      "false",
    );
    await expect(page.getByTestId("sidebar-active-arrow")).toBeVisible();
    await expect(page.getByTestId("sidebar-active-arrow")).toHaveAttribute(
      "data-arrow-mode",
      "attached",
    );
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

  test("Given devcamper-api selected at list bottom, when user scrolls list up then back down, then arrow pins and re-attaches", async ({
    page,
  }) => {
    await projectListItem(page, "devcamper-api").click();
    await expect(page).toHaveURL(/\/project\/devcamper-api$/);
    await expect(page.getByTestId("sidebar-active-arrow")).toHaveAttribute(
      "data-arrow-mode",
      "attached",
    );

    const projectList = page.getByTestId("project-list");
    await projectList.evaluate((element) => {
      element.scrollTop = 0;
    });
    await expect(page.getByTestId("sidebar-active-arrow")).toHaveAttribute(
      "data-arrow-mode",
      "pinned-bottom",
    );

    await projectList.evaluate((element) => {
      element.scrollTop = element.scrollHeight - element.clientHeight;
    });
    await expect(page.getByTestId("sidebar-active-arrow")).toHaveAttribute(
      "data-arrow-mode",
      "attached",
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
      demoIframeSrcPattern("blog-app"),
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
      demoIframeSrcPattern("microposts"),
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
      demoIframeSrcPattern("diamond-in-black-pearl"),
    );
  });

  test("Given user navigates loan-calculator to bible-query, when bible-query selected, then iframe src updates and frame stays visible", async ({
    page,
  }) => {
    await projectListItem(page, "loan-calculator").click();
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      demoIframeSrcPattern("loan-calculator"),
    );
    await projectListItem(page, "bible-query").click();
    await expect(page).toHaveURL(/\/project\/bible-query$/);
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      demoIframeSrcPattern("bible-query"),
    );
    await expect(page.getByTestId("playground-frame")).toBeVisible();
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
