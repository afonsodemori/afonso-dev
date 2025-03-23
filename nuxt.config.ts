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
});
