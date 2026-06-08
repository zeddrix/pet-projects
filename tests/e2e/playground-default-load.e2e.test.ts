import { expect, test } from "@playwright/test";
import {
  PAGES_DEFAULT_PROJECT_PATH,
  PAGES_HOME_PATH,
  demoIframeSrcPattern,
} from "./fixtures/pages-env";

test.describe("playground default load", () => {
  test("Given app open at /, when page settles, then landing shows author and project index", async ({
    page,
  }) => {
    await page.goto(PAGES_HOME_PATH);

    await expect(page).toHaveURL(new RegExp(`/pet-projects/?$`));
    await expect(page.getByTestId("home-landing")).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: "Zeddrix Fabian" }),
    ).toBeVisible();
    await expect(page.getByTestId("home-project-index")).toBeVisible();
    await expect(page.getByTestId("home-project-link")).toHaveCount(16);
  });

  test("Given landing open playground CTA, when clicked, then shell loads default project", async ({
    page,
  }) => {
    await page.goto(PAGES_HOME_PATH);
    await page.getByTestId("home-open-playground").click();

    await expect(page).toHaveURL(new RegExp(`/project/github-finder-jsx$`));
    await expect(page.getByTestId("playground-shell")).toBeVisible();

    const iframe = page.getByTestId("playground-frame");
    await expect(iframe).toBeVisible();
    const iframeSrc = await iframe.getAttribute("src");
    expect(iframeSrc).toMatch(demoIframeSrcPattern("github-finder-jsx"));
  });

  test("Given direct default project URL, when loaded, then shell and iframe are ready", async ({
    page,
  }) => {
    await page.goto(PAGES_DEFAULT_PROJECT_PATH);

    await expect(page.getByTestId("playground-shell")).toBeVisible();
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /github-finder-jsx/,
    );
    await expect(page.getByTestId("project-list")).toBeVisible();
  });
});
