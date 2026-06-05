import { expect, test } from "@playwright/test";
import { PAGES_DEFAULT_PROJECT_PATH } from "./fixtures/pages-env";

test.describe("playground base path", () => {
  test("Given BASE_PATH=/pet-projects, when default project route opens, then iframe src includes base segment", async ({
    page,
  }) => {
    await page.goto(PAGES_DEFAULT_PROJECT_PATH);

    const iframe = page.getByTestId("playground-frame");
    const iframeSrc = await iframe.getAttribute("src");
    const resolvedPath = new URL(iframeSrc ?? "", page.url()).pathname;
    expect(resolvedPath).toContain("/pet-projects/projects/");
  });
});
