import axios from 'axios' // 引入axios
import store from '../store/index' // 引入Vuex
import router from '../router' // 引入vue-router
import { Message } from 'element-ui' //局部引入UI框架组件
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'https://xxx/' // 开发环境
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = '' // 调试环境
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://xxx/' // 生产环境
}
axios.defaults.timeout = 10000
// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization =
        `Bearer` + ' ' + localStorage.getItem('Authorization') //查看是否存在token
      return config
    } else if (config.isUpload) {
      config.headers = { 'Content-Type': 'multipart/form-data' } // 根据参数是否启用form-data方式
      return config
    } else {
      config.headers = { 'Content-Type': 'application/json' }
      return config
    }
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  // 服务码是200的情况
  response => {
    if (response.status === 200) {
      switch (response.data.code) {
        // 未登录
        case 3:
          Message({
            message: '未登录',
            type: 'error',
            offset: 380,
            duration: 1000
          })
          // 清除登录状态，返回首页
          localStorage.removeItem('Authorization')
          localStorage.removeItem('info')
          store.commit('changeNull')
          if (router.app._route.name != 'home') {
            setTimeout(() => {
              router.push({
                path: '/'
              })
            }, 1000)
          }
          break
        // 课程已添加
        case 100:
          Message({
            message: '课程已添加',
            type: 'error',
            offset: 380,
            duration: 1000
          })
          break
        // token过期
        case 5:
          Message({
            message: '登录过期，请重新登录',
            type: 'error',
            offset: 380,
            duration: 1000
          })
          // 清除登录状态，返回首页
          localStorage.removeItem('Authorization')
          localStorage.removeItem('info')
          store.commit('changeNull')
          if (router.app._route.name != 'home') {
            setTimeout(() => {
              router.push({
                path: '/'
              })
            }, 1000)
          }
          break
      }
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 404请求不存在
        case 404:
          Message({
            message: '网络请求不存在',
            type: 'error',
            offset: 380,
            duration: 1000
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          Message({
            message: error.response.data.message,
            type: 'error',
            offset: 380,
            duration: 1000
          })
      }
      return Promise.reject(error.response)
    }
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [请求时url后直接加的参数，默认为空]
 */
export function get(url, params, config = { add: '' }) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        url,
        {
          params: params
        },
        config
      )
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [是否启用multipart/form-data格式请求，默认为false]
 */
export function post(url, params, config = { isUpload: false }) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
