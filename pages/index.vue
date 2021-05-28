<template>
  <main :class="{ dark: isDarkMode }">
    <Logo />
    <h1>With Composition API <small>*Experimental</small></h1>
    <nuxt-link :to="{ name: 'about' }">About Page</nuxt-link>
    <nuxt-link :to="{ name: 'chat' }">Chat Page</nuxt-link>
    <a href="/express">Express API</a>
    <a href="/nest">NestJS API</a>
    <h2>count: {{ count }}</h2>
    <h3>loading: {{ isLoading }}</h3>
    <button @click="increment(2)">increment by 2</button>
    <button @click="decrement(2)">decrement by 2</button>
    <button @click="action(0, 100)">set between 0-100</button>

    <h2>data ()</h2>
    <p>{{ message }}</p>
    <h2>computed ()</h2>
    <p>{{ computedMessage }}</p>
    <h2>asyncData ()</h2>
    <p>{{ asyncMessage }}</p>
    <h2>fetch ()</h2>
    <p v-if="fetchState.pending || !fetchState.timestamp">
      Fetching from frontend...
    </p>
    <ul v-else>
      <li v-for="todo in fetchedTodos.slice(0, 5)" :key="todo.id">
        {{ todo.completed ? '&#9989;' : '&#11036;' }} {{ todo.id }}:
        {{ todo.title }}
      </li>
    </ul>
    <h2>Vuex Store</h2>
    <ul>
      <li>On root store: {{ descriptionOnStore }}</li>
      <li>
        On settings store (namespaced): dark mode is
        <strong>{{ isDarkMode ? 'enabled' : 'disabled' }}</strong>
      </li>
      <li><a href="" @click.prevent="toggleDarkMode"> Toggle dark mode </a></li>
    </ul>
    <h2>Nuxt Middleware</h2>
    <p>{{ userAgent }}</p>
    <h2>Nuxt Plugin</h2>
    <p>{{ $truncate(userAgent || '') }}</p>
  </main>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useAsync,
  useContext,
  useFetch,
  useMeta,
} from '@nuxtjs/composition-api'
import { useStore } from '~/store'

interface ToDo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export default defineComponent({
  name: 'Index',
  fetchOnServer: true,
  middleware: 'user-agent',

  setup(_props, _context) {
    const store = useStore()
    // const count = computed(() => store.getters.count)
    const count = computed({
      get: () => store.getters.count,
      set: (val) => store.commit('COUNT', val),
    })
    // const isLoading = computed(() => store.getters.isLoading)
    const isLoading = computed({
      get: () => store.getters.isLoading,
      set: (val) => store.commit('SET_LOADING', val),
    })
    const increment = (payload: number): void =>
      store.commit('INCREMENT', payload)
    const decrement = (payload: number): void =>
      store.commit('DECREMENT', payload)
    const action = (min: number, max: number): Promise<number> =>
      store.dispatch('COUNT', { min, max })

    const message = ref("I'm defined on data()")
    const fetchedTodos = ref<ToDo[]>([])

    // const descriptionOnStore = computed(() => store.state.description)
    const descriptionOnStore = computed({
      get: () => store.state.description,
      set: (val) => store.commit('CHANGE_DESCRIPTION', val),
    })
    // const computedMessage = computed(() => message.value.replace('data()', 'computed()'))
    const computedMessage = computed({
      get: () => message.value.replace('data()', 'computed()'),
      set: (val) => {
        message.value = val
      },
    })
    // const isDarkMode = computed(() => store.state.settings.darkMode)
    const isDarkMode = computed({
      // get: () => store.state.settings.darkMode,
      get: () => store.getters['settings/darkMode'],
      set: (val) => {
        store.commit('settings/CHANGE_DARK_MODE', val)
      },
    })

    const toggleDarkMode = (): void =>
      store.dispatch('settings/TOGGLE_DARK_MODE', undefined)

    const asyncMessage = useAsync(() => "I'm defined on asyncData()")
    const userAgent = useAsync(() => useContext().userAgent)

    const { fetchState } = useFetch(async () => {
      // const response = await window.fetch('https://jsonplaceholder.typicode.com/todos')
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await response.json()
      fetchedTodos.value = data
    })

    useMeta(() => ({
      title: 'Composition API Demo',
      meta: [
        {
          name: 'message',
          content: computedMessage.value,
        },
      ],
    }))

    return {
      message,
      asyncMessage,
      userAgent,
      fetchState,
      fetchedTodos,
      descriptionOnStore,
      computedMessage,
      toggleDarkMode,
      isDarkMode,
      increment,
      decrement,
      count,
      isLoading,
      action,
    }
  },

  head: {},
})
</script>

<style lang="scss" scoped>
.dark {
  color: #989898;
  background: #323232;
}

main {
  display: flex;
  flex-direction: column;

  a,
  h1,
  h2,
  h3,
  button {
    margin: auto;
  }

  button {
    font-size: 1em;
    min-width: 150px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
