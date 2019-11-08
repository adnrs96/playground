import { shallowMount, Wrapper } from '@vue/test-utils'
import Architecture from '@/views/Playground/Architecture.vue'
import event from '@/event'

describe('Plaground::Architecture', () => {
  let archi: Wrapper<Architecture>
  let vm: any

  afterEach(() => {
    archi.destroy()
  })

  it('should display services (default timeout)', async () => {
    expect.assertions(2)
    archi = shallowMount(Architecture, {
      propsData: {
        services: ['toto'],
        startAfter: 0,
        serviceDelay: -1
      }
    })
    vm = archi.vm as any
    vm.sleep = jest.fn()

    event.$emit('publish')
    expect(archi.html()).toBeDefined()
    expect(vm).toHaveProperty('services', ['toto'])
  })

  describe('.sleep()', () => {
    beforeEach(() => {
      archi = shallowMount(Architecture, {
        propsData: {
          services: ['toto'],
          startAfter: 0,
          serviceDelay: 0
        }
      })
      vm = archi.vm as any
    })

    it('should display services (no timeout)', async () => {
      expect.assertions(2)
      vm.sleep = jest.fn()
      event.$emit('publish')
      expect(archi.html()).toBeDefined()
      expect(vm).toHaveProperty('services', ['toto'])
    })

    it('should sleep n ms', async () => {
      expect.assertions(1)
      const promise = vm.sleep(210)
      await promise
      expect(promise).toBeDefined()
    })
  })
})
