import Playground from '@/views/Playground/index.vue'
import { Wrapper, shallowMount } from '@vue/test-utils'
import samples from '@/samples'

describe('Playground index', () => {
  let playground: Wrapper<Playground>
  let vm: any

  beforeEach(() => {
    playground = shallowMount(Playground, {
      stubs: {
        RouterView: true
      },
      mocks: {
        $route: {
          path: '/example/test'
        },
        $router: {
          push: jest.fn(),
          replace: jest.fn()
        }
      },
      propsData: {
        sample: ''
      }
    })
    vm = playground.vm as any
  })

  afterEach(() => {
    playground.destroy()
  })

  it('should mount', () => {
    expect.assertions(1)
    expect(playground.html()).toBeDefined()
  })

  it('should skip intro', () => {
    expect.assertions(1)
    const view = shallowMount(Playground, {
      propsData: {
        sample: 'not-a-sample'
      },
      mocks: {
        $route: {
          query: { skipIntro: 'true' }
        },
        $router: {
          push: jest.fn(),
          replace: jest.fn()
        }
      }
    })
    expect(view.vm).toHaveProperty('isIntro', false)
    view.destroy()
  })

  describe('.setPayload(string)', () => {
    it('should set the payload', () => {
      const view = shallowMount(Playground, {
        propsData: {
          sample: 'counter'
        },
        mocks: {
          $route: {
            query: { skipIntro: 'true' }
          },
          $router: {
            push: jest.fn(),
            replace: jest.fn()
          }
        }
      })
      const vvm = view.vm as any

      expect.assertions(1)
      vvm.setPayload('counter')
      expect(vvm).toHaveProperty('payload', samples['counter'])
      view.destroy()
    })
  })
})
