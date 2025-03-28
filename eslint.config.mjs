import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  // TODO: This is not working. Ignoring in `npm run lint` instead.
  ignores: ['worker-configuration.d.ts'],
  rules: {
    'no-console': 'warn',
    'vue/multi-word-component-names': 'off',
  },
});
