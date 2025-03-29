<script setup lang="ts">
  import type { ContextMenuItem, DropdownMenuItem } from '@nuxt/ui';

  const { locale, t, setLocale } = useI18n();
  const config = useRuntimeConfig();
  const host = config.public.host;

  useHead({
    htmlAttrs: { lang: locale.value },
    link: [
      { rel: 'canonical', href: `${host}/${locale.value}/resume` },
      { rel: 'alternate', hreflang: 'en', href: `${host}/en/resume` },
      { rel: 'alternate', hreflang: 'es', href: `${host}/es/resume` },
      { rel: 'alternate', hreflang: 'pt', href: `${host}/pt/resume` },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  });

  useSeoMeta({
    title: t(`head.resume.title`),
    description: t(`head.resume.description`),
    ogTitle: t(`head.resume.title`),
    ogDescription: t(`head.resume.description`),
    ogImage: `${host}/static/icons/og-resume-${locale.value}.png`,
    ogImageWidth: 1000,
    ogImageHeight: 667,
    ogUrl: `${host}/${locale.value}/resume`,
    twitterTitle: t(`head.resume.title`),
    twitterDescription: t(`head.resume.description`),
    twitterImage: `${host}/static/icons/og-resume-${locale.value}.png`,
    twitterCard: 'summary_large_image',
  });

  onMounted(() => {
    document.querySelectorAll<HTMLAnchorElement>('#page a').forEach((a, index) => {
      if (index === 0) {
        const contact = `/${locale.value}/contact`;
        a.href = contact;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          navigateTo(contact);
        });
      } else if (index !== 0 && index !== 3) a.setAttribute('target', '_blank');
    });

    const pageElement = document.querySelector<HTMLDivElement>('#page');
    const lastParagraph = pageElement?.lastElementChild as HTMLParagraphElement | null;

    if (lastParagraph) {
      const emphasisElement = lastParagraph.querySelector<HTMLElement>('em');
      if (emphasisElement?.textContent) {
        emphasisElement.textContent = emphasisElement.textContent.split(' — ')[0].trim();
      }
    }
  });

  const createButtonItems = (localeKey: string) =>
    computed<DropdownMenuItem[][]>(() => [
      [
        {
          label: 'PDF',
          icon: 'mdi-file-pdf-outline',
          to: `/docs/resume-${t(`${localeKey}.locale`)}-afonso_de_mori.pdf`,
          target: '_blank',
          kbds: ['.pdf'],
        },
        {
          label: 'Microsoft Word',
          icon: 'mdi-file-word-outline',
          to: `/docs/resume-${t(`${localeKey}.locale`)}-afonso_de_mori.docx`,
          target: '_blank',
          kbds: ['.docx'],
        },
        {
          label: 'Markdown',
          icon: 'mdi-file-text-outline',
          to: `/docs/resume-${t(`${localeKey}.locale`)}-afonso_de_mori.md`,
          target: '_blank',
          kbds: ['.md'],
        },
        {
          label: t(`${localeKey}.formats.txt`),
          icon: 'mdi-file-text-outline',
          to: `/docs/resume-${t(`${localeKey}.locale`)}-afonso_de_mori.txt`,
          target: '_blank',
          kbds: ['.txt'],
        },
        {
          type: 'separator',
        },
        {
          label: t(`${localeKey}.formats.google.label`),
          icon: 'mdi-google-drive',
          to: `/${t(`${localeKey}.locale`)}/resume/e`,
          target: '_blank',
        },
        {
          label: t(`${localeKey}.formats.linkedin`),
          icon: 'mdi-linkedin',
          to: `https://www.linkedin.com/in/afonsodemori/${t(`${localeKey}.locale`)}`,
          target: '_blank',
        },
      ],
    ]);

  const itemsFirstButton = createButtonItems('resume.first');
  const itemsSecondButton = createButtonItems('resume.second');
  const itemsThirdButton = createButtonItems('resume.third');

  const contexMenuItems = computed<ContextMenuItem[][]>(() => [
    [
      {
        label: t('resume.select_version'),
        type: 'label',
      },
      ...itemsFirstButton.value[0].slice(0, 4), // Versions
      {
        type: 'separator',
      },
      itemsFirstButton.value[0][5], // Google Drive
    ],
    [
      {
        label: t('resume.print'),
        icon: 'mdi-printer-outline',
        onSelect: () => setTimeout(() => print(), 200),
      },
    ],
    [
      {
        label: t('resume.languages'),
        icon: 'i-lucide-earth',
        children: [
          { code: 'en', label: 'English' },
          { code: 'es', label: 'Español' },
          { code: 'pt', label: 'Português' },
        ].map((lang) => ({
          label: lang.label,
          type: 'checkbox',
          checked: locale.value === lang.code,
          color: locale.value === lang.code ? 'success' : 'neutral',
          onSelect: () => setLocale(lang.code as 'en' | 'es' | 'pt'),
        })),
      },
    ],
  ]);
