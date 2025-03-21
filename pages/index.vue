<script setup lang="ts">
  const { t } = useI18n();

  useHead({
    title: t('head.home.title'),
  });
</script>

<template>
  <div>
    <h1>Afonso de Mori</h1>
    <h2>{{ $t('home.title') }}</h2>
    <p>{{ $t('home.bio') }}</p>
  </div>
</template>

<style scoped></style>
