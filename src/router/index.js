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
    name: 'Login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('../views/layout/index.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import('../views/dashboard/index.vue'),
        name: 'Dashboard'
      },
      {
        path: '/auth',
        component: () => import('../views/system/auth/auth.vue'),
        name: 'Auth'
      },
      {
        path: '/menu',
        component: () => import('../views/system/menu/menu.vue'),
        name: 'Muth'
      },
      {
        path: '/user',
        component: () => import('../views/system/user/user.vue'),
        name: 'User'
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
