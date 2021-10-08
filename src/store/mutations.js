import {
  SETTOKEN,
  SETASYNCROUTERS,
  SETROUTERLIST,
  ADDHISTORYROUTERS,
  DELHISTORYROUTERS
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
  [ADDHISTORYROUTERS](state, menuName) {
    if (!state.historyRouters.find(item => item.name === menuName)) {
      let historyRouter = state.routerList.find(item => item.name === menuName)
      state.historyRouters.push(historyRouter)
    }
  },
  [DELHISTORYROUTERS](state, menuName) {
    state.historyRouters.splice(
      state.historyRouters.findIndex(item => item.title === menuName),
      1
    )
  }
}
