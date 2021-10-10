import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../views/Layout/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '迷路了*。*',
      hidden: true
    },
    component: () => import('../views/Error/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
