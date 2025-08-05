import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import { globalIgnores } from 'eslint/config';

import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    rules: {
      '@typescript-eslint/no-unused-vars': [1],
      'arrow-body-style': [1],
      camelcase: [1],
      'consistent-return': [1],
      curly: [1],
      'default-param-last': [1],
      'default-case-last': [1],
      'dot-notation': [1],
      eqeqeq: [1],
      // 'id-length': [1],
      'no-alert': [1],
      'no-array-constructor': [1],
      'no-bitwise': [1],
      'no-console': [1, { allow: ['warn', 'error'] }],
      // 'no-continue': [1],
      'no-else-return': [1],
      'no-empty': [1],
      'no-empty-function': [1],
      'no-eval': [1],
      'no-lonely-if': [1],
      'no-multi-assign': [1],
      'no-loop-func': [1],
      'no-new': [1],
      'no-new-func': [1],
      'no-plusplus': [1],
      'no-return-assign': [1],
      'no-shadow': [1],
      'no-unneeded-ternary': [1],
      'no-useless-concat': [1],
      'no-useless-catch': [1],
      'no-useless-return': [1],
      'no-var': [1],
      'one-var': [1, 'never'],
      'object-shorthand': [1],
      'operator-assignment': [1],
      'prefer-const': [1],
      'prefer-destructuring': [1],
      'prefer-exponentiation-operator': [1],
      'prefer-spread': [1],
      'prefer-template': [1],
      radix: [1],
      yoda: [1],
    },
  },

  skipFormatting,
);
