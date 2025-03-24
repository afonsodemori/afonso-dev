<script setup lang="ts">
  import type { DropdownMenuItem } from '@nuxt/ui';
  const { locale, setLocale } = useI18n();

  const items3 = computed<DropdownMenuItem[][]>(() => [
    [
      {
        label: 'Language',
        icon: 'i-lucide-earth',
        children: [
          [
            {
              label: 'English',
              type: 'checkbox' as const,
              checked: locale.value === 'en',
              disabled: locale.value === 'en',
              onUpdateChecked(_checked: boolean) {
                setLocale('en');
              },
            },
            {
              label: 'Español',
              type: 'checkbox' as const,
              checked: locale.value === 'es',
              disabled: locale.value === 'es',
              onUpdateChecked(_checked: boolean) {
                setLocale('es');
              },
            },
            {
              label: 'Português',
              type: 'checkbox' as const,
              checked: locale.value === 'pt',
              disabled: locale.value === 'pt',
              onUpdateChecked(_checked: boolean) {
                setLocale('pt');
              },
            },
          ],
        ],
      },
    ],
    [
      {
        label: 'LinkedIn',
        icon: 'i-simple-icons-linkedin',
        to: '/linkedin',
        target: '_blank',
      },
      {
        label: 'GitHub',
        icon: 'i-simple-icons-github',
        to: '/github',
        target: '_blank',
      },
    ],
  ]);
</script>

<template>
  <div class="fns">
    <UDropdownMenu
      :items="items3"
      :content="{
        align: 'start',
        sideOffset: 8,
      }"
    >
      <UButton icon="i-lucide-menu" color="neutral" variant="link" size="xl" />
    </UDropdownMenu>
  </div>
</template>

<style scoped>
  .fns {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }

  :deep(button) {
    padding: 0.75rem;
  }
</style>
