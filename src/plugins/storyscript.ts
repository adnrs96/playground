import Vue from 'vue'
import plugin from '@storyscript/vue'
import store from '@/store'
import '@storyscript/vue/dist/vue.storyscript.esm.css'

Vue.use(plugin, { store })
