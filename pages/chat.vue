<template>
  <div>
    <ul class="pages">
      <li class="chat page">
        <div class="chatArea">
          <nuxt-link :to="{ name: 'index' }">Index Page</nuxt-link>
          <nuxt-link :to="{ name: 'about' }">About Page</nuxt-link>
          <a href="/express">Express API</a>
          <a href="/nest">NestJS API</a>
          <!-- <button @click="$socket.connect()">Connect</button>
          <button @click="$socket.disconnect()">Disconnect</button> -->
          <ul ref="messagesUlRef" class="messages">
            <li v-for="(msg, index) in messages" :key="index" class="message">
              <i :title="`send at ${msg.date}`"> {{ msg.name }} </i>:
              {{ msg.text
              }}<i class="timestamp" :title="`send by ${msg.name}`">
                {{ msg.date }}
              </i>
            </li>
          </ul>
        </div>
        <input
          ref="msgInputRef"
          v-model="message"
          class="inputMessage"
          type="text"
          placeholder="Type here..."
          @keyup.enter="sendMessage"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  useAsync,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { IMessage } from '~/plugins/socket.io.events/types'

export default defineComponent({
  name: 'IOComposition',
  fetchOnServer: true,

  setup(_props, _context) {
    const name = ref<string>('')
    const messagesUlRef = ref<HTMLUListElement>()
    const msgInputRef = ref<HTMLInputElement>()
    const message = ref<string>('')
    const messages = ref<IMessage[]>([])
    const { $socket } = useContext()

    useAsync(() => {
      $socket.emit('last-messages', (lastMessages: IMessage[]) => {
        messages.value.unshift(...lastMessages)
      })
    })

    watch(messages, () => scrollToBottom())

    const scrollToBottom = (): void =>
      nextTick(() => {
        if (messagesUlRef.value == null) return
        messagesUlRef.value.scrollTop = messagesUlRef.value.scrollHeight
      })

    const sendMessage = (): void => {
      if (!message.value.trim() || !name.value) {
        return
      }
      const newMessage: IMessage = {
        name: name.value,
        date: new Date().toLocaleString(),
        text: message.value.trim(),
      }
      $socket.emit('send-message', newMessage)
      messages.value.push(newMessage)
      message.value = ''
    }

    onBeforeMount(() => {
      $socket.connect()
    })

    onBeforeMount(() => {
      $socket.on('new-message', (message) => {
        messages.value.push(message)
      })
    })

    onBeforeMount(() => {
      $socket.on('user-connected', (name) => {
        const newMessage: IMessage = {
          name,
          date: new Date().toLocaleString(),
          text: 'connected',
        }
        messages.value.push(newMessage)
      })
    })

    onBeforeMount(() => {
      $socket.on('user-disconnected', (name) => {
        const newMessage: IMessage = {
          name,
          date: new Date().toLocaleString(),
          text: 'disconnected',
        }
        messages.value.push(newMessage)
      })
    })

    onMounted(() => {
      let username
      while (!username) {
        username = prompt('What is your name?')
      }

      name.value = username
      const newMessage: IMessage = {
        name: name.value,
        date: new Date().toLocaleString(),
        text: `You joined as ${username}`,
      }
      messages.value.push(newMessage)
      $socket.emit('new-user', username)
    })

    onMounted(scrollToBottom)

    onMounted(() => {
      msgInputRef.value?.focus()
    })

    onBeforeUnmount(() => {
      $socket.disconnect()
    })

    return {
      message,
      messages,
      messagesUlRef,
      msgInputRef,
      sendMessage,
    }
  },

  head: {
    title: 'Nuxt.js with Socket.io',
  },
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

ul {
  list-style: none;
  word-wrap: break-word;
}

/* Pages */

.pages {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

.page {
  height: 100%;
  position: absolute;
  width: 100%;
}

/* Font */

.messages {
  font-size: 150%;
}

.inputMessage {
  font-size: 100%;
}

.log {
  color: gray;
  font-size: 70%;
  margin: 5px;
  text-align: center;
}

/* Messages */

.chatArea {
  height: 100%;
  padding-bottom: 60px;
}

.messages {
  height: 100%;
  margin: 0;
  overflow-y: scroll;
  padding: 10px 20px 10px 20px;
}

.timestamp {
  font-size: 50%;
  margin-left: 10px;
}

/* Input */

.inputMessage {
  border: 10px solid #3b8070;
  bottom: 0;
  height: 60px;
  left: 0;
  outline: none;
  padding-left: 10px;
  position: absolute;
  right: 0;
  width: 100%;
}
</style>
