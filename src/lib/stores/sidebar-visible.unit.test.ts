import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getDefaultSidebarVisible,
  readSidebarVisible,
  resolveSidebarVisible,
  writeSidebarVisible,
} from "./sidebar-visible";
import { SIDEBAR_STORAGE_KEY } from "$lib/constants/sidebar";

describe("sidebar-visible storage", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it("round-trips visibility through sessionStorage", () => {
    writeSidebarVisible(false);
    expect(readSidebarVisible()).toBe(false);

    writeSidebarVisible(true);
    expect(readSidebarVisible()).toBe(true);
  });

  it("falls back to default when storage value is invalid", () => {
    sessionStorage.setItem(SIDEBAR_STORAGE_KEY, "not-a-boolean");
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query.includes("min-width: 768px"),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    expect(resolveSidebarVisible()).toBe(getDefaultSidebarVisible());
  });

  it("uses stored value over default when present", () => {
    writeSidebarVisible(false);
    expect(resolveSidebarVisible()).toBe(false);
  });
});
