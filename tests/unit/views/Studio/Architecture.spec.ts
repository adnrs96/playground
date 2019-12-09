import { shallowMount, Wrapper } from '@vue/test-utils'
import Architecture from '@app/Studio/Architecture.vue'
import event from '@app/event'

describe('Plaground::Architecture', () => {
  let archi: Wrapper<Architecture>
  let vm: any
  let fakeCB = jest.fn()

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
      },
      stubs: {
        's-text': '<div />',
        's-icon': '<div />'
      }
    })
    vm = archi.vm as any
    vm.sleep = jest.fn()

    event.$emit('publish', fakeCB)
    expect(archi.html()).toBeDefined()
    expect(vm).toHaveProperty('services', ['toto'])
  })

  it('should display services but not emit', async () => {
    expect.assertions(1)
    archi = shallowMount(Architecture, {
      propsData: {
        services: ['toto'],
        startAfter: 0,
        serviceDelay: -1
      },
      stubs: {
        's-text': '<div />',
        's-icon': '<div />'
      }
    })
    vm = archi.vm as any
    vm.sleep = jest.fn()
    fakeCB = jest.fn()

    vm.destroyed = true
    event.$emit('publish', fakeCB)
    expect(fakeCB).not.toHaveBeenCalled()
  })

  describe('.sleep()', () => {
    beforeEach(() => {
      archi = shallowMount(Architecture, {
        propsData: {
          services: ['toto'],
          startAfter: 0,
          serviceDelay: 0
        },
        stubs: {
          's-text': '<div />',
          's-icon': '<div />'
        }
      })
      vm = archi.vm as any
    })

    it('should display services (no timeout)', async () => {
      expect.assertions(2)
      vm.sleep = jest.fn()
      event.$emit('publish', fakeCB)
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
