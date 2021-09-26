import {
  SETTOKEN,
  SETASYNCROUTERS,
  SETROUTERLIST,
  SETHISTORYROUTERS
} from './mutation-types'
import { reqLogin, reqMenuList } from '../api/index'
import { setLocalStorage } from '../util/storage'
import { formatRouter, asyncRouterHandle } from '../util/router-util'

export default {
  async postLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const result = await reqLogin(username, password)
      if (result.code === 1) {
        commit(SETTOKEN, result.data.token)
        setLocalStorage('token', result.data.token)
      }
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async postRouter({ commit }) {
    try {
      const result = await reqMenuList()
      const asyncRouters = result.data
      const routerList = formatRouter(asyncRouters)
      asyncRouterHandle(asyncRouters)
      commit(SETASYNCROUTERS, asyncRouters)
      commit(SETROUTERLIST, routerList)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  setHistoryRouters({ commit }, route) {
    commit(SETHISTORYROUTERS, route)
  }
}
