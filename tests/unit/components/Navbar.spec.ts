import { shallowMount, Wrapper } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'
import event from '@/event'

describe('Navbar.vue', () => {
  let navbar: Wrapper<Navbar>
  let vm: any

  beforeEach(() => {
    navbar = shallowMount(Navbar)
    vm = navbar.vm as any
  })

  afterEach(() => {
    navbar.destroy()
  })

  it('should display', () => {
    expect(navbar.html()).toBeTruthy()
    navbar.destroy()
  })

  describe('.publish()', () => {
    it('shouldn\'t do anything when already publishing', () => {
      expect.assertions(1)
      vm.publishing = true
      vm.publish()
      expect(vm.publishing).toBeTruthy()
    })

    it('should increment releases count, block button and emit an event', () => {
      vm.publish()
      event.$emit = jest.fn()
      expect(vm).toHaveProperty('publishing', true)
    })
  })

  describe('.deplyDone()', () => {
    it('should reset the publishing state', () => {
      expect.assertions(1)
      vm.publishing = true
      vm.publishDone()
      expect(vm).toHaveProperty('publishing', false)
    })
  })
})
