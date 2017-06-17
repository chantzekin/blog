//
// src/main.js

import Vue from 'vue'
import moment from 'moment'

import App from './App'
import router from './router'

const PROD = 'production'

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV !== PROD

Vue.filter('formatDate', value => moment(value).format('MMM DD, YY'));

const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

export { app, router }
