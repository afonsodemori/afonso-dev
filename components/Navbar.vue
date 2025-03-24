<script setup lang="ts">
  const { locale, t, setLocale } = useI18n();
  const localePath = useLocalePath();

  const itemsComputed = computed(() => [
    [
      {
        label: t('nav.home'),
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
          {
            label: 'English',
            active: locale.value === 'en',
            onSelect: () => setLocale('en'),
          },
          {
            label: 'Español',
            active: locale.value === 'es',
            onSelect: () => setLocale('es'),
          },
          {
            label: 'Português',
            active: locale.value === 'pt',
            onSelect: () => setLocale('pt'),
          },
        ],
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
      :items="itemsComputed"
      class="hidden md:flex z-10 data-[orientation=horizontal]:border-b border-(--ui-border) data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48"
    />

    <!-- TODO: Temporary lazy fix for small screens -->
    <UNavigationMenu
      highlight
      highlight-color="primary"
      orientation="horizontal"
      content-orientation="vertical"
      :items="itemsComputed[0]"
      class="flex md:hidden data-[orientation=horizontal]:border-b border-(--ui-border) data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-full"
    />

    <NavbarDropdown class="flex md:hidden" />
  </div>
</template>
