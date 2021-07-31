import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
    // meta: { title: '首页' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
    // meta: { title: '登录' }
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../views/layout/index.vue'),
    meta: { title: '首页' },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: { title: '首页' }
      },
      {
        path: '/auth',
        name: 'auth',
        component: () => import('../views/system/auth/auth.vue'),
        meta: { title: '角色管理' }
      },
      {
        path: '/menu',
        name: 'muth',
        component: () => import('../views/system/menu/menu.vue'),
        meta: { title: '菜单管理' }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/system/user/user.vue'),
        meta: { title: '用户管理' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
