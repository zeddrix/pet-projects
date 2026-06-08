import { expect, test } from "@playwright/test";
import {
  PAGES_HOME_PATH,
  PAGES_SITE_URL,
  pagesPath,
} from "./fixtures/pages-env";

test.describe("playground SEO metadata", () => {
  test("Given home landing, when loaded, then document head includes author SEO tags", async ({
    page,
  }) => {
    await page.goto(PAGES_HOME_PATH);

    await expect(page).toHaveTitle(/Zeddrix Fabian \| Pet Projects Playground/);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /Zeddrix Fabian/);

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", `${PAGES_SITE_URL}`);

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute(
      "content",
      /Zeddrix Fabian \| Pet Projects Playground/,
    );
  });

  test("Given project route, when user opens loan calculator, then head tags match project", async ({
    page,
  }) => {
    await page.goto(pagesPath("/"));
    await page
      .locator('[data-testid="home-project-link"][data-slug="loan-calculator"]')
      .click();

    await expect(page).toHaveURL(/\/project\/loan-calculator$/);
    await expect(page).toHaveTitle(/Loan Calculator — Zeddrix Fabian/);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute(
      "content",
      /Calculate loan payments/,
    );

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute(
      "href",
      `${PAGES_SITE_URL}/project/loan-calculator`,
    );

    await expect(page.getByTestId("sidebar-author-link")).toHaveText(
      "Zeddrix Fabian",
    );
  });

  test("Given built sitemap route, when fetched, then home and project URLs are listed", async ({
    request,
  }) => {
    const response = await request.get(`${PAGES_SITE_URL}/sitemap.xml`);
    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    expect(body).toContain(`${PAGES_SITE_URL}`);
    expect(body).toContain(`${PAGES_SITE_URL}/project/loan-calculator`);
    expect(body).toContain("<urlset");
  });

  test("Given robots route, when fetched, then sitemap URL is advertised", async ({
    request,
  }) => {
    const response = await request.get(`${PAGES_SITE_URL}/robots.txt`);
    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    expect(body).toContain("User-agent: *");
    expect(body).toMatch(/Sitemap: .+\/sitemap\.xml/);
  });
});
