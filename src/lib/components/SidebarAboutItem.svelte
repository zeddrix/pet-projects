<script lang="ts">
  import { PLAYGROUND_ABOUT_VIEW_PARAM } from "$lib/constants/playground-about";
  import { appPath } from "$lib/utils/app-path";

  interface Props {
    active?: boolean;
    onselect?: () => void;
  }

  let { active = false, onselect }: Props = $props();

  const href = appPath(`/?view=${PLAYGROUND_ABOUT_VIEW_PARAM}`);
</script>

<a
  {href}
  data-testid="sidebar-about-item"
  data-active={active ? "true" : "false"}
  aria-current={active ? "page" : undefined}
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
