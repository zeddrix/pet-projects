import { expect, test } from "@playwright/test";
import { pagesPath } from "./fixtures/pages-env";

test.describe("playground deep link", () => {
  test("Given direct /project/loan-calculator URL, when loaded, then iframe targets loan-calculator demo", async ({
    page,
  }) => {
    await page.goto(pagesPath("/project/loan-calculator"));

    await expect(page).toHaveURL(/\/project\/loan-calculator$/);
    await expect(page.getByTestId("playground-frame")).toHaveAttribute(
      "src",
      /loan-calculator\/$/,
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
      /bible-query\/$/,
    );
    await expect(page.getByTestId("playground-title")).toContainText(
      "Bible Query",
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
