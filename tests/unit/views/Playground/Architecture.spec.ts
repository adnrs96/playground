import { shallowMount, Wrapper } from '@vue/test-utils'
import Architecture from '@/views/Playground/Architecture.vue'
import counter from '@/samples/counter'

describe('Plaground::Architecture', () => {
  let archi: Wrapper<Architecture>
  let vm: any

  beforeEach(() => {
    archi = shallowMount(Architecture, {
      propsData: {
        services: counter.services
      }
    })
    vm = archi.vm as any
  })

  afterEach(() => {
    archi.destroy()
  })

  it('should mount with the required props', () => {
    expect.assertions(2)
    expect(archi.html()).toBeDefined()
    expect(vm).toHaveProperty('services', counter.services)
  })
})
