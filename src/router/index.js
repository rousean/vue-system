import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../views/layout/index.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import('../views/dashboard/index.vue'),
        name: 'dashboard'
      },
      {
        path: '/auth',
        component: () => import('../views/system/auth/auth.vue'),
        name: 'auth'
      },
      {
        path: '/menu',
        component: () => import('../views/system/menu/menu.vue'),
        name: 'muth'
      },
      {
        path: '/user',
        component: () => import('../views/system/user/user.vue'),
        name: 'user'
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
