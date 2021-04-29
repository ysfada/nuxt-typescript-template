import { NamespacedSettingsState } from '~/store/settings'

export interface RootState {
  count: number
  loading: boolean
  description: string
}

const state = (): RootState => ({
  count: 0,
  loading: false,
  description: "I'm defined as an initial state",
})

export type State = RootState & NamespacedSettingsState
export default state
