import { afterEach, describe, expect, it, vi } from "vitest";
import {
  DEFAULT_PROJECT_INFO_LAYOUT,
  PROJECT_INFO_LAYOUT_STORAGE_KEY,
} from "$lib/constants/project-info-layout";
import {
  resolveProjectInfoLayout,
  writeProjectInfoLayout,
} from "./project-info-layout";

describe("project info layout storage", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("returns default layout when storage is empty", () => {
    expect(resolveProjectInfoLayout()).toBe(DEFAULT_PROJECT_INFO_LAYOUT);
  });

  it("persists selected layout to localStorage", () => {
    writeProjectInfoLayout("modal");
    expect(localStorage.getItem(PROJECT_INFO_LAYOUT_STORAGE_KEY)).toBe("modal");
    expect(resolveProjectInfoLayout()).toBe("modal");
  });

  it("falls back to default for invalid stored values", () => {
    localStorage.setItem(PROJECT_INFO_LAYOUT_STORAGE_KEY, "invalid");
    expect(resolveProjectInfoLayout()).toBe(DEFAULT_PROJECT_INFO_LAYOUT);
  });

  it("falls back to default when localStorage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(resolveProjectInfoLayout()).toBe(DEFAULT_PROJECT_INFO_LAYOUT);
  });
});
