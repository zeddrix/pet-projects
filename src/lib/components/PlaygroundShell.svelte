<script lang="ts">
  import { onMount } from "svelte";
  import {
    resolveSidebarVisible,
    writeSidebarVisible,
  } from "$lib/stores/sidebar-visible";
  import { DESKTOP_MEDIA_QUERY } from "$lib/constants/sidebar";
  import Sidebar from "./Sidebar.svelte";
  import PlaygroundFrame from "./PlaygroundFrame.svelte";
  import type { Project } from "$lib/types/project";

  interface Props {
    project: Project | null;
  }

  let { project }: Props = $props();

  let sidebarVisible = $state(true);

  onMount(() => {
    sidebarVisible = resolveSidebarVisible();
  });

  function setSidebarVisible(visible: boolean) {
    sidebarVisible = visible;
    writeSidebarVisible(visible);
  }

  function handleSidebarToggle() {
    setSidebarVisible(!sidebarVisible);
  }

  function handleProjectSelect() {
    if (!window.matchMedia(DESKTOP_MEDIA_QUERY).matches) {
      setSidebarVisible(false);
    }
  }

  function handleBackdropClick() {
    setSidebarVisible(false);
  }

  const toggleLabel = $derived(
    sidebarVisible ? "Hide sidebar" : "Show sidebar",
  );
</script>

<div
  data-testid="playground-shell"
  data-sidebar-visible={sidebarVisible ? "true" : "false"}
  class="relative flex h-[100dvh] overflow-hidden bg-white font-sans"
>
  <div
    class="relative z-40 w-0 shrink-0 overflow-visible transition-[width] duration-300 ease-in-out motion-reduce:transition-none
      {sidebarVisible ? 'md:w-72' : ''}"
  >
    <Sidebar visible={sidebarVisible} onprojectselect={handleProjectSelect} />

    {#if sidebarVisible}
      <button
        type="button"
        data-testid="sidebar-toggle"
        aria-expanded={sidebarVisible}
        aria-controls="playground-sidebar"
        aria-label={toggleLabel}
        class="sidebar-edge-toggle sidebar-edge-toggle--attached"
        onclick={handleSidebarToggle}
      >
        <span aria-hidden="true">&lt;</span>
      </button>
    {/if}
  </div>

  {#if !sidebarVisible}
    <button
      type="button"
      data-testid="sidebar-toggle"
      aria-expanded={sidebarVisible}
      aria-controls="playground-sidebar"
      aria-label={toggleLabel}
      class="sidebar-edge-toggle sidebar-edge-toggle--detached"
      onclick={handleSidebarToggle}
    >
      <span aria-hidden="true">&gt;</span>
    </button>
  {/if}

  {#if sidebarVisible}
    <button
      type="button"
      data-testid="mobile-drawer-backdrop"
      class="fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 ease-in-out motion-reduce:transition-none md:hidden"
      aria-label="Close sidebar"
      onclick={handleBackdropClick}
    ></button>
  {/if}

  <main
    data-testid="main-pane"
    class="relative z-10 flex min-w-0 flex-1 flex-col transition-[margin] duration-300 ease-in-out motion-reduce:transition-none"
  >
    <header
      data-testid="playground-top-bar"
      class="relative z-50 flex shrink-0 items-center gap-4 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-sm"
    >
      {#if project}
        <div class="min-w-0 flex-1">
          <h2
            data-testid="playground-title"
            class="truncate text-lg font-semibold text-slate-900 transition-opacity duration-200 ease-in-out motion-reduce:transition-none"
          >
            {project.title}
          </h2>
        </div>
        <a
          data-testid="source-link"
          href={project.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="shrink-0 text-sm text-slate-600 transition-colors duration-200 hover:text-slate-900 hover:underline"
        >
          View source
        </a>
      {:else}
        <h2 class="text-lg font-semibold text-slate-900">Project not found</h2>
      {/if}
    </header>

    <div class="flex min-h-0 flex-1 flex-col">
      {#if project}
        <PlaygroundFrame {project} />
      {:else}
        <div
          data-testid="not-found-message"
          class="flex flex-1 items-center justify-center p-8 text-center text-slate-600"
        >
          <p>
            This project is not in the playground catalog. Pick another demo
            from the sidebar.
          </p>
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
  .sidebar-edge-toggle {
    position: absolute;
    top: 50%;
    z-index: 50;
    display: flex;
    height: 2.25rem;
    width: 1.75rem;
    translate: 0 -50%;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(203 213 225);
    background: white;
    font-size: 0.875rem;
    font-weight: 600;
    color: rgb(51 65 85);
    box-shadow: 0 1px 2px rgb(15 23 42 / 0.08);
    transition:
      background-color 200ms ease,
      color 200ms ease,
      border-color 200ms ease,
      box-shadow 200ms ease;
  }

  .sidebar-edge-toggle:hover {
    background: rgb(248 250 252);
    color: rgb(15 23 42);
    box-shadow: 0 2px 6px rgb(15 23 42 / 0.12);
  }

  .sidebar-edge-toggle:focus-visible {
    outline: 2px solid rgb(100 116 139);
    outline-offset: 2px;
  }

  .sidebar-edge-toggle--attached {
    right: -0.875rem;
    border-radius: 0 0.375rem 0.375rem 0;
  }

  .sidebar-edge-toggle--detached {
    position: fixed;
    left: 0;
    border-radius: 0 0.375rem 0.375rem 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .sidebar-edge-toggle {
      transition: none;
    }
  }
</style>
