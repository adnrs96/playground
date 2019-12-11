import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import Library from '@app/Library/index.vue'
import LibraryPane, { ILibraryStore } from '@app/store/modules/LibraryPane'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Library > index.vue', () => {
  let view: Wrapper<Library>
  let vm: any
  let store: Store<ILibraryStore>

  beforeAll(() => {
    store = new Vuex.Store({
      state: { ...LibraryPane.state },
      getters: { ...LibraryPane.getters },
      mutations: { ...LibraryPane.mutations }
    })
    view = shallowMount(Library, {
      localVue,
      store,
      stubs: {
        's-icon': '<div />',
        's-text': '<div />',
        's-text-button': '<div />'
      }
    })
    vm = view.vm as any
  })

  describe('getters', () => {
    describe('marginPane', () => {
      describe('open', () => {
        it('should return ml-0', () => {
          store.state.open = true
          expect(vm.marginPane).toEqual('ml-0')
        })
      })
      describe('not open', () => {
        it('should return -ml-64', () => {
          store.state.open = false
          expect(vm.marginPane).toEqual('-ml-64')
        })
      })
    })
    describe('marginToggler', () => {
      describe('not open and not toggled', () => {
        it('should return ml-0', () => {
          store.state.open = false
          vm.toggled = false
          expect(vm.marginToggler).toEqual('ml-0')
        })
      })
      describe('else', () => {
        it('should return -ml-10', () => {
          store.state.open = true
          vm.toggled = true
          expect(vm.marginToggler).toEqual('-ml-10')
        })
      })
    })
  })

  describe('methods', () => {
    describe('togglePane', () => {
      it('should update the store', () => {
        store.state.open = true
        vm.togglePane()
        expect(store.state.open).toBeFalsy()
      })
      it('should set toggled to true for 350ms', async () => {
        vm.toggled = false
        vm.togglePane()
        expect(vm.toggled).toBeTruthy()
        await new Promise(resolve => setTimeout(resolve, 400))
        expect(vm.toggled).toBeFalsy()
      })
    })
  })
})