</script>

<template>
  <div class="containers">
    <div class="text-center pb-5 print:hidden">
      <UDropdownMenu arrow :items="itemsFirstButton" external-icon="false">
        <UButton
          class="p-3 m-1"
          :label="t('resume.first.label')"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
      <UDropdownMenu arrow :items="itemsSecondButton" external-icon="false">
        <UButton
          class="p-3 m-1"
          :label="t('resume.second.label')"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
      <UDropdownMenu arrow :items="itemsThirdButton" external-icon="false">
        <UButton
          class="p-3 m-1"
          :label="t('resume.third.label')"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
    </div>
    <UContextMenu :items="contexMenuItems" external-icon="false">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div id="page" v-html="$t('resume.html')" />
    </UContextMenu>
  </div>
</template>

<style scoped>
  /* Page */
  #page {
    transition-duration: 200ms;
    border-radius: 1rem;
    max-width: 980px;
    margin: auto;
    padding: 3rem;
    font:
      inherit 1rem/1.6 Inter,
      sans-serif;
    color: #000;
    text-align: justify;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.5);
  }

  .containers {
    transition-duration: 200ms;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* Layout changers */
  :deep(.contact-separator:first-of-type) {
    display: block;
    height: 2rem;
  }

  :deep(.contact-separator) {
    display: none;
  }

  :deep(img:first-of-type) {
    margin-left: 0;
  }

  :deep(img) {
    display: inline-block;
    margin-left: 1.25rem;
    width: 12px;
    height: 12px;
  }

  /* Content formatting */
  :deep(a) {
    color: #155dfc;
    text-decoration: underline;
  }

  :deep(a:hover) {
    text-decoration: none;
  }

  :deep(h1) {
    font-size: 2rem;
    line-height: 1.2;
    font-weight: 700;
  }

  :deep(h2) {
    margin: 2rem 0 0.75rem 0;
    font-size: 1.6rem;
  }

  :deep(strong),
  :deep(h2 strong),
  :deep(h3 strong) {
    font-weight: 600;
  }

  :deep(h4) {
    opacity: 0.55;
  }

  :deep(ul) {
    margin: 1rem 0 2rem 2.5rem;
    list-style-type: disc;
  }

  :deep(em:last-of-type) {
    display: block;
    opacity: 0.5;
    margin-top: 5rem;
    text-align: right;
  }

  .dark #page {
    color: rgba(255, 255, 255, 0.8);
    background-color: rgba(0, 0, 0, 0.25);
    box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.75);
  }

  .dark #page :deep(a) {
    color: #51a2ff;
  }

  .dark #page :deep(img) {
    opacity: 0.75;
    filter: invert(1);
  }

  @media screen and (max-width: 850px) {
    :deep(img) {
      margin-left: 0.75rem;
    }
  }

  @media screen and (max-width: 800px) {
    #page {
      padding: 2rem 1rem;
    }

    .containers {
      padding: 0.25rem;
    }
  }

  @media screen and (max-width: 750px) {
    #page {
      margin: inherit 0;
      text-align: left;
    }

    .containers {
      padding: 0;
    }

    :deep(.contact-separator) {
      display: block;
      height: 0.75rem;
    }

    :deep(img) {
      margin-left: 0;
    }

    :deep(ul) {
      margin-left: 1.5rem;
      text-align: left;
    }
  }

  @media print {
    #page,
    .containers {
      max-width: 100%;
      width: 100%;
      box-shadow: none;
      margin: 0;
      padding: 0;
      background-color: white;
      color: #000;
    }

    :deep(h1) {
      font-size: 20pt;
    }

    :deep(h2) {
      margin-top: 1.5rem;
      margin-bottom: 0.25rem;
      font-size: 13pt;
    }

    :deep(h3) {
      font-size: 1.1rem;
    }

    :deep(ul) {
      margin-top: 0.5rem;
      margin-bottom: 1.5rem;
    }

    :deep(.contact-separator:first-of-type) {
      height: 10pt;
    }
  }
</style>
