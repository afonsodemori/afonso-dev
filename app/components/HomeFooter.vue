<script setup lang="ts">
  const { t } = useI18n();
  const localePath = useLocalePath();

  const items = computed(() => [
    [
      {
        label: t('nav.index'),
        to: localePath('index'),
        icon: 'i-lucide-home',
      },
      {
        label: t('nav.resume'),
        to: localePath('resume'),
        icon: 'i-lucide-briefcase-business',
      },
      {
        label: t('nav.contact'),
        to: localePath('contact'),
        icon: 'i-lucide-mail',
      },
    ],
  ]);
</script>

<template>
  <div>
    <UNavigationMenu :items="items" class="w-full justify-center" />
  </div>
</template>

<style scoped>
  div {
    margin: 1rem 0;
    overflow: hidden;
  }

  @media only screen and (min-width: 1200px) {
    :deep(nav) {
      transform: scale(1.15);
    }

    div {
      margin: 1.15rem 0;
    }
  }
</style>
