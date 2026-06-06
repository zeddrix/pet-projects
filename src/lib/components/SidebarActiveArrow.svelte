<script lang="ts">
  import type { SidebarActiveArrowMode } from "$lib/utils/sidebar-active-arrow";

  interface Props {
    topPx: number;
    mode: SidebarActiveArrowMode;
    primary: string;
    accent: string;
  }

  let { topPx, mode, primary, accent }: Props = $props();

  const arrowStyle = $derived(
    `--arrow-primary: ${primary}; --arrow-accent: ${accent}; top: ${topPx}px;`,
  );
</script>

<div
  data-testid="sidebar-active-arrow"
  data-arrow-mode={mode}
  class="sidebar-active-arrow"
  style={arrowStyle}
  aria-hidden="true"
></div>

<style>
  .sidebar-active-arrow {
    position: absolute;
    right: 0;
    z-index: 10;
    width: 0.75rem;
    height: 1.5rem;
    pointer-events: none;
    background: var(--arrow-primary);
    border: 2px solid var(--arrow-accent);
    border-right: none;
    border-radius: 0.25rem 0 0 0.25rem;
    clip-path: polygon(0 0, 100% 50%, 0 100%);
    box-shadow: -1px 0 2px rgb(0 0 0 / 0.12);
  }

  @media (prefers-reduced-motion: reduce) {
    .sidebar-active-arrow {
      transition: none;
    }
  }
</style>
