import type { Plugin } from '@nuxt/types'

type Truncater = (text: string) => string

declare module 'vue/types/vue' {
  // this.$truncate inside Vue components
  interface Vue {
    $truncate: Truncater
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$truncate inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $truncate: Truncater
  }
  // nuxtContext.$socket
  interface Context {
    $truncate: Truncater
  }
}

declare module 'vuex/types/index' {
  // this.$truncate inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $truncate: Truncater
  }
}

const truncater: Truncater = (text: string) =>
  text.length > 15 ? text.substring(0, 15) : text

const truncatePlugin: Plugin = (_context, inject) => {
  inject('truncate', truncater)
}

export default truncatePlugin
