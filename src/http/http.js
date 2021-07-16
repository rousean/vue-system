import axios from 'axios'
import { getLocalStorage } from '../util/storage'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    console.log('请求拦截器执行了')
    console.log(config)
    // 请求加上token
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
    console.log('响应拦截器执行了')
    console.log(response)
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

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
      promise = axios.get(url)
    } else {
      // Post请求处理逻辑
      promise = axios.post(url, data)
    }
    // 返回Promise

    promise
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export default http
