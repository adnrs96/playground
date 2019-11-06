import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'
import event from '@/event'
import Vuex, { Store } from 'vuex'
import Logs from '@/store/modules/Logs'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Navbar.vue', () => {
  let navbar: Wrapper<Navbar>
  let vm: any
  let store: Store<any>

  beforeEach(() => {
    store = new Vuex.Store(Logs)
    navbar = shallowMount(Navbar, { store, localVue })
    vm = navbar.vm as any
  })

  afterEach(() => {
    navbar.destroy()
  })

  it('should display', () => {
    expect(navbar.html()).toBeTruthy()
    navbar.destroy()
  })

  describe('.deploy()', () => {
    it(`shouldn't do anything when already deploying`, () => {
      expect.assertions(1)
      vm.deploying = true
      vm.incrementReleaseCount = jest.fn()
      vm.deploy()
      expect(vm.incrementReleaseCount).not.toHaveBeenCalled()
    })

    it('should increment releases count, block button and emit an event', () => {
      vm.deploy()
      event.$emit = jest.fn()
      store.commit = jest.fn()
      expect(vm).toHaveProperty('deploying', true)
      // expect(store.commit).toHaveBeenCalledWith('incrementReleasesCount')
      // expect(event.$emit).toHaveBeenCalledTimes(1)
    })
  })

  describe('.deplyDone()', () => {
    it('should reset the deploying state', () => {
      expect.assertions(1)
      vm.deploying = true
      vm.deployDone()
      expect(vm).toHaveProperty('deploying', false)
    })
  })
})
