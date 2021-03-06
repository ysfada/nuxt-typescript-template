import { InjectionKey, useStore as baseUseStore } from '@nuxtjs/composition-api'
import { CommitOptions, DispatchOptions, Store as VuexStore } from 'vuex'
import { State } from './state'
import { Getters } from './getters'
import { Mutations } from './mutations'
import { Actions } from './actions'

export const key: InjectionKey<State> = Symbol('vuex injection key')

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
} & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}

export function useStore(): Store {
  return baseUseStore(key) as Store
}
