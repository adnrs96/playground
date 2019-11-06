import Vuex, { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import Logs from '@/store/modules/Logs'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Store::Logs', () => {
  let store: Store<any>

  beforeEach(() => {
    store = new Vuex.Store(Logs)
  })

  describe('getters', () => {
    describe('releasesCount', () => {
      expect.assertions(1)
      it('should return the value', () => {
        const value = store.getters.getReleasesCount
        expect(value).toEqual(0)
      })
    })
  })

  describe('mutations', () => {
    describe('incrementReleasesCount', () => {
      expect.assertions(1)
      it('should increment the value', () => {
        store.commit('incrementReleasesCount')
        expect(store.state.releasesCount).toEqual(1)
      })
    })
  })
})
