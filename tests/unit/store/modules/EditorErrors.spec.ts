import Vuex, { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import EditorErrors from '@app/store/modules/EditorErrors'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Store::EditorErrors', () => {
  let store: Store<any>

  beforeEach(() => {
    store = new Vuex.Store(EditorErrors)
  })

  afterEach(() => {
    store.state.errors = []
    store.state.cursorLine = -1
  })

  describe('getters', () => {
    describe('getSLSErrors', () => {
      expect.assertions(1)
      it('should return the value', () => {
        store.state.errors = [{ msg: 'foobar', line: 1, relativeTop: 2, editorTop: 3 }]
        const value = store.getters.getSLSErrors
        expect(value).toEqual([{ msg: 'foobar', line: 1, relativeTop: 2, editorTop: 3 }])
      })
    })
    describe('getCursorLine', () => {
      expect.assertions(1)
      it('should return the value', () => {
        store.state.cursorLine = 5
        const value = store.getters.getCursorLine
        expect(value).toEqual(5)
      })
    })
  })

  describe('mutations', () => {
    describe('setSLSErrors', () => {
      expect.assertions(1)
      it('should set errors list', () => {
        expect.assertions(2)
        expect(store.state.errors).toEqual([])
        store.commit('setSLSErrors', [{ msg: 'foobar', line: 1, relativeTop: 2, editorTop: 3 }])
        expect(store.state.errors).toEqual([{ msg: 'foobar', line: 1, relativeTop: 2, editorTop: 3 }])
      })
    })
    describe('setCursorLine', () => {
      expect.assertions(1)
      it('should set cursorLine state', () => {
        expect.assertions(2)
        expect(store.state.cursorLine).toEqual(-1)
        store.commit('setCursorLine', 5)
        expect(store.state.cursorLine).toEqual(5)
      })
    })
    describe('clearCursorState', () => {
      expect.assertions(1)
      it('should set cursorLine state', () => {
        expect.assertions(2)
        store.state.cursorLine = 5
        expect(store.state.cursorLine).toEqual(5)
        store.commit('clearCursorState')
        expect(store.state.cursorLine).toEqual(-1)
      })
    })
    describe('clearErrorState', () => {
      expect.assertions(1)
      it('should set cursorLine state', () => {
        expect.assertions(4)
        store.state.cursorLine = 5
        store.state.errors = [{ msg: 'foobar', line: 1, relativeTop: 2, editorTop: 3 }]
        expect(store.state.cursorLine).toEqual(5)
        expect(store.state.errors).toEqual([{ msg: 'foobar', line: 1, relativeTop: 2, editorTop: 3 }])
        store.commit('clearErrorState')
        expect(store.state.cursorLine).toEqual(-1)
        expect(store.state.errors).toEqual([])
      })
    })
  })
})
