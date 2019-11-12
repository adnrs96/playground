import Studio from '@/views/Studio/index.vue'
import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import samples from '@/samples'
import Vuex, { Store } from 'vuex'
import StorePayload from '@/store/modules/Payload'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Studio index', () => {
  let studio: Wrapper<Studio>
  let vm: any
  let store: Store<any>

  beforeEach(() => {
    store = new Vuex.Store(StorePayload)
    studio = shallowMount(Studio, {
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
    vm = studio.vm as any
  })

  afterEach(() => {
    studio.destroy()
  })

  it('should mount', () => {
    expect.assertions(1)
    expect(studio.html()).toBeDefined()
  })

  it('should skip intro', () => {
    expect.assertions(1)
    const view = shallowMount(Studio, {
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
      const view = shallowMount(Studio, {
        store,
        localVue,
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
      store.commit = jest.fn()
      vvm.setPayload('counter')
      expect(vvm).toHaveProperty('payload', samples['counter'])
      view.destroy()
    })
  })
})
