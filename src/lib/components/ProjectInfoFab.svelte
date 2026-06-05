<script lang="ts">
  interface Props {
    open: boolean;
    onfabclick: () => void;
  }

  let { open, onfabclick }: Props = $props();

  const label = $derived(
    open ? "Hide project details" : "Show project details",
  );
</script>

<button
  type="button"
  data-testid="project-info-fab"
  aria-expanded={open}
  aria-controls="project-info-surface"
  aria-label={label}
  class="project-info-fab"
  onclick={onfabclick}
>
  <span class="project-info-fab__icon" aria-hidden="true">
    <svg
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  </span>
</button>

<style>
  .project-info-fab {
    position: absolute;
    right: 1.5rem;
    bottom: 1.5rem;
    z-index: 60;
    display: flex;
    height: 3rem;
    width: 3rem;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 1px solid rgb(228 228 231);
    background: white;
    color: rgb(39 39 42);
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
    animation: project-info-bounce 3s ease-in-out infinite;
    transition:
      background-color 200ms ease,
      color 200ms ease,
      box-shadow 200ms ease;
  }

  .project-info-fab__icon {
    display: flex;
  }

  .project-info-fab:hover {
    background: rgb(250 250 250);
    color: rgb(24 24 27);
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  .project-info-fab:focus-visible {
    outline: 2px solid rgb(99 102 241);
    outline-offset: 2px;
  }

  @keyframes project-info-bounce {
    0%,
    4%,
    100% {
      transform: translateY(0);
    }

    2% {
      transform: translateY(-8px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .project-info-fab {
      animation: none;
      transition: none;
    }
  }
</style>
