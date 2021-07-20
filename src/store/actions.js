import { reqLogin } from '../api/index'
import { setLocalStorage } from '../util/storage'

import { SET_TOKEN } from './mutation-types'

import { handlePromise } from '../util/handle-promise'

export default {
  async postLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const result = await reqLogin(username, password)
      commit(SET_TOKEN, result.data.token)
      setLocalStorage('token', result.data.token)
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
