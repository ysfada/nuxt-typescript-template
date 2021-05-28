import { Plugin } from '@nuxt/types'
import io, { ManagerOptions, Socket, SocketOptions } from 'socket.io-client'

declare module 'vue/types/vue' {
  // this.$socket inside Vue components
  interface Vue {
    $socket: Socket
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$socket inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $socket: Socket
  }
  // nuxtContext.$socket
  interface Context {
    $socket: Socket
  }
}

declare module 'vuex/types/index' {
  // this.$socket inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $socket: Socket
  }
}

export type ClientOptions = Partial<ManagerOptions & SocketOptions>

const socket: Plugin = function (_context, inject) {
  const options: ClientOptions = JSON.parse(`<%= JSON.stringify(options) %>`)
  inject('socket', io(process.env.WS_URL as string, options))
}

export default socket
