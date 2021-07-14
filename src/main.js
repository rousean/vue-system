import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
// import './style/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'

import './icons'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
