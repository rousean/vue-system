import {
  SETTOKEN,
  SETASYNCROUTERS,
  SETROUTERLIST,
  ADDHISTORYROUTERS
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
    let historyRouter = state.routerList.find(item => item.name === menuName)
    state.historyRouters.push(historyRouter)
  }
}
