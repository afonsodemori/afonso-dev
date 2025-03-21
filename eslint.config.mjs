import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  ignores: ['worker-configuration.d.ts'],
  rules: {
    'no-console': 'warn',
    'vue/multi-word-component-names': 'off',
  },
});
