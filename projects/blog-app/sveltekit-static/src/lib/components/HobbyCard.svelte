<script lang="ts">
  import { base } from "$app/paths";
  import type { Hobby } from "$lib/data/hobbies";

  interface Props {
    hobby: Hobby;
  }

  let { hobby }: Props = $props();
</script>

<div class="col-md-4 mb-4">
  <div class="card h-100 hobby-card">
    <img src="{base}{hobby.image}" class="card-img-top" alt={hobby.alt} />
    <div class="card-body">
      <p class="card-text">{hobby.description}</p>
    </div>
  </div>
</div>
