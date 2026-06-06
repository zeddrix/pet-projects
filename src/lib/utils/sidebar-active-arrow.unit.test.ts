import { describe, expect, it } from "vitest";
import { computeSidebarActiveArrowPlacement } from "./sidebar-active-arrow";

const baseInput = {
  containerHeightPx: 400,
  arrowHeightPx: 24,
  edgePaddingPx: 8,
};

describe("computeSidebarActiveArrowPlacement", () => {
  it("returns attached placement centered on visible active item", () => {
    const placement = computeSidebarActiveArrowPlacement({
      ...baseInput,
      itemTopPx: 100,
      itemBottomPx: 148,
    });

    expect(placement.mode).toBe("attached");
    expect(placement.topPx).toBe(112);
  });

  it("returns pinned-top when active item is above the viewport", () => {
    const placement = computeSidebarActiveArrowPlacement({
      ...baseInput,
      itemTopPx: -80,
      itemBottomPx: -20,
    });

    expect(placement.mode).toBe("pinned-top");
    expect(placement.topPx).toBe(8);
  });

  it("returns pinned-bottom when active item is below the viewport", () => {
    const placement = computeSidebarActiveArrowPlacement({
      ...baseInput,
      itemTopPx: 420,
      itemBottomPx: 480,
    });

    expect(placement.mode).toBe("pinned-bottom");
    expect(placement.topPx).toBe(368);
  });

  it("clamps attached placement within container edges", () => {
    const placement = computeSidebarActiveArrowPlacement({
      ...baseInput,
      itemTopPx: 4,
      itemBottomPx: 12,
    });

    expect(placement.mode).toBe("attached");
    expect(placement.topPx).toBe(8);
  });
});
