import { reqLogin, reqRouter } from '../api/index'
import { setLocalStorage } from '../util/storage'

import { SETTOKEN, SETASYNCROUTER, SETROUTERLIST } from './mutation-types'

function formatRouter(arr) {
  return arr.reduce((acc, item) => {
    if (
      (!item.children || item.children.every(ch => ch.hidden)) &&
      item.name !== '404'
    ) {
      acc.push({ label: item.meta.title, value: item.name })
    }
    if (item.children && item.children.length > 0) {
      acc.push(...formatRouter(item.children))
    }
    return acc
  }, [])
}

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
      console.log(result)

      if (result.code === 1) {
        const baseRouter = [
          {
            path: '/layout',
            name: '/layout',
            components: 'view/layout/index.vue',
            meta: { title: '底层layout' },
            children: []
          }
        ]
        const asyncRouter = result.data
        asyncRouter.push({
          path: '404',
          name: '404',
          hidden: true,
          meta: {
            title: '迷路了*。*'
          },
          component: 'view/error/index.vue'
        })
        baseRouter[0].children = asyncRouter

        const routerList = formatRouter(asyncRouter)
        console.log('我执行了')

        console.log(routerList)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
