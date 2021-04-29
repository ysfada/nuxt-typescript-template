import { Context } from '@nuxt/types'
import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import { NamespacedSettingsActions } from './settings'

type RootAugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface RootActions {
  // nuxtServerInit({ commit }: RootAugmentedActionContext, context: Context): void
  COUNT(
    { commit }: RootAugmentedActionContext,
    payload: Record<'min' | 'max', number>
  ): Promise<number>
}

type nuxtServerInit = {
  nuxtServerInit({ commit }: RootAugmentedActionContext, context: Context): void
}

const actions: ActionTree<State, State> & RootActions & nuxtServerInit = {
  nuxtServerInit({ commit }, _context) {
    commit('CHANGE_DESCRIPTION', "I'm defined by server side")
  },

  async COUNT({ commit }, payload): Promise<number> {
    commit('SET_LOADING', true)
    const response = await fetch(
      `https://www.random.org/integers/?num=1&min=${payload.min}&max=${payload.max}&col=1&base=10&format=plain&rnd=new`
    )
    commit('SET_LOADING', false)
    const num: number = await response.json()
    commit('COUNT', num)
    return num
  },
}

export type Actions = RootActions & NamespacedSettingsActions
export default actions
