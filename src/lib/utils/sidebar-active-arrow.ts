export type SidebarActiveArrowMode =
  | "attached"
  | "pinned-top"
  | "pinned-bottom";

export interface SidebarActiveArrowPlacement {
  topPx: number;
  mode: SidebarActiveArrowMode;
}

export const SIDEBAR_ACTIVE_ARROW_HEIGHT_PX = 24;
export const SIDEBAR_ACTIVE_ARROW_EDGE_PADDING_PX = 8;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function computeSidebarActiveArrowPlacement(input: {
  itemTopPx: number;
  itemBottomPx: number;
  containerHeightPx: number;
  arrowHeightPx: number;
  edgePaddingPx: number;
}): SidebarActiveArrowPlacement {
  const {
    itemTopPx,
    itemBottomPx,
    containerHeightPx,
    arrowHeightPx,
    edgePaddingPx,
  } = input;

  const maxTop = Math.max(
    edgePaddingPx,
    containerHeightPx - arrowHeightPx - edgePaddingPx,
  );

  if (itemBottomPx <= 0) {
    return {
      topPx: edgePaddingPx,
      mode: "pinned-top",
    };
  }

  if (itemTopPx >= containerHeightPx) {
    return {
      topPx: maxTop,
      mode: "pinned-bottom",
    };
  }

  const itemCenter = (itemTopPx + itemBottomPx) / 2;
  const attachedTop = clamp(
    itemCenter - arrowHeightPx / 2,
    edgePaddingPx,
    maxTop,
  );

  return {
    topPx: attachedTop,
    mode: "attached",
  };
}
