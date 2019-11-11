import Playground from '@/views/Playground/index.vue'
import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import samples from '@/samples'
import Vuex, { Store } from 'vuex'
import StorePayload from '@/store/modules/Payload'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Playground index', () => {
  let playground: Wrapper<Playground>
  let vm: any
  let store: Store<any>

  beforeEach(() => {
    store = new Vuex.Store(StorePayload)
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
      }
    })
    expect(view.vm).toHaveProperty('isIntro', false)
    view.destroy()
  })

  describe('.setPayload(string)', () => {
    it('should set the payload', () => {
      const view = shallowMount(Playground, {
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

  describe('exitFullscreen', () => {
    let idxView: Wrapper<Playground>
    let ivm: any

    beforeEach(() => {
      idxView = shallowMount(Playground, {
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
      ivm = idxView.vm as any
    })

    afterEach(() => {
      idxView.destroy()
    })

    it('should exit fullscreen when hitting Esc', () => {
      ivm.fullscreen = true
      ivm.exitFullscreen({ key: 'Escape' })
      expect(ivm.fullscreen).toBeFalsy()
    })

    it('shoud not exit on different keys', () => {
      ivm.fullscreen = true
      ivm.exitFullscreen({ key: 'Enter' })
      expect(ivm.fullscreen).toBeTruthy()
    })

    it('shoud not exit when not in fullscreen', () => {
      ivm.fullscreen = false
      ivm.exitFullscreen({ key: 'Escape' })
      expect(ivm.fullscreen).toBeFalsy()
    })
  })
})
