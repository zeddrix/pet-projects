import { writable } from "svelte/store";
import {
  DESKTOP_MEDIA_QUERY,
  SIDEBAR_STORAGE_KEY,
} from "$lib/constants/sidebar";

function hasSessionStorage(): boolean {
  return typeof window !== "undefined" && typeof sessionStorage !== "undefined";
}

export function getDefaultSidebarVisible(): boolean {
  if (!hasSessionStorage()) {
    return true;
  }
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

export function readSidebarVisible(): boolean | null {
  if (!hasSessionStorage()) {
    return null;
  }
  const stored = sessionStorage.getItem(SIDEBAR_STORAGE_KEY);
  if (stored === null) {
    return null;
  }
  if (stored === "true") {
    return true;
  }
  if (stored === "false") {
    return false;
  }
  return null;
}

export function writeSidebarVisible(visible: boolean): void {
  if (!hasSessionStorage()) {
    return;
  }
  sessionStorage.setItem(SIDEBAR_STORAGE_KEY, String(visible));
}

export function resolveSidebarVisible(): boolean {
  const stored = readSidebarVisible();
  if (stored !== null) {
    return stored;
  }
  return getDefaultSidebarVisible();
}

export function createSidebarVisibleStore() {
  const { subscribe, set, update } = writable(resolveSidebarVisible());

  return {
    subscribe,
    set: (visible: boolean) => {
      writeSidebarVisible(visible);
      set(visible);
    },
    toggle: () => {
      update((current) => {
        const next = !current;
        writeSidebarVisible(next);
        return next;
      });
    },
    hydrate: () => {
      set(resolveSidebarVisible());
    },
  };
}
