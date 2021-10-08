import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

import createPersistedState from 'vuex-persistedstate'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          // 只储存state中的assessmentData
          historyRouters: val.historyRouters
        }
      }
    })
  ]
})
