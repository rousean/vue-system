import { reqLogin, reqRouter } from '../api/index'
import { setLocalStorage } from '../util/storage'

import { SETTOKEN, SETASYNCROUTER, SETROUTERLIST } from './mutation-types'

export default {
  async postLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const result = await reqLogin(username, password)
      if (result.code === 1) {
        commit(SETTOKEN, result.data.token)
        setLocalStorage('token', result.data.token)
      }
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async postRouter({ commit }) {
    try {
      const result = await reqRouter()
      if (result.code === 1) {
        console.log(result.code)

        console.log(result.data)
      }
    } catch (error) {
      console.log('')
    }
  }
}
