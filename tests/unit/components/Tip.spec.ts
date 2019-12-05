import { shallowMount, Wrapper } from '@vue/test-utils'
import Tip from '@/components/Tip.vue'

describe('Tip.vue', () => {
  describe('tip should mount', () => {
    it('should display', () => {
      const tip: Wrapper<Tip> = shallowMount(Tip, {
        stubs: {
          's-text': '<div />',
          's-icon': '<div />'
        }
      })
      expect(tip.html()).toBeTruthy()
      tip.destroy()
    })
  })
})
