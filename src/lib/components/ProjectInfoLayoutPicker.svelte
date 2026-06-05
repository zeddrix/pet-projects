<script lang="ts">
  import { PROJECT_INFO_LAYOUT_OPTIONS } from "$lib/constants/project-info-layout";
  import { writeProjectInfoLayout } from "$lib/stores/project-info-layout";
  import type { ProjectInfoLayout } from "$lib/types/project";

  interface Props {
    layout: ProjectInfoLayout;
    onlayoutselect: (layout: ProjectInfoLayout) => void;
  }

  let { layout, onlayoutselect }: Props = $props();

  function selectLayout(value: ProjectInfoLayout) {
    writeProjectInfoLayout(value);
    onlayoutselect(value);
  }
</script>

<div class="mt-3">
  <p class="text-xs font-semibold uppercase tracking-wide text-zinc-500">
    Project details layout
  </p>
  <div
    data-testid="project-info-layout-picker"
    role="radiogroup"
    aria-label="Project details layout"
    class="mt-2 flex flex-col gap-1.5"
  >
    {#each PROJECT_INFO_LAYOUT_OPTIONS as option (option.value)}
      <button
        type="button"
        data-testid="project-info-layout-option"
        data-layout={option.value}
        role="radio"
        aria-checked={layout === option.value}
        class="layout-option rounded-md border px-2.5 py-2 text-left transition-all duration-200 ease-out motion-reduce:transition-none {layout ===
        option.value
          ? 'layout-option--active border-indigo-300 bg-indigo-50 text-indigo-950'
          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'}"
        onclick={() => selectLayout(option.value)}
      >
        <span class="block text-sm font-medium">{option.label}</span>
        <span class="block text-xs text-zinc-500">{option.helper}</span>
      </button>
    {/each}
  </div>
</div>
