<script setup lang="ts">
  useHead({
    htmlAttrs: {
      lang: 'en',
    },
    title: 'afonso.dev',
    meta: [
      { name: 'description', content: '' },
      { name: 'keywords', content: '' },
    ],
  });
</script>

<template>
  <div>
    <Navbar />
    <slot />
  </div>
</template>

<style scoped></style>
