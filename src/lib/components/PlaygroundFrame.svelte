<script lang="ts">
  import { playgroundFrameSrc } from "$lib/utils/playground-frame-src";
  import type { Project } from "$lib/types/project";

  interface Props {
    project: Project;
    demoEntry?: string | null;
  }

  let { project, demoEntry = null }: Props = $props();

  const src = $derived(playgroundFrameSrc(project.slug, demoEntry));
</script>

{#key `${project.slug}:${demoEntry ?? ""}`}
  <iframe
    data-testid="playground-frame"
    title="{project.title} demo"
    {src}
    loading="lazy"
    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    allow="fullscreen"
    class="playground-frame h-full w-full min-h-0 flex-1 border-0"
  ></iframe>
{/key}

<style>
  .playground-frame {
    animation: frame-fade-in 180ms ease-out;
  }

  @keyframes frame-fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .playground-frame {
      animation: none;
    }
  }
</style>
