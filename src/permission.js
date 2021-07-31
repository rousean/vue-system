import router from './router'

import store from '@/store'

import { getTitle } from './util/get-title'

let asyncRouterFlag = 0

const whiteList = ['login']

router.beforeEach((to, from, next) => {
  document.title = getTitle(to.meta.title)
  const token = store.getters.getToken
  console.log(to.name)
  console.log(token)

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
      // 有token
      next()
    } else {
      // 不在白名单中并且未登陆的时候
      // next(`/login?redirect=${to.path}`)
      console.log(to.fullPath)
      next({
        path: '/login',
        // 保存我们所在的位置，以便以后再来
        query: { redirect: to.fullPath }
      })
    }
  }
})
