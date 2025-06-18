import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    ingores: [
      'node_modules/**',
      'dist/**',
      '.quasar/**',
      'src-capacitor/**',
      'src-cordova/**',
      'quasar.config.*.temporary.compiled*',
      'quasar.config.*',
    ],
  },

  js.configs.recommended,

  ...pluginVue.configs['flat/essential'],

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node, // SSR, Electron, config files
        process: 'readonly', // process.env.*
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly', // BEX related
        browser: 'readonly', // BEX related
      },
    },
    // add your custom rules here
    rules: {
      'prefer-promise-reject-errors': 'off',
      // allow debugger during development only
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
  },

  {
    files: ['src-pwa/custom-service-worker.ts'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      'vue/max-attributes-per-line': [
        'warn',
        {
          singleline: 4,
        },
      ],
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-undef': 'error',
      'no-duplicate-imports': 'error',
    },
  },

  // This disables ESLint formatting rules that conflict with Prettier
  prettierSkipFormatting,
];
