import { shallowMount, Wrapper } from '@vue/test-utils'
import Studio from '@/Studio.vue'

describe('main::Studio.vue', () => {
  let studio: Wrapper<Studio>
  let vm: any
  let boot: typeof jest.fn

  beforeEach(() => {
    boot = jest.fn()
    studio = shallowMount(Studio, {
      stubs: {
        'router-view': '<div />'
      },
      mocks: {
        $intercom: {
          boot
        }
      }
    })
    vm = studio.vm as any
  })

  afterEach(() => {
    studio.destroy()
  })

  it('should mount', () => {
    expect.assertions(2)
    expect(boot).toHaveBeenCalled()
    expect(studio.html()).toBeTruthy()
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
