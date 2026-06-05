<script lang="ts">
  import { onMount } from "svelte";
  import {
    resolveSidebarVisible,
    writeSidebarVisible,
  } from "$lib/stores/sidebar-visible";
  import { DESKTOP_MEDIA_QUERY } from "$lib/constants/sidebar";
  import Sidebar from "./Sidebar.svelte";
  import PlaygroundFrame from "./PlaygroundFrame.svelte";
  import PlaygroundReadme from "./PlaygroundReadme.svelte";
  import ProjectInfoFab from "./ProjectInfoFab.svelte";
  import ProjectInfoModal from "./ProjectInfoModal.svelte";
  import type { Project } from "$lib/types/project";

  interface Props {
    project: Project | null;
    demoEntry?: string | null;
  }

  let { project, demoEntry = null }: Props = $props();

  let sidebarVisible = $state(true);
  let projectInfoOpen = $state(false);
  let shellHydrated = $state(false);

  const projectInfoState = {
    open: false,
  };

  $effect(() => {
    projectInfoState.open = projectInfoOpen;
  });

  onMount(() => {
    sidebarVisible = resolveSidebarVisible();

    const handleDocumentKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && projectInfoState.open) {
        projectInfoOpen = false;
      }
    };

    document.addEventListener("keydown", handleDocumentKeydown);
    shellHydrated = true;
    return () => document.removeEventListener("keydown", handleDocumentKeydown);
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

  function closeProjectInfo() {
    projectInfoOpen = false;
  }

  const toggleLabel = $derived(
    sidebarVisible ? "Hide sidebar" : "Show sidebar",
  );
</script>

<div
  data-testid="playground-shell"
  data-sidebar-visible={sidebarVisible ? "true" : "false"}
  data-project-info-open={projectInfoOpen ? "true" : "false"}
  data-shell-hydrated={shellHydrated ? "true" : "false"}
  class="relative flex h-[100dvh] overflow-hidden bg-zinc-50 font-sans text-zinc-900"
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
      class="relative z-50 flex shrink-0 items-center gap-4 border-b border-zinc-200/80 bg-white/90 px-4 py-3 backdrop-blur-md"
    >
      {#if project}
        <div class="min-w-0 flex-1">
          <h2
            data-testid="playground-title"
            class="truncate text-lg font-semibold text-zinc-900 transition-opacity duration-200 ease-in-out motion-reduce:transition-none"
          >
            {project.title}
          </h2>
        </div>
        <a
          data-testid="source-link"
          href={project.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="shrink-0 rounded-md px-2 py-1 text-sm font-medium text-zinc-600 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-900"
        >
          View source
        </a>
      {:else}
        <h2 class="text-lg font-semibold text-zinc-900">Project not found</h2>
      {/if}
    </header>

    <div class="relative flex min-h-0 flex-1 flex-col">
      {#if project}
        {#if project.displayMode === "readme"}
          <PlaygroundReadme {project} />
        {:else}
          <PlaygroundFrame {project} {demoEntry} />
        {/if}

        <ProjectInfoModal
          {project}
          open={projectInfoOpen}
          onmodalclose={closeProjectInfo}
        />
      {:else}
        <div
          data-testid="not-found-message"
          class="flex flex-1 items-center justify-center p-8 text-center text-zinc-600"
        >
          <p>
            This project is not in the playground catalog. Pick another demo
            from the sidebar.
          </p>
        </div>
      {/if}
    </div>

    {#if project}
      <ProjectInfoFab
        open={projectInfoOpen}
        onfabclick={() => {
          projectInfoOpen = !projectInfoOpen;
        }}
      />
    {/if}
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
    border: 1px solid rgb(212 212 216);
    background: white;
    font-size: 0.875rem;
    font-weight: 600;
    color: rgb(63 63 70);
    box-shadow: 0 1px 2px rgb(24 24 27 / 0.08);
    transition:
      background-color 200ms ease,
      color 200ms ease,
      border-color 200ms ease,
      box-shadow 200ms ease;
  }

  .sidebar-edge-toggle:hover {
    background: rgb(250 250 250);
    color: rgb(24 24 27);
    box-shadow: 0 2px 6px rgb(24 24 27 / 0.12);
  }

  .sidebar-edge-toggle:focus-visible {
    outline: 2px solid rgb(99 102 241);
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
