import Vue from 'vue'
import App from './views/app.vue'
import router from './router'
import './assets/style/app.styl'
import VueRouter from 'vue-router'
import 'normalize.css'
import './plugins'
import './filters'
import './components'

Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  // store,
  render: createElement => createElement(App),
})
