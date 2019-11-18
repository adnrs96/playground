import Index from '@/views/index.vue'
import { Wrapper, shallowMount } from '@vue/test-utils'

describe('index.vue', () => {
  let view: Wrapper<Index>
  let vm: any

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
          $router: { push: jest.fn() }
        }
      })
      vm = view.vm as any
    })

    it('should mount', () => {
      expect.assertions(1)
      expect(view.html()).toBeDefined()
    })

    it('isIntro should be false', async () => {
      expect.assertions(1)

      const idxView = await shallowMount(Index, {
        stubs: {
          RouterView: true
        },
        mocks: {
          $route: {
            query: {
              skipIntro: 'true'
            }
          }
        }
      })
      const ivm = idxView.vm as any
      expect(ivm).toHaveProperty('isIntro', false)
      idxView.destroy()
    })
  })
})
