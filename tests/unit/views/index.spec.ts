import Index from '@app/index.vue'
import { Wrapper, shallowMount } from '@vue/test-utils'

describe('index.vue', () => {
  let view: Wrapper<Index>

  beforeEach(() => {
    view = shallowMount(Index, {
      stubs: {
        RouterView: true
      }
    })
  })

  afterEach(() => {
    view.destroy()
  })

  describe('mounting', () => {
    it('should mount', () => {
      expect.assertions(1)
      expect(view.html()).toBeDefined()
    })
  })
})
