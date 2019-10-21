import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import Playground from '@/Playground.vue'

import VueRouter from 'vue-router'
import event from '@/event'
import { Sentry } from '@/plugins'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('main::Playground.vue', () => {
  let router: VueRouter
  let playground: Wrapper<Playground>
  let vm: any

  beforeEach(() => {
    router = new VueRouter({
      routes: [
        {
          name: 'playground',
          path: '/'
        }
      ]
    })
    playground = shallowMount(Playground, { router, localVue })
    vm = playground.vm as any
  })

  afterEach(() => {
    playground.destroy()
  })

  it('should mount', () => {
    expect(playground.html()).toBeTruthy()
  })

  it('status should have proper value', () => {
    expect.assertions(2)
    vm.$refs.pwaUpdateNotification = { show: jest.fn() }
    vm.onSWEventListener({ invalid: true })
    vm.onSWEventListener({ status: 'registered' })
    vm.onSWEventListener({ status: 'ready' })
    vm.onSWEventListener({ status: 'update', latest: false })
    expect(vm.$refs.pwaUpdateNotification.show).not.toHaveBeenCalled()
    vm.onSWEventListener({ status: 'update', latest: true, refresh: true })
    vm.$nextTick().then(() => {
      expect(vm.$refs.pwaUpdateNotification.show).toHaveBeenCalled()
    })
  })

  it('window.reload should be call', () => {
    window.location.reload = jest.fn()
    vm.refresh()
    expect(window.location.reload).toHaveBeenCalled()
  })
})
