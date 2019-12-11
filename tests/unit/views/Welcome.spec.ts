import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import Welcome from '@app/Welcome.vue'
import VueRouter from 'vue-router'
import event from '@app/event'

const localVue = createLocalVue()

localVue.use(VueRouter)

describe('Welcome.vue', () => {
  let welcome: Wrapper<Welcome>
  let vm: any
  let router: VueRouter

  beforeEach(() => {
    router = new VueRouter({
      routes: [{
        name: 'studio',
        path: '/'
      }]
    })
    welcome = shallowMount(Welcome, {
      router,
      localVue,
      stubs: {
        'router-view': '<div />',
        's-text': '<div />',
        's-icon': '<div />',
        's-button': '<div />',
        's-scrollbar': '<div />'
      }
    })
    vm = welcome.vm as any
  })

  afterEach(() => {
    welcome.destroy()
  })

  it('should mount', () => {
    expect.assertions(1)
    expect(welcome.html()).toBeTruthy()
  })

  describe('.go(route)', () => {
    it('should route and emit', () => {
      expect.assertions(2)
      event.$emit = jest.fn()
      vm.$router.push = jest.fn()
      vm.go('counter')
      expect(event.$emit).toHaveBeenCalled()
      expect(vm.$router.push).toHaveBeenCalled()
    })
  })
})
