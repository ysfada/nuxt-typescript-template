import type { NuxtConfig } from '@nuxt/types'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import bootstrap from './.nest/nest.js'
// import chatEvets from './plugins/socket.io.events'
import type { IOModuleOptions } from '~/modules/socket.io'

const isDev = process.env.NODE_ENV === 'development'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let nest: any
if (!isDev) {
  nest = require('./.nest/nest')
}

const config = async (): Promise<NuxtConfig> => ({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-community/typescript-template',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'A boilerplate to start a Nuxt+TS project quickly',
      },
    ],
    link: [],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.css'],

  loading: { color: '#0c64c1' },

  env: {
    WS_URL: process.env.WS_URL || 'http://localhost:3000',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || '3000',
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/truncate'],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '~/modules/socket.io',
      {
        chatOpts: {
          maxStoredMessages: 50,
          maxShowedMessages: 25,
        },
        serverOpts: { path: '/socket', cors: false },
        clientOpts: { path: '/socket', autoConnect: true },
        // events: chatEvets,
      } as IOModuleOptions,
    ],
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
    meta: {
      theme_color: '#0c64c1',
    },
  },

  // @nuxtjs/style-resources: https://github.com/nuxt-community/style-resources-module
  styleResources: {
    scss: [
      // '~/assets/scss/*.scss',
      // '~/assets/scss/_colors.scss',
      // theme variables
      '~/assets/scss/_variables.scss',
      // mixins & abstract classes
      '~/assets/scss/_mixins.scss',
    ],
  },

  /*
   ** Server Middleware
   */
  serverMiddleware: [
    // Will register redirect-ssl npm package
    // 'redirect-ssl',
    { path: '/express', handler: '~/api/expressAPI' },
    // { path: '/nest', handler: await bootstrap() },
    // ...[isDev ? '' : { path: '/nest', handler: await bootstrap() }].filter(
    ...[isDev ? '' : { path: '/nest', handler: await nest.default() }].filter(
      (m) => typeof m !== 'string'
    ),
  ],

  // typescript: {
  //   typeCheck: {
  //     eslint: {
  //       files: './**/*.{ts,js,vue}',
  //     },
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx): void {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
        // config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map'
      }
    },
  },
})

export default config
