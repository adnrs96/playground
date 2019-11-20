import Vuex, { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import Payload from '@/store/modules/Payload'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Store::Payload', () => {
  let store: Store<any>

  beforeEach(() => {
    store = new Vuex.Store(Payload)
  })

  describe('getters', () => {
    describe('getPayload', () => {
      expect.assertions(1)
      it('should return the value', () => {
        const value = store.getters.getPayload
        expect(value).toEqual({})
      })
    })
  })

  describe('mutations', () => {
    describe('setPayload', () => {
      expect.assertions(1)
      it('should increment the value', () => {
        store.commit('setPayload', { name: 'Richard Tichaut' })
        expect(store.state.payload).toEqual({ name: 'Richard Tichaut' })
      })
    })
  })
})
