import Playground from '@/views/Playground/index.vue'
import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import StoreSamples from '@/store/modules/Samples'
import Vuex, { Store } from 'vuex'
import samples from '@/samples'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Playground index', () => {
  let playground: Wrapper<Playground>
  let vm: any
  let store: Store<any>

  beforeEach(() => {
    store = new Vuex.Store(StoreSamples)
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
      },
      store,
      localVue
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
      },
      store,
      localVue
    })
    expect(view.vm).toHaveProperty('isIntro', false)
    view.destroy()
  })

  describe('.setPayload(string)', () => {
    it('should set the payload', async () => {
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
        },
        store,
        localVue
      })
      const vvm = view.vm as any

      expect.assertions(1)
      vvm.setPayload('counter')
      expect(vvm).toHaveProperty('payload', samples['counter'])
      view.destroy()
    })
  })

  describe('.writeCode()', () => {
    it('should write code then return payload code', async () => {
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
        },
        store,
        localVue
      })
      const vvm = view.vm as any

      expect.assertions(2)
      await vvm.writeCode()
      expect(store.state).toHaveProperty('written', ['counter'])
      await vvm.writeCode()
      expect(vvm.isSampleWritten(vvm.sample)).toBeTruthy()
      view.destroy()
    })
  })
})
