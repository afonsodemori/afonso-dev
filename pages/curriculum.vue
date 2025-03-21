<script setup lang="ts">
  const { t } = useI18n();

  useHead({
    title: t('head.curriculum.title'),
  });
</script>

<template>
  <div>
    <div>Page: curriculum</div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="$t('curriculum.html')" />
  </div>
</template>

<style scoped></style>
