<script lang="ts">
  import {
    PLAYGROUND_ABOUT_DEMO_ENTRY,
    PLAYGROUND_ABOUT_PROJECT_SLUG,
  } from "$lib/constants/playground-about";
  import { appPath } from "$lib/utils/app-path";

  const aboutHref = appPath(
    `/project/${PLAYGROUND_ABOUT_PROJECT_SLUG}?demo=${PLAYGROUND_ABOUT_DEMO_ENTRY}`,
  );
</script>

<a
  href={aboutHref}
  data-testid="sidebar-about-button"
  aria-label="About this playground"
  class="sidebar-about-button"
>
  <svg
    class="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
</a>

<style>
  .sidebar-about-button {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    padding: 0.25rem;
    color: rgb(113 113 122);
    transition:
      color 200ms ease,
      background-color 200ms ease;
  }

  .sidebar-about-button:hover {
    background: rgb(244 244 245);
    color: rgb(39 39 42);
  }

  .sidebar-about-button:focus-visible {
    outline: 2px solid rgb(99 102 241);
    outline-offset: 2px;
  }
</style>
