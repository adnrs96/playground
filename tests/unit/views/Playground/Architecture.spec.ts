import { shallowMount, Wrapper } from '@vue/test-utils'
import Architecture from '@/views/Playground/Architecture.vue'
import counter from '@/samples/counter'

describe('Plaground::Architecture', () => {
  let archi: Wrapper<Architecture>
  let vm: any

  beforeEach(() => {
    archi = shallowMount(Architecture, {
      propsData: {
        architecture: counter.architecture
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
    expect(vm).toHaveProperty('architecture', counter.architecture)
  })
})
