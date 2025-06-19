import { defineConfig } from '#q-app/wrappers';
import { fileURLToPath } from 'node:url';

export default defineConfig(ctx => {
  return {
    boot: ['i18n', 'axios', 'iconify', 'apex', 'leaflet'],

    css: ['app.scss'],

    extras: [
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      typescript: {
        strict: true,
        vueShim: true,
      },

      vueRouterMode: 'hash',

      vitePlugins: [
        [
          '@intlify/unplugin-vue-i18n/vite',
          {
            ssr: ctx.modeName === 'ssr',

            include: [fileURLToPath(new URL('./src/i18n', import.meta.url))],
          },
        ],

        [
          'vite-plugin-checker',
          {
            vueTsc: true,
            eslint: {
              lintCommand:
                'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
      ],

      devServer: {
        proxy: {
          '/api': {
            target: 'https://saas-dev.wiotschool.com/',
            changeOrigin: true,
            secure: false,
          },
        },
      },
    },

    framework: {
      config: {},
      plugins: ['Notify'],
    },

    animations: [],

    ssr: {
      prodPort: 3000, // The default port that the production server should use

      middlewares: [
        'render', // keep this as last one
      ],

      pwa: false,
    },

    pwa: {
      workboxMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
    },

    capacitor: {
      hideSplashscreen: true,
    },
  };
});
