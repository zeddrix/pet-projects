<script lang="ts">
  import { page } from "$app/stores";
  import { getSortedProjects } from "$lib/data/projects";
  import { getProjectSidebarTheme } from "$lib/data/project-sidebar-themes";
  import {
    computeSidebarActiveArrowPlacement,
    SIDEBAR_ACTIVE_ARROW_EDGE_PADDING_PX,
    SIDEBAR_ACTIVE_ARROW_HEIGHT_PX,
    type SidebarActiveArrowMode,
  } from "$lib/utils/sidebar-active-arrow";
  import { appPath } from "$lib/utils/app-path";
  import { AUTHOR_NAME } from "$lib/seo/site-config";
  import ProjectListItem from "./ProjectListItem.svelte";
  import SidebarAboutButton from "./SidebarAboutButton.svelte";
  import SidebarActiveArrow from "./SidebarActiveArrow.svelte";

  interface Props {
    visible: boolean;
    onprojectselect?: () => void;
  }

  let { visible, onprojectselect }: Props = $props();

  const projects = getSortedProjects();

  let projectListElement = $state<HTMLElement | null>(null);
  let arrowTopPx = $state(0);
  let arrowMode = $state<SidebarActiveArrowMode>("attached");
  let arrowVisible = $state(false);

  const activeSlug = $derived.by(() => {
    const pathname = $page.url.pathname;
    const match = pathname.match(/\/project\/([^/]+)$/);
    return match?.[1] ?? null;
  });

  const activeTheme = $derived(
    activeSlug ? getProjectSidebarTheme(activeSlug) : null,
  );

  function updateActiveArrowPosition(): void {
    if (!visible || !projectListElement) {
      arrowVisible = false;
      return;
    }

    const activeItem = projectListElement.querySelector<HTMLElement>(
      '[data-testid="project-list-item"][data-active="true"]',
    );

    if (!activeItem) {
      arrowVisible = false;
      return;
    }

    const containerRect = projectListElement.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const itemTopPx = itemRect.top - containerRect.top;
    const itemBottomPx = itemRect.bottom - containerRect.top;

    const placement = computeSidebarActiveArrowPlacement({
      itemTopPx,
      itemBottomPx,
      containerHeightPx: containerRect.height,
      arrowHeightPx: SIDEBAR_ACTIVE_ARROW_HEIGHT_PX,
      edgePaddingPx: SIDEBAR_ACTIVE_ARROW_EDGE_PADDING_PX,
    });

    arrowTopPx = placement.topPx;
    arrowMode = placement.mode;
    arrowVisible = true;
  }

  function scrollActiveItemIntoView(): void {
    if (!projectListElement) {
      return;
    }

    const activeItem = projectListElement.querySelector<HTMLElement>(
      '[data-testid="project-list-item"][data-active="true"]',
    );

    activeItem?.scrollIntoView({ block: "nearest" });
  }

  function scheduleArrowUpdate(): void {
    requestAnimationFrame(updateActiveArrowPosition);
  }

  $effect(() => {
    const listElement = projectListElement;
    if (!listElement) {
      return;
    }

    listElement.addEventListener("scroll", scheduleArrowUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleArrowUpdate);

    const resizeObserver = new ResizeObserver(scheduleArrowUpdate);
    resizeObserver.observe(listElement);

    scheduleArrowUpdate();

    return () => {
      listElement.removeEventListener("scroll", scheduleArrowUpdate);
      window.removeEventListener("resize", scheduleArrowUpdate);
      resizeObserver.disconnect();
    };
  });

  $effect(() => {
    visible;
    activeSlug;
    projectListElement;

    if (visible && activeSlug && projectListElement) {
      scrollActiveItemIntoView();
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(updateActiveArrowPosition);
    });
  });
</script>

<aside
  id="playground-sidebar"
  data-testid="sidebar"
  aria-hidden={!visible}
  class="sidebar-panel flex h-full w-72 flex-col border-r border-zinc-200 bg-gradient-to-b from-white to-zinc-50
    max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 max-md:shadow-xl md:absolute md:left-0 md:top-0"
>
  <header
    data-testid="sidebar-header"
    class="shrink-0 border-b border-zinc-200 px-4 py-4"
  >
    <h1
      class="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-lg font-semibold text-transparent"
    >
      Playground
    </h1>
    <div class="mt-1 flex items-center gap-2">
      <p class="text-sm text-zinc-500">Pre-AI pet projects</p>
      <SidebarAboutButton />
    </div>
  </header>

  <div
    data-testid="project-list-viewport"
    class="project-list-viewport relative min-h-0 flex-1"
  >
    <nav
      bind:this={projectListElement}
      data-testid="project-list"
      class="h-full overflow-y-auto px-2 py-3"
      aria-label="Pet projects"
    >
      <ul class="space-y-1">
        {#each projects as project (project.slug)}
          <li>
            <ProjectListItem {project} onselect={onprojectselect} />
          </li>
        {/each}
      </ul>
    </nav>

    {#if arrowVisible && activeTheme}
      <SidebarActiveArrow
        topPx={arrowTopPx}
        mode={arrowMode}
        primary={activeTheme.primary}
        accent={activeTheme.accent}
      />
    {/if}
  </div>

  <footer class="shrink-0 space-y-2 border-t border-zinc-200 px-4 py-3">
    <a
      data-testid="sidebar-author-link"
      href={appPath("/")}
      class="block text-sm font-medium text-zinc-700 transition-colors duration-200 hover:text-zinc-900 hover:underline"
    >
      {AUTHOR_NAME}
    </a>
    <a
      data-testid="sidebar-repo-link"
      href="https://github.com/zeddrix/pet-projects"
      target="_blank"
      rel="noopener noreferrer"
      class="block text-sm font-medium text-zinc-600 transition-colors duration-200 hover:text-zinc-900 hover:underline"
    >
      View on GitHub
    </a>
  </footer>
</aside>

<style>
  .sidebar-panel {
    transform: translateX(0);
    transition: transform 300ms ease-in-out;
  }

  aside[aria-hidden="true"] {
    transform: translateX(-100%);
  }

  @media (prefers-reduced-motion: reduce) {
    .sidebar-panel {
      transition: none;
    }
  }
</style>
