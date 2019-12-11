import { createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import LibraryPane from '@/app/store/modules/LibraryPane'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('LibraryPane Vuex Store', () => {
  let store: Store<any>

  beforeEach(() => {
    store = new Vuex.Store(LibraryPane)
  })

  describe('state', () => {
    it('should retturn the initial store state', () => {
      expect(store.state.open).toBeTruthy()
    })
  })

  describe('getters', () => {
    describe('isLibraryPaneOpen', () => {
      it('should return true', () => {
        expect(store.getters.isLibraryPaneOpen).toBeTruthy()
      })
      it('should return false', () => {
        store.state.open = false
        expect(store.getters.isLibraryPaneOpen).toBeFalsy()
      })
    })
  })

  describe('mutations', () => {
    describe('toggleLibraryPane', () => {
      it('should set the opposite value of \'open\'', () => {
        store.state.open = true
        store.commit('toggleLibraryPane')
        expect(store.state.open).toBeFalsy()
        store.commit('toggleLibraryPane')
        expect(store.state.open).toBeTruthy()
      })
    })
  })
})
