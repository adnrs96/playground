import Vuex, { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import Samples from '@/store/modules/Samples'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Store::Samples', () => {
  let store: Store<any>

  beforeEach(() => {
    store = new Vuex.Store(Samples)
    store.state.written = []
  })

  describe('getters', () => {
    it('getSamplesWritten', () => {
      expect.assertions(1)
      const value = store.getters.getSamplesWritten
      expect(value).toEqual([])
    })
    it('isSampleWritten', () => {
      expect.assertions(2)
      let value = store.getters.isSampleWritten('hello')
      expect(value).toEqual(false)
      store.commit('writeSample', 'hello')
      value = store.getters.isSampleWritten('hello')
      expect(value).toEqual(true)
    })
  })

  describe('mutations', () => {
    it('writeSample', () => {
      expect.assertions(2)
      expect(store.state.written.length).toEqual(0)
      store.commit('writeSample', 'hello')
      store.commit('writeSample', 'hello')
      expect(store.state.written.length).toEqual(1)
    })
  })
})
