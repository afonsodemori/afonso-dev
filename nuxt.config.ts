// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      nodeEnv: '',
      recaptchaSiteKey: '',
    },
  },

  nitro: {
    preset: 'cloudflare-pages',

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  modules: ['nitro-cloudflare-dev', '@nuxt/eslint', '@nuxtjs/i18n', '@nuxt/ui'],

  css: ['~/assets/base.css'],

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', files: ['en-US.yaml', 'generated/en-curriculum.yaml'] },
      { code: 'es', language: 'es-ES', files: ['es-ES.yaml', 'generated/es-curriculum.yaml'] },
      { code: 'pt', language: 'pt-BR', files: ['pt-BR.yaml', 'generated/pt-curriculum.yaml'] },
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
    compilation: { strictMessage: false, escapeHtml: false },
  },

  routeRules: {
    // Legacy
    '/cv': { redirect: { to: '/curriculum', statusCode: 308 } },
    '/cv/en': { redirect: { to: '/en/curriculum', statusCode: 308 } },
    '/cv/es': { redirect: { to: '/es/curriculum', statusCode: 308 } },
    '/cv/pt': { redirect: { to: '/pt/curriculum', statusCode: 308 } },
    '/contact/en': { redirect: { to: '/en/contact', statusCode: 308 } },
    '/contact/es': { redirect: { to: '/es/contact', statusCode: 308 } },
    '/contact/pt': { redirect: { to: '/pt/contact', statusCode: 308 } },
    // Internal links
    '/resume': { redirect: { to: '/curriculum', statusCode: 308 } },
    '/support': { redirect: { to: '/contact', statusCode: 308 } },
    '/help': { redirect: { to: '/contact', statusCode: 308 } },
    '/contacto': { redirect: { to: '/es/contact', statusCode: 308 } },
    '/contato': { redirect: { to: '/pt/contact', statusCode: 308 } },
    // Docs shortcuts
    '/cv/e': {
      redirect: {
        to: 'https://drive.google.com/drive/folders/1B0v7C3FAdieTa7O63SBz4KEtYDR3wNfI',
        statusCode: 308,
      },
    },
    '/curriculum/e': {
      redirect: {
        to: 'https://drive.google.com/drive/folders/1B0v7C3FAdieTa7O63SBz4KEtYDR3wNfI',
        statusCode: 308,
      },
    },
    '/en/curriculum/e': {
      redirect: {
        to: 'https://docs.google.com/document/d/1aYKfrRKX0YHVZukZvMGe3cXTOIY648ZXwF3iXTGQF34',
        statusCode: 308,
      },
    },
    '/es/curriculum/e': {
      redirect: {
        to: 'https://docs.google.com/document/d/1TT9BpFpy6QBs1sygecTuPAHD8iPMPII1y3Rw7rNuj74',
        statusCode: 308,
      },
    },
    '/pt/curriculum/e': {
      redirect: {
        to: 'https://docs.google.com/document/d/1hWho1MfmHPZIXEARbHaZJydXULzVoTqSnMi0Z64dOq8',
        statusCode: 308,
      },
    },
    // Profiles
    '/in': { redirect: { to: 'https://www.linkedin.com/in/afonsodemori/', statusCode: 308 } },
    '/linkedin': { redirect: { to: 'https://www.linkedin.com/in/afonsodemori/', statusCode: 308 } },
    '/gh': { redirect: { to: 'https://github.com/afonsodemori', statusCode: 308 } },
    '/github': { redirect: { to: 'https://github.com/afonsodemori', statusCode: 308 } },
    '/wa': {
      redirect: { to: 'https://api.whatsapp.com/send/?phone=34602443854', statusCode: 308 },
    },
    '/whatsapp': {
      redirect: { to: 'https://api.whatsapp.com/send/?phone=34602443854', statusCode: 308 },
    },
    '/duolingo': {
      redirect: { to: 'https://www.duolingo.com/profile/afonsodemori', statusCode: 308 },
    },
    '/w3': { redirect: { to: 'https://www.w3profile.com/afonsodemori', statusCode: 308 } },
    // Extra
    '/status': { redirect: { to: 'https://stats.uptimerobot.com/x9VWUJlAw', statusCode: 308 } },
    // PG
    '/despacho': { redirect: { to: 'https://meet.google.com/jjg-tbus-xhc', statusCode: 308 } },
    '/office': { redirect: { to: 'https://meet.google.com/jjg-tbus-xhc', statusCode: 308 } },
    '/meet': { redirect: { to: 'https://meet.google.com/rpz-thpg-pxf', statusCode: 308 } },
  },
});
