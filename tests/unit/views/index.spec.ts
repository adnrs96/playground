import Index from '@/views/index.vue'
import { Wrapper, shallowMount } from '@vue/test-utils'

describe('index.vue', () => {
  let view: Wrapper<Index>
  const push: any = jest.fn()

  beforeEach(() => { })

  afterEach(() => {
    view.destroy()
  })

  describe('default routing', () => {
    beforeEach(() => {
      view = shallowMount(Index, {
        stubs: {
          RouterView: true
        },
        mocks: {
          $route: { params: {}, path: '/' },
          $router: { push }
        }
      })
    })

    it('should mount', () => {
      expect.assertions(1)
      expect(view.html()).toBeDefined()
    })

    it('should redirect', () => {
      expect.assertions(1)
      expect(push).toHaveBeenCalled()
    })

    it('isIntro should be false', () => {
      expect.assertions(1)
      const rpush = jest.fn()

      const idxView = shallowMount(Index, {
        stubs: {
          RouterView: true
        },
        mocks: {
          $route: {
            params: {
              sample: 'counter'
            }
          },
          $router: { push: rpush }
        }
      })
      expect(rpush).not.toHaveBeenCalled()
      idxView.destroy()
    })

    describe('watcher', () => {
      it('should call the checkRoute method when route changes', () => {
        const vm = view.vm as any
        vm.checkRoute = jest.fn()
        vm.onRouteChange()
        expect(vm.checkRoute).toHaveBeenCalled()
      })
    })
  })
})
