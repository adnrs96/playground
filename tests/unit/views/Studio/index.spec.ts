import Studio from '@/views/Studio/index.vue'
import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import samples from '@/samples'
import Vuex, { Store } from 'vuex'
import StorePayload from '@/store/modules/Payload'
import StoreTips from '@/store/modules/Tips'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Studio index', () => {
  let studio: Wrapper<Studio>
  let store: Store<any>

  beforeEach(() => {
    store = new Vuex.Store({
      state: { ...StorePayload.state, ...StoreTips.state },
      getters: { ...StorePayload.getters, ...StoreTips.getters },
      mutations: { ...StorePayload.mutations, ...StoreTips.mutations }
    })
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
      store,
      localVue,
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
      expect(vvm).toHaveProperty('payload', samples.counter)
      view.destroy()
    })
  })

  describe('exitFullscreen', () => {
    let idxView: Wrapper<Studio>
    let ivm: any

    beforeEach(() => {
      idxView = shallowMount(Studio, {
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
