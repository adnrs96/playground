import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import Collaborators from '@/components/Collaborators.vue'
import StorePayload from '@/store/modules/Payload'
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
      localVue
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
})
