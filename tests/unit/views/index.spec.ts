import Index from '@/views/index.vue'
import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import event from '@/event'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('index.vue', () => {
  let view: Wrapper<Index>
  let vm: any
  let router: VueRouter

  beforeEach(() => {})

  afterEach(() => {
    view.destroy()
  })

  describe('default routing', () => {
    beforeEach(() => {
      const routes = [
        {
          name: 'welcome',
          path: '/welcome'
        },
        {
          name: 'playground',
          path: '/:sample'
        }
      ]
      const $route = {
        path: '/welcome'
      }
      router = new VueRouter({
        routes: [...routes]
      })

      view = shallowMount(Index, {
        localVue,
        router,
        stubs: [
          'router-view'
        ],
        mocks: {
          $route
        }
      })
      vm = view.vm as any
    })

    it('should mount', () => {
      expect.assertions(1)
      expect(view.html()).toBeDefined()
    })

    describe(`event.$on('welcome')`, () => {
      it(`should register an eventListener for 'welcome'`, () => {
        expect.assertions(1)

        event.$emit('welcome', true)
        expect(vm).toHaveProperty('welcome', true)
      })
    })
  })
})
