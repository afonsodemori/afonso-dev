<script setup lang="ts">
  definePageMeta({ layout: 'base' });
</script>

<template>
  <main>
    <NavbarDropdown />
    <Header />
    <div class="bio">
      <p>{{ $t('index.bio') }}</p>
    </div>
    <HomeFooter />
  </main>
</template>

<style scoped>
  main {
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
  }

  .bio {
    margin: 2rem auto;
    max-width: 700px;
    text-align: center;
    font-weight: 200;
    font-size: 110%;
  }

  @media only screen and (min-width: 1200px) {
    main {
      font-size: 120%;
    }

    .bio {
      max-width: 910px;
      font-size: 120%;
      line-height: 1.6;
    }
  }

  @media only screen and (max-width: 600px) {
    main {
      padding: 1rem;
    }
  }
</style>
