import { SETTOKEN, SETASYNCROUTER, SETROUTERLIST } from './mutation-types'
import { reqLogin, reqRouter } from '../api/index'
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
      const result = await reqRouter()
      if (result.code === 1) {
        // const baseRouter = [
        //   {
        //     path: '/layout',
        //     name: '/layout',
        //     components: '../view/layout/index.vue',
        //     meta: { title: '底层layout' },
        //     children: []
        //   }
        // ]
        const asyncRouter = result.data
        // asyncRouter.push({
        //   path: '/404',
        //   name: '404',
        //   hidden: true,
        //   meta: {
        //     title: '迷路了*。*'
        //   },
        //   component: '../view/error/index.vue'
        // })
        const routerList = formatRouter(asyncRouter)
        // baseRouter[0].children = asyncRouter
        asyncRouter.push({
          path: '*',
          redirect: '/404'
        })
        asyncRouterHandle(asyncRouter)
        commit(SETASYNCROUTER, asyncRouter)
        commit(SETROUTERLIST, routerList)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
