import { Server } from 'http'
import { resolve } from 'path'
import { Module } from '@nuxt/types'
import { ChatOptions, ServerOptions, useSocketIO } from './socket.io-server'
import { ClientOptions } from './socket.io-client'

export interface IOModuleOptions {
  chatOpts: ChatOptions
  serverOpts: ServerOptions
  clientOpts: ClientOptions
}

const socketIO: Module<IOModuleOptions> = function (moduleOptions) {
  this.addPlugin({
    src: resolve(__dirname, 'socket.io-client.ts'),
    fileName: 'index.ts',
    options: moduleOptions.clientOpts,
    ssr: true,
  })

  this.nuxt.hook(
    'listen',
    (server: Server, { host, port }: { host: string; port: number }) => {
      const io = useSocketIO(
        server,
        moduleOptions.serverOpts,
        moduleOptions.chatOpts
        // moduleOptions.events
      )
      // eslint-disable-next-line no-console
      console.info(`socket.io server listening on ${host}:${port}`)

      this.nuxt.hook('close', () => {
        io.disconnectSockets(true)
        io.close((e) => {
          // eslint-disable-next-line no-console
          console.error(e)
        })
        server.close((e) => {
          // eslint-disable-next-line no-console
          console.error(e)
        })
      })
    }
  )
}

export default socketIO
// REQUIRED if publishing the module as npm package
// module.exports.meta = require('../../package.json')
