import { SET_TOKEN } from './mutation-types'

export default {
  [SET_TOKEN](state, token) {
    state.token = token
  }
}
