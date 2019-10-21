import { shallowMount, Wrapper } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'

describe('Navbar.vue', () => {
  describe('navbar should mount', () => {
    it('should display', () => {
      const navbar = shallowMount(Navbar)
      expect(navbar.html()).toBeTruthy()
      navbar.destroy()
    })
  })
})
