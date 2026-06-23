import { expect, test } from "@playwright/test";
import { demoIframeSrcPattern, pagesPath } from "./fixtures/pages-env";

test.describe("playground deep link", () => {
  test("Given direct /project/justcolor URL, when loaded, then iframe targets justcolor demo", async ({
    page,
  }) => {
    await page.goto(pagesPath("/project/justcolor"));

    await expect(page).toHaveURL(/\/project\/justcolor$/);
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      demoIframeSrcPattern("justcolor"),
    );
    await expect(page.getByTestId("playground-title")).toContainText(
      "JustColor!",
    );
  });

  test("Given direct /project/loan-calculator URL, when loaded, then iframe targets loan-calculator demo", async ({
    page,
  }) => {
    await page.goto(pagesPath("/project/loan-calculator"));

    await expect(page).toHaveURL(/\/project\/loan-calculator$/);
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      demoIframeSrcPattern("loan-calculator"),
    );
    await expect(page.getByTestId("playground-title")).toContainText(
      "Loan Calculator",
    );
  });

  test("Given direct /project/bible-query URL, when loaded, then iframe targets bible-query demo", async ({
    page,
  }) => {
    await page.goto(pagesPath("/project/bible-query"));

    await expect(page).toHaveURL(/\/project\/bible-query$/);
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      demoIframeSrcPattern("bible-query"),
    );
    await expect(page.getByTestId("playground-title")).toContainText(
      "Bible Query",
    );
  });

  test("Given direct /project/jw-guitar-templates URL, when loaded, then iframe targets jw-guitar demo", async ({
    page,
  }) => {
    await page.goto(pagesPath("/project/jw-guitar-templates"));

    await expect(page).toHaveURL(/\/project\/jw-guitar-templates$/);
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      demoIframeSrcPattern("jw-guitar-templates"),
    );
    await expect(page.getByTestId("playground-title")).toContainText(
      "JW Guitar Templates",
    );
  });

  test("Given direct /project/github-finder-jsx URL, when loaded, then iframe targets jsx demo", async ({
    page,
  }) => {
    await page.goto(pagesPath("/project/github-finder-jsx"));

    await expect(page).toHaveURL(/\/project\/github-finder-jsx$/);
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      demoIframeSrcPattern("github-finder-jsx"),
    );
    await expect(page.getByTestId("playground-title")).toContainText(
      "GitHub Finder (JSX)",
    );
  });

  test("Given direct diamond-in-black-pearl visual demo URL, when loaded, then iframe targets visual mode", async ({
    page,
  }) => {
    await page.goto(pagesPath("/project/diamond-in-black-pearl?demo=visual/"));
    await expect(page.getByTestId("playground-shell")).toHaveAttribute(
      "data-shell-hydrated",
      "true",
    );

    await expect(page).toHaveURL(/\/project\/diamond-in-black-pearl/);
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /diamond-in-black-pearl\/visual\/index\.html$/,
    );
    await expect(page.getByTestId("playground-title")).toContainText(
      "Diamond in Black Pearl",
    );
  });
});
