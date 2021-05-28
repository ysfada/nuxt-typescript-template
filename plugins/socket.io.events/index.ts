import { IMessage } from './types'
import { Events } from '~/modules/socket.io/socket.io-server'

const messages: IMessage[] = []
const users: Record<string, string> = {}

const events: Events = {
  connection: {
    'new-user':
      (socket) =>
      (name: string): void => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
      },

    'last-messages':
      (_) =>
      (cb: (msgs: IMessage[]) => void): void => {
        if (messages.length > 50) {
          messages.splice(0, messages.length - 25)
          cb(messages)
          return
        }
        cb(messages.slice(-25))
      },

    'send-message':
      (socket) =>
      (message: IMessage): void => {
        message.name = users[socket.id]
        messages.push(message)
        socket.broadcast.emit('new-message', message)
      },

    disconnect: (socket) => (): void => {
      socket.broadcast.emit('user-disconnected', users[socket.id])
      delete users[socket.id]
    },
  },
}

export default events
