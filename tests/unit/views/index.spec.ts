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

    it('should redirect', async () => {
      expect.assertions(1)
      expect(push).toHaveBeenCalled()
    })

    it('isIntro should be false', async () => {
      expect.assertions(1)
      const rpush = jest.fn()

      const idxView = await shallowMount(Index, {
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
  })
})
