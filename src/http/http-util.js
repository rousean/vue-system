import axios from 'axios'

import { Notification } from 'element-ui'
import { clearLocalStorage } from '../util/storage'

// 存储请求
const pendingMap = new Map()

/**
 * 删除重复的请求
 * @param {*} config
 */
export function removePending(config) {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
export function addPending(config) {
  const pendingKey = getPendingKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel)
      }
    })
}

export function responseHandle(response) {
  if (response.data.code === 1) {
    Notification({
      title: '成功',
      message: '欢迎您登录!',
      type: 'success'
    })
    return Promise.resolve(response)
  } else if (response.data.code === 0) {
    Notification({
      title: '失败',
      message: response.data.message,
      type: 'error'
    })
    return Promise.reject(response)
  } else {
    Notification({
      title: '失败',
      message: '未知错误!',
      type: 'error'
    })
    return Promise.reject(response)
  }
}

export function errorHandle(error) {
  if (error && error.response) {
    let errors = ''
    let messages = ''
    switch (error.response.status) {
      case 400:
        errors = error.response.data.errors
        messages = errors.map((err, index, array) => err.msg)
        // error.message = '错误请求!'
        error.message = messages.toString()
        break
      case 401:
        error.message = '未授权,请重新登录!'
        break
      case 403:
        error.message = '拒绝访问!'
        break
      case 404:
        error.message = '请求错误,未找到该资源!'
        break
      case 405:
        error.message = '请求方法未允许!'
        break
      case 408:
        error.message = '请求超时!'
        break
      case 500:
        error.message = '服务器端出错!'
        break
      case 501:
        error.message = '网络未实现!'
        break
      case 502:
        error.message = '网络错误!'
        break
      case 503:
        error.message = '服务不可用!'
        break
      case 504:
        error.message = '网络超时!'
        break
      case 505:
        error.message = 'http版本不支持该请求!'
        break
      default:
        error.message = `连接错误${error.response.status}!`
    }
  } else {
    if (JSON.stringify(error).includes('timeout')) {
      message.error('服务器响应超时，请刷新当前页!')
    }
    error.message = '连接服务器失败!'
  }
  Notification({
    title: '失败',
    message: error.message,
    type: 'error'
  })
  return Promise.resolve(error.response)
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
