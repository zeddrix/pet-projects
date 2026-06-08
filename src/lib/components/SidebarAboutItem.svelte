<script lang="ts">
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import { PLAYGROUND_ABOUT_VIEW_PARAM } from "$lib/constants/playground-about";
  import { appPath } from "$lib/utils/app-path";

  interface Props {
    onselect?: () => void;
  }

  let { onselect }: Props = $props();

  const href = $derived(appPath(`/?view=${PLAYGROUND_ABOUT_VIEW_PARAM}`));

  const isActive = $derived.by(() => {
    const pathname = $page.url.pathname;
    const normalizedPath = pathname.replace(/\/$/, "") || "/";
    const normalizedHome = (base || "/").replace(/\/$/, "") || "/";
    const isHome = normalizedPath === normalizedHome;
    return (
      isHome &&
      $page.url.searchParams.get("view") === PLAYGROUND_ABOUT_VIEW_PARAM
    );
  });
</script>

<a
  {href}
  data-testid="sidebar-about-item"
  data-active={isActive ? "true" : "false"}
  aria-current={isActive ? "page" : undefined}
  class="sidebar-about-item block rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm"
  onclick={onselect}
>
  <span class="font-medium">About this monorepo</span>
  <p class="mt-0.5 text-sm text-zinc-600">
    What pet-projects is and how to explore it
  </p>
</a>

<style>
  .sidebar-about-item:focus-visible {
    outline: 2px solid rgb(99 102 241);
    outline-offset: 2px;
  }

  .sidebar-about-item[data-active="true"] {
    border-color: rgb(99 102 241);
    background: rgb(238 242 255);
  }
</style>
