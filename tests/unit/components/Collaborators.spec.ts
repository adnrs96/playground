import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import Collaborators from '@internal/components/Collaborators.vue'
import StorePayload from '@app/store/modules/Payload'
import Vuex, { Store } from 'vuex'
import defaultCollaborators from '@/samples/defaultCollaborators'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Collaborators', () => {
  let view: Wrapper<Collaborators>
  let vm: any
  let store: Store<any>

  beforeEach(() => {
    StorePayload.state.payload = {
      collaborators: defaultCollaborators
    }
    store = new Vuex.Store(StorePayload)
    view = shallowMount(Collaborators, {
      store,
      localVue,
      stubs: {
        's-text': '<div />'
      }
    })
    vm = view.vm as any
  })

  afterEach(() => {
    view.destroy()
  })

  it('should mount', () => {
    expect(view.html()).toBeTruthy()
    view.destroy()
  })

  describe('hoverHandler', () => {
    it('should handle the hover', () => {
      const e = { target: { classList: { remove: jest.fn(), add: jest.fn() } } }

      expect.assertions(3)
      vm.hoverHandler(e, true, 0)
      expect(vm.hovered).toEqual(0)
      vm.hoverHandler(e, false, 0)
      expect(vm.hovered).toEqual(-1)
      vm.hoverHandler(e, true, 4)
      expect(vm.hovered).toEqual(4)
    })
  })
})
