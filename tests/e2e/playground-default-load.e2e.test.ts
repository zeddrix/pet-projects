import { expect, test } from "@playwright/test";
import {
  PAGES_DEFAULT_PROJECT_PATH,
  PAGES_HOME_PATH,
  demoIframeSrcPattern,
} from "./fixtures/pages-env";

test.describe("playground default load", () => {
  test("Given app open at /, when page settles, then sidebar visible and iframe shows default slug", async ({
    page,
  }) => {
    await page.goto(PAGES_HOME_PATH);

    await expect(page).toHaveURL(new RegExp(`/project/github-finder-jsx$`));

    await expect(page.getByTestId("playground-shell")).toHaveAttribute(
      "data-sidebar-visible",
      "true",
    );

    const iframe = page.getByTestId("playground-frame");
    await expect(iframe).toBeVisible();
    const iframeSrc = await iframe.getAttribute("src");
    expect(iframeSrc).toMatch(demoIframeSrcPattern("github-finder-jsx"));
    const resolvedSrc = new URL(iframeSrc ?? "", page.url()).pathname;
    expect(resolvedSrc).toContain(
      "/pet-projects/projects/github-finder-jsx/index.html",
    );

    await expect(page.getByTestId("playground-title")).toContainText(
      "GitHub Finder (JSX)",
    );
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
