import { Server } from 'http'
import {
  Server as SocketIO,
  ServerOptions as SocketIOServerOptions,
  Socket,
} from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { IMessage } from './types'

export interface ChatOptions {
  maxStoredMessages: number
  maxShowedMessages: number
}
export type Events = Record<
  string,
  Record<string, (socket: Socket) => (...args: never) => void>
>
export type ServerOptions = Partial<SocketIOServerOptions>
export type SocketIOServer = SocketIO<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap
>

export const useSocketIO = (
  srv: Server,
  serverOpts: ServerOptions,
  chatOpts: ChatOptions
): SocketIOServer => {
  const io = new SocketIO(srv, serverOpts)

  // Add socket.io events
  const messages: IMessage[] = []
  const users: { [key: string]: string } = {}
  io.on('connection', (socket) => {
    socket.on('new-user', (name: string) => {
      users[socket.id] = name
      socket.broadcast.emit('user-connected', name)
      // socket.join(socket.id)
      // socket.broadcast.to(socket.id).emit('user-connected', name);
    })

    socket.on('last-messages', (cb: (msgs: IMessage[]) => void) => {
      if (messages.length > chatOpts.maxStoredMessages) {
        messages.splice(0, messages.length - chatOpts.maxShowedMessages)
        cb(messages)
        return
      }
      cb(messages.slice(-chatOpts.maxShowedMessages))
    })

    socket.on('send-message', (message: IMessage) => {
      message.name = users[socket.id]
      messages.push(message)
      socket.broadcast.emit('new-message', message)
    })

    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', users[socket.id])
      delete users[socket.id]
    })
  })

  return io
}

// export const useSocketIO = (
//   srv: Server,
//   serverOpts: ServerOptions,
//   events: Events
// ): SocketIOServer => {
//   const io = new SocketIO(srv, serverOpts)

//   // Add socket.io events
//   for (const [key, value] of Object.entries(events)) {
//     for (const [k, v] of Object.entries(value)) {
//       io.on(key, (socket) => {
//         socket.on(k, v(socket))
//       })
//     }
//   }

//   return io
// }
