import Playground from '@/views/Playground/index.vue'
import { Wrapper, shallowMount } from '@vue/test-utils'
import samples from '@/samples'

describe('Playground index', () => {
  let playground: Wrapper<Playground>
  let vm: any

  beforeEach(() => {
  })

  afterEach(() => {
    playground.destroy()
  })

  it('should mount', () => {
    playground = shallowMount(Playground, {
      propsData: {
        sample: ''
      }
    })
    vm = playground.vm as any

    expect.assertions(1)
    expect(playground.html()).toBeDefined()
  })

  describe('.setPayload(string)', () => {
    it('should set the payload', () => {
      playground = shallowMount(Playground, {
        propsData: {
          sample: 'counter'
        }
      })
      vm = playground.vm as any

      expect.assertions(1)
      vm.setPayload('counter')
      expect(vm).toHaveProperty('payload', samples['counter'])
    })
  })
})
