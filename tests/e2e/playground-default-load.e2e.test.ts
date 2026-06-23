import { expect, test } from "@playwright/test";
import {
  PAGES_DEFAULT_PROJECT_PATH,
  PAGES_HOME_PATH,
  demoIframeSrcPattern,
} from "./fixtures/pages-env";

test.describe("playground default load", () => {
  test("Given app open at /, when page settles, then shell shows default demo and SEO content in DOM", async ({
    page,
  }) => {
    await page.goto(PAGES_HOME_PATH);

    await expect(page).toHaveURL(new RegExp(`/pet-projects/?$`));
    await expect(page.getByTestId("playground-shell")).toBeVisible();
    await expect(page.getByTestId("playground-frame")).toBeVisible();

    const iframeSrc = await page
      .getByTestId("playground-frame")
      .getAttribute("src");
    expect(iframeSrc).toMatch(demoIframeSrcPattern("justcolor"));

    await expect(page.getByTestId("home-landing")).toBeAttached();
    await expect(
      page.getByRole("heading", { name: "Zeddrix Fabian" }),
    ).toBeAttached();
    await expect(page.getByTestId("home-project-link")).toHaveCount(17);
    await expect(page.getByTestId("playground-title")).toContainText(
      "JustColor!",
    );
  });

  test("Given direct default project URL, when loaded, then shell and iframe are ready", async ({
    page,
  }) => {
    await page.goto(PAGES_DEFAULT_PROJECT_PATH);

    await expect(page.getByTestId("playground-shell")).toBeVisible();
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /justcolor/,
    );
    await expect(page.getByTestId("project-list")).toBeVisible();
  });
});
