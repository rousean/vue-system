import router from './router'
import store from './store'

import { getTitle } from './util/get-title'
import { getLocalStorage } from './util/storage'

let asyncRouterFlag = 0
const whiteList = ['login']

router.beforeEach(async (to, from, next) => {
  document.title = getTitle(to.meta.title)
  const token = getLocalStorage('token')
  if (whiteList.indexOf(to.name) > -1) {
    // 如果在白名单中
    if (token) {
      // 有token,已经登录
      next({ path: '/' })
    } else {
      // 没有token,
      next()
    }
  } else {
    // 不在白名单中
    if (token) {
      if (!asyncRouterFlag && store.getters.getAsyncRouter.length === 0) {
        await store.dispatch('postRouter')
        const asyncRouter = store.getters.getAsyncRouter
        asyncRouter.forEach(item => {
          router.addRoute('layout', item)
        })
        next({ ...to, replace: true })
      } else {
        if (to.matched.length) {
          next()
        } else {
          next({ path: '/layout/404' })
        }
      }
    } else {
      // 不在白名单中并且未登陆的时候
      // next(`/login?redirect=${to.path}`)
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
})
