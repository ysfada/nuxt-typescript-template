import { MutationTree } from 'vuex'
import { State } from './state'
import { NamespacedSettingsMutations } from './settings'

export type RootMutations<S = State> = {
  COUNT(state: S, payload: number): void
  INCREMENT(state: S, payload: number): void
  DECREMENT(state: S, payload: number): void
  SET_LOADING(state: S, payload: boolean): void
  CHANGE_DESCRIPTION(state: S, payload: string): void
}

const mutations: MutationTree<State> & RootMutations = {
  COUNT(state, payload = 0) {
    state.count = payload
  },
  INCREMENT(state, payload = 1) {
    state.count += payload
  },
  DECREMENT(state, payload = 1) {
    state.count -= payload
  },
  SET_LOADING(state, payload: boolean) {
    state.loading = payload
  },
  CHANGE_DESCRIPTION: (state, newDescription: string) => {
    state.description = newDescription
  },
}

export type Mutations = RootMutations & NamespacedSettingsMutations
export default mutations
