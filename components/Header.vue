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
    <h2>{{ $t('home.title') }}</h2>
  </header>
</template>

<style scoped>
  header h1,
  header h2,
  header .code {
    line-height: 1.1em;
  }

  header {
    padding: 2rem 0;
    text-align: center;
  }

  h1,
  a {
    color: inherit;
  }

  a:hover {
    text-decoration: underline;
  }

  .home header {
    margin-top: 5em;
  }

  header div.code {
    font-weight: 900;
    font-size: 3.5em;
    font-style: normal;
  }

  header h1 {
    margin: 0.1em auto;
    font-weight: 900;
    font-size: 4em;
  }

  header h2 {
    margin: 0;
    font-size: 1.5em;
    font-weight: 300;
  }
</style>
