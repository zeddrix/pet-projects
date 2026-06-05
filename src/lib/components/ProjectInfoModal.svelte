<script lang="ts">
  import ProjectInfoContent from "./ProjectInfoContent.svelte";
  import type { Project } from "$lib/types/project";

  interface Props {
    project: Project;
    open: boolean;
    onmodalclose: () => void;
  }

  let { project, open, onmodalclose }: Props = $props();
</script>

{#if open}
  <div
    id="project-info-surface"
    data-testid="project-info-surface"
    class="project-info-modal-host"
    aria-label="Project details"
  >
    <button
      type="button"
      data-testid="project-info-modal-backdrop"
      class="project-info-modal-backdrop"
      aria-label="Close project details modal"
      onclick={onmodalclose}
    ></button>

    <div
      data-testid="project-info-modal"
      class="project-info-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-info-modal-title"
    >
      <div
        class="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4"
      >
        <h2
          id="project-info-modal-title"
          class="text-base font-semibold text-zinc-900"
        >
          Project details
        </h2>
        <button
          type="button"
          data-testid="project-info-close"
          class="rounded-md px-2 py-1 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          aria-label="Close project details"
          onclick={onmodalclose}
        >
          Close
        </button>
      </div>
      <div class="max-h-[70vh] overflow-y-auto px-5 py-4">
        <ProjectInfoContent {project} />
      </div>
    </div>
  </div>
{/if}

<style>
  .project-info-modal-host {
    position: absolute;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .project-info-modal-backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background: rgb(0 0 0 / 0.45);
    cursor: pointer;
  }

  .project-info-modal {
    position: relative;
    z-index: 1;
    width: min(100%, 28rem);
    border-radius: 0.75rem;
    border: 1px solid rgb(228 228 231);
    background: white;
    box-shadow:
      0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    animation: project-info-modal-in 200ms ease-out;
  }

  @keyframes project-info-modal-in {
    from {
      opacity: 0;
      transform: scale(0.96) translateY(8px);
    }

    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .project-info-modal {
      animation: none;
    }
  }
</style>
