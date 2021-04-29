import type { GetterTree, ActionTree, ActionContext, MutationTree } from 'vuex'
import type { State } from '../state'

type Namespaced<T, N extends string> = {
  [P in keyof T & string as `${N}/${P}`]: T[P]
}

export const namespace = 'settings'

export interface SettingsState {
  darkMode: boolean
}
export type NamespacedSettingsState = Namespaced<SettingsState, 'settings'>

export const state = (): SettingsState => ({
  darkMode: false,
})

export type SettingsGetters = {
  darkMode(state: SettingsState): boolean
}
export type NamespacedSettingsGetters = Namespaced<SettingsGetters, 'settings'>

export const getters: GetterTree<SettingsState, State> & SettingsGetters = {
  darkMode: (state) => state.darkMode,
}

export type SettingsMutations<S = State> = {
  CHANGE_DARK_MODE(state: S, newMode: boolean): void
}
export type NamespacedSettingsMutations = Namespaced<
  SettingsMutations,
  'settings'
>

export const mutations: MutationTree<SettingsState> = {
  CHANGE_DARK_MODE(state, newMode: boolean) {
    state.darkMode = newMode
  },
}

type SettingsAugmentedActionContext = {
  commit<K extends keyof SettingsMutations>(
    key: K,
    payload: Parameters<SettingsMutations[K]>[1]
  ): ReturnType<SettingsMutations[K]>
} & Omit<ActionContext<SettingsState, SettingsState>, 'commit'>

export interface SettingsActions {
  TOGGLE_DARK_MODE({ commit }: SettingsAugmentedActionContext): void
}
export type NamespacedSettingsActions = Namespaced<SettingsActions, 'settings'>

export const actions: ActionTree<SettingsState, SettingsState> &
  SettingsActions = {
  TOGGLE_DARK_MODE({ commit, state }) {
    commit('CHANGE_DARK_MODE', !state.darkMode)
  },
}
