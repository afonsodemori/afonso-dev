<script setup lang="ts">
  const route = useRoute();
  const localePath = useLocalePath();

  const isIndexRoute = computed(() => route.name?.toString().startsWith('index___'));
</script>

<template>
  <header>
    <div class="code">
      <span class="open text-primary-500">&lt;</span>
      <span class="close text-secondary-500">/&gt;</span>
    </div>
    <h1 v-if="isIndexRoute">
      Afonso
      <span class="nowrap">de Mori</span>
    </h1>
    <h1 v-else>
      <NuxtLink :to="localePath('/')">
        Afonso
        <span class="nowrap">de Mori</span>
      </NuxtLink>
    </h1>
    <h2>{{ $t('index.title') }}</h2>
  </header>
</template>

<style scoped>
  header {
    padding: 2rem 1rem;
    text-align: center;
  }

  a {
    color: inherit;
  }

  a:hover {
    text-decoration: underline;
  }

  .code {
    font-weight: 500;
    font-size: 3.5rem;
    margin-bottom: -0.5rem;
  }

  h1 {
    margin: 0.1em auto;
    font-weight: 700;
    font-size: 4em;
  }

  h2 {
    margin: 0;
    font-size: 1.5em;
    /* font-weight: 300; */
  }

  h1,
  h2,
  .code {
    line-height: 1.1em;
  }

  .nowrap {
    white-space: nowrap;
  }
</style>
