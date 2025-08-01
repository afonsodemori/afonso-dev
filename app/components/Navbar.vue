<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui';

  const { locale, t, setLocale } = useI18n();
  const localePath = useLocalePath();
  const colorMode = useColorMode();

  const items = computed<NavigationMenuItem[][]>(() => [
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
    [
      {
        label: 'GitHub',
        icon: 'i-simple-icons-github',
        to: '/github',
        target: '_blank',
      },
      {
        label: 'LinkedIn',
        icon: 'i-simple-icons-linkedin',
        to: '/linkedin',
        target: '_blank',
      },
      {
        label: locale.value.toUpperCase(),
        icon: 'i-lucide-earth',
        children: [
          { code: 'en', label: 'English' },
          { code: 'es', label: 'Español' },
          { code: 'pt', label: 'Português' },
        ].map((lang) => ({
          label: lang.label,
          active: locale.value === lang.code,
          onSelect: () => setLocale(lang.code as 'en' | 'es' | 'pt'),
        })),
      },
      {
        icon: colorMode.preference == 'light' ? 'i-lucide-sun' : 'i-lucide-moon',
        onSelect: () =>
          colorMode.preference == 'light'
            ? (colorMode.preference = 'dark')
            : (colorMode.preference = 'light'),
      },
    ],
  ]);
</script>

<template>
  <div>
    <UNavigationMenu
      highlight
      highlight-color="primary"
      orientation="horizontal"
      content-orientation="vertical"
      :items="items"
      class="hidden md:flex z-10 data-[orientation=horizontal]:border-b border-(--ui-border)"
    />

    <!-- TODO: Temporary lazy fix for small screens -->
    <UNavigationMenu
      highlight
      highlight-color="primary"
      orientation="horizontal"
      content-orientation="vertical"
      :items="items[0]"
      class="flex md:hidden data-[orientation=horizontal]:border-b border-(--ui-border)"
    />

    <NavbarDropdown class="flex md:hidden" />
  </div>
</template>
