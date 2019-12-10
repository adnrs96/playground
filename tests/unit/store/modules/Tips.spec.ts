import Vuex, { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import Tips from '@app/store/modules/Tips'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Store::Tips', () => {
  let store: Store<any>

  beforeEach(() => {
    store = new Vuex.Store(Tips)
  })

  describe('getters', () => {
    describe('hasTipsBeenShown', () => {
      it('should be false', () => {
        expect.assertions(1)
        const value = store.getters.hasTipsBeenShown('hello')
        expect(value).toEqual(false)
      })
    })
  })

  describe('mutations', () => {
    describe('sampleHasBeenShown', () => {
      it('should add the value', () => {
        expect.assertions(1)
        store.commit('sampleHasBeenShown', 'counter')
        expect(store.state.samplesShown).toEqual(['counter'])
      })
      it('should not add the value again', () => {
        expect.assertions(1)
        store.commit('sampleHasBeenShown', 'counter')
        expect(store.state.samplesShown).toEqual(['counter'])
      })
    })
    describe('sampleHasNotBeenShown', () => {
      beforeEach(() => {
        store.commit('sampleHasBeenShown', 'counter')
      })
      it('should remove the value', () => {
        expect.assertions(2)
        expect(store.state.samplesShown).toEqual(['counter'])
        store.commit('sampleHasNotBeenShown', 'counter')
        expect(store.state.samplesShown).toEqual([])
      })
      it('should not remove the value again', () => {
        expect.assertions(2)
        expect(store.state.samplesShown).toEqual(['counter'])
        store.commit('sampleHasNotBeenShown', 'counter')
        store.commit('sampleHasNotBeenShown', 'counter')
        expect(store.state.samplesShown).toEqual([])
      })
    })
  })
})
