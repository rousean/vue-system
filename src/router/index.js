import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    meta: { title: '首页' },
    children: [
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   component: () => import('../views/dashboard/index.vue'),
      //   meta: { title: '首页' }
      // },
      // {
      //   path: '/system',
      //   name: 'system',
      //   component: () => import('../views/system/index.vue'),
      //   meta: { title: '系统管理' },
      //   children: [
      //     {
      //       path: '/auth',
      //       name: 'auth',
      //       component: () => import('../views/system/auth/auth.vue'),
      //       meta: { title: '角色管理' }
      //     },
      //     {
      //       path: '/menu',
      //       name: 'muth',
      //       component: () => import('../views/system/menu/menu.vue'),
      //       meta: { title: '菜单管理' }
      //     },
      //     {
      //       path: '/user',
      //       name: 'user',
      //       component: () => import('../views/system/user/user.vue'),
      //       meta: { title: '用户管理' }
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    meta: {
      title: '迷路了*。*'
    },
    component: () => import('../views/error/404.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
