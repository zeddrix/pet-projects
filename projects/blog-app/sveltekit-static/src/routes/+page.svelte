<script lang="ts">
  import { email } from "$lib/data/site";
  import { hobbies } from "$lib/data/hobbies";
  import HobbyCard from "$lib/components/HobbyCard.svelte";
</script>

<section class="bg-light py-5 text-center">
  <div class="container py-4">
    <h1 class="display-4 fw-bold mb-3">Hi! I'm Zedd!</h1>
    <p class="lead text-muted mx-auto mb-4" style="max-width: 720px;">
      How are you? My full name's Zeddrix Fabian. I am currently learning Django as I make
      this tutorial--that's the truth. Here are my hobbies and my projects.
    </p>
    <a class="btn btn-primary btn-lg" href="mailto:{email}">Email me</a>
  </div>
</section>

<section class="py-5">
  <div class="container">
    <div class="row">
      {#each hobbies as hobby (hobby.image)}
        <HobbyCard {hobby} />
      {/each}
    </div>
  </div>
</section>
