import axios from 'axios'

import { getLocalStorage } from '../util/storage'
import {
  removePending,
  addPending,
  responseHandle,
  errorHandle
} from './http-util'
import config from './http-config'

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
      promise = axios.get(url, config)
    } else {
      // Post请求处理逻辑
      promise = axios.post(url, data, config)
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
    return responseHandle(response)
  },
  error => {
    error.config && removePending(error.config)
    return errorHandle(error)
  }
)

export default http
