import { shallowMount, Wrapper } from '@vue/test-utils'
import Navbar from '@internal/components/Navbar.vue'

describe('Navbar.vue', () => {
  let navbar: Wrapper<Navbar>
  let vm: any

  beforeEach(() => {
    navbar = shallowMount(Navbar, {
      mocks: {
        $route: {
          name: 'welcome'
        }
      },
      stubs: {
        's-text': '<div />',
        's-icon': '<div />',
        's-button': '<div />',
        's-gradient-border-button': '<div />'
      }
    })
    vm = navbar.vm as any
  })

  afterEach(() => {
    navbar.destroy()
  })

  it('should display', () => {
    expect(navbar.html()).toBeTruthy()
    navbar.destroy()
  })

  describe('.onRouteChange()', () => {
    it('should watch and update this.welcome based on the $route', () => {
      vm.$route = { name: 'toto' }
      vm.onRouteChange()
      expect(vm.welcome).toBeFalsy()
    })
  })
})
