<script lang="ts">
  import ProjectInfoContent from "./ProjectInfoContent.svelte";
  import type { Project } from "$lib/types/project";

  interface Props {
    project: Project;
    open: boolean;
    onpanelclose: () => void;
  }

  let { project, open, onpanelclose }: Props = $props();
</script>

{#if open}
  <button
    type="button"
    data-testid="project-info-panel-backdrop"
    class="project-info-panel-backdrop"
    aria-label="Close project details panel"
    onclick={onclose}
  ></button>

  <aside
    id="project-info-surface"
    data-testid="project-info-surface"
    class="project-info-panel-host"
    aria-label="Project details"
  >
    <div data-testid="project-info-panel" class="project-info-panel">
      <div
        class="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4"
      >
        <h2 class="text-base font-semibold text-zinc-900">Project details</h2>
        <button
          type="button"
          data-testid="project-info-close"
          class="rounded-md px-2 py-1 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          aria-label="Close project details"
          onclick={onpanelclose}
        >
          Close
        </button>
      </div>
      <div class="overflow-y-auto px-5 py-4">
        <ProjectInfoContent {project} />
      </div>
    </div>
  </aside>
{/if}

<style>
  .project-info-panel-backdrop {
    position: absolute;
    inset: 0;
    z-index: 45;
    border: 0;
    background: rgb(0 0 0 / 0.2);
    cursor: pointer;
  }

  .project-info-panel-host {
    position: absolute;
    inset: 0;
    z-index: 50;
    pointer-events: none;
  }

  .project-info-panel {
    pointer-events: auto;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    height: 100%;
    width: min(100%, 24rem);
    flex-direction: column;
    border-left: 1px solid rgb(228 228 231);
    background: white;
    box-shadow: -8px 0 24px rgb(0 0 0 / 0.08);
    animation: project-info-panel-slide 250ms ease-out;
  }

  @keyframes project-info-panel-slide {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .project-info-panel {
      animation: none;
    }
  }
</style>
