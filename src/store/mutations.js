import { SETTOKEN, SETASYNCROUTER, SETROUTERLIST } from './mutation-types'

export default {
  [SETTOKEN](state, token) {
    state.token = token
  },
  [SETASYNCROUTER](state, asyncRouter) {
    state.asyncRouter = asyncRouter
  },
  [SETROUTERLIST](state, routerList) {
    state.routerList = routerList
  }
}
