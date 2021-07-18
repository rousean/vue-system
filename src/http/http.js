import axios from 'axios'
import { getLocalStorage } from '../util/storage'

// 存储请求
const pendingMap = new Map()

function http(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      // Get请求处理逻辑
      // 封装query参数
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      promise = axios.get(url, {
        baseURL: 'http://localhost:3000/',
        timeout: 1000
      })
    } else {
      // Post请求处理逻辑
      promise = axios.post(url, data, {
        baseURL: 'http://localhost:3000/',
        timeout: 1000
      })
    }
    // 返回Promise
    promise
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 删除重复请求
    removePending(config)
    // 添加请求
    addPending(config)
    // 所有请求加上token
    if (getLocalStorage('token')) {
      config.headers.Authorization = getLocalStorage('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    removePending(response.config)
    return response
  },
  error => {
    error.config && removePending(error.config)
    console.log(error.response.data)
    // const message = httpErrorStatusHandle(error)
    return Promise.reject(error)
  }
)

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error) {
  let message = ''
  // 处理被取消的请求
  if (axios.isCancel(error)) {
    message = '请求的重复请求：'
  }
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = '接口重定向了！'
        break
      case 400:
        message = '参数不正确！'
        break
      case 401:
        message = '您未登录，或者登录已经超时，请先登录！'
        break
      case 403:
        message = '您没有权限操作！'
        break
      case 404:
        message = `请求地址出错: ${error.response.config.url}`
        break // 在正确域名下
      case 408:
        message = '请求超时！'
        break
      case 409:
        message = '系统已存在相同数据！'
        break
      case 500:
        message = '服务器内部错误！'
        break
      case 501:
        message = '服务未实现！'
        break
      case 502:
        message = '网关错误！'
        break
      case 503:
        message = '服务不可用！'
        break
      case 504:
        message = '服务暂时无法访问，请稍后再试！'
        break
      case 505:
        message = 'HTTP版本不受支持！'
        break
      default:
        message = '异常问题，请联系管理员！'
        break
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！'
  if (error.message.includes('Network'))
    message = window.navigator.onLine ? '服务端异常！' : '您断网了！'

  return message
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)

    pendingMap.delete(pendingKey)
  }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey(config) {
  let { url, method, params, data } = config
  if (typeof data === 'string') {
    data = JSON.parse(data)
  }
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
function addPending(config) {
  const pendingKey = getPendingKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel)
      }
    })
}

export default http
