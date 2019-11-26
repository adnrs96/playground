import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import modules from './modules'
import { version } from '@/../package.json'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({
    key: `studio-v${version.split('.')[0]}`, // keeping storage away from potential breaking changes
    paths: ['Tips']
  })]
})
