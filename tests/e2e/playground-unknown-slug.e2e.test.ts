import { expect, test } from "@playwright/test";
import { pagesPath } from "./fixtures/pages-env";

test.describe("playground unknown slug", () => {
  test("Given /project/nonexistent, when loaded, then in-shell 404 message and intact layout", async ({
    page,
  }) => {
    await page.goto(pagesPath("/project/nonexistent-slug-xyz"));

    await expect(page.getByTestId("playground-shell")).toBeVisible();
    await expect(page.getByTestId("not-found-message")).toBeVisible();
    await expect(page.getByTestId("playground-frame")).toHaveCount(0);
    await expect(page.getByTestId("sidebar")).toBeVisible();
  });
});
