import {
  SETTOKEN,
  SETASYNCROUTERS,
  SETROUTERLIST,
  SETHISTORYROUTERS
} from './mutation-types'

export default {
  [SETTOKEN](state, token) {
    state.token = token
  },
  [SETASYNCROUTERS](state, asyncRouters) {
    state.asyncRouters = asyncRouters
  },
  [SETROUTERLIST](state, routerList) {
    state.routerList = routerList
  },
  [SETHISTORYROUTERS](state, route) {
    state.historyRouters.push(route)
  }
}
