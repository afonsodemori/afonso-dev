<script setup lang="ts">
  const { t } = useI18n();
  const localePath = useLocalePath();

  const itemsComputed = computed(() => [
    [
      {
        label: t('nav.home'),
        to: localePath('index'),
        icon: 'i-lucide-home',
      },
      {
        label: t('nav.curriculum'),
        to: localePath('curriculum'),
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
    <div class="internal">
      <UNavigationMenu :items="itemsComputed" class="w-full justify-center" />
    </div>
  </div>
</template>

<style scoped>
  .internal {
    margin-top: 4rem;
    margin-bottom: 1rem;
    overflow: hidden;
  }

  :deep(.internal nav) {
    transform: scale(1.15);
    transform-origin: top;
  }

  .social {
    zoom: 0.9;
  }
</style>
