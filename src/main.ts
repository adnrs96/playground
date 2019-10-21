import Vue from 'vue'
import Playground from '@/Playground.vue'
import router from '@/router'
import store from '@/store'
import directives from '@/directives'
import '@/registerServiceWorker'
import '@/assets/styles/tailwind.scss'

Vue.config.productionTip = false
directives.register()

new Vue({
  router,
  store,
  render: h => h(Playground)
}).$mount('#playground')
