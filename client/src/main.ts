import Vue from 'vue'
import VueTailwindModal from 'vue-tailwind-modal'

import '@/editor'
import store from '@/store'
import App from '@/App.vue'
import '@/assets/styles/tailwind.scss'


Vue.use(VueTailwindModal)

new Vue({
  el: '#app',
  store,
  render: (h) => h(App),
})
