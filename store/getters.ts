import { GetterTree } from 'vuex'
import { State } from './state'
import { NamespacedSettingsGetters } from './settings'

export type RootGetters = {
  count(state: State): number
  isLoading(state: State): boolean
  reversedName(state: State): string
}

const getters: GetterTree<State, State> & RootGetters = {
  count: (state) => state.count,
  isLoading: (state) => state.loading,
  reversedName: (state) => state.description.split('').reverse().join(''),
}

export type Getters = RootGetters & NamespacedSettingsGetters
export default getters
