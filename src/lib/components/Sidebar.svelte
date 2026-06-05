<script lang="ts">
  import { getSortedProjects } from "$lib/data/projects";
  import type { ProjectInfoLayout } from "$lib/types/project";
  import ProjectListItem from "./ProjectListItem.svelte";
  import ProjectInfoLayoutPicker from "./ProjectInfoLayoutPicker.svelte";

  interface Props {
    visible: boolean;
    projectInfoLayout: ProjectInfoLayout;
    onlayoutselect: (layout: ProjectInfoLayout) => void;
    onprojectselect?: () => void;
  }

  let { visible, projectInfoLayout, onlayoutselect, onprojectselect }: Props =
    $props();

  const projects = getSortedProjects();
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
    <p class="mt-1 text-sm text-zinc-500">Pre-AI pet projects</p>
    <ProjectInfoLayoutPicker layout={projectInfoLayout} {onlayoutselect} />
  </header>

  <nav
    data-testid="project-list"
    class="min-h-0 flex-1 overflow-y-auto px-2 py-3"
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

  <footer class="shrink-0 border-t border-zinc-200 px-4 py-3">
    <a
      data-testid="sidebar-repo-link"
      href="https://github.com/zeddrix/pet-projects"
      target="_blank"
      rel="noopener noreferrer"
      class="text-sm font-medium text-zinc-600 transition-colors duration-200 hover:text-zinc-900 hover:underline"
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
