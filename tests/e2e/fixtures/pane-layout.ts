import { expect, type Locator } from "@playwright/test";

const CENTER_TOLERANCE_PX = 4;

export async function expectHorizontallyCentered(
  container: Locator,
  content: Locator,
): Promise<void> {
  const containerBox = await container.boundingBox();
  const contentBox = await content.boundingBox();

  expect(containerBox).not.toBeNull();
  expect(contentBox).not.toBeNull();

  const containerCenter = containerBox!.x + containerBox!.width / 2;
  const contentCenter = contentBox!.x + contentBox!.width / 2;

  expect(Math.abs(containerCenter - contentCenter)).toBeLessThan(
    CENTER_TOLERANCE_PX,
  );
}
