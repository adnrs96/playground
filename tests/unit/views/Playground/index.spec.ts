import Playground from '@/views/Playground/index.vue'
import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import samples from '@/samples'
import VueRouter from 'vue-router'

describe('Playground index', () => {
  let playground: Wrapper<Playground>
  let vm: any
  let router = new VueRouter({
    routes: [{
      path: '*',
      name: 'not-found'
    }]
  })

  const localVue = createLocalVue()
  localVue.use(VueRouter)

  beforeEach(() => {
  })

  afterEach(() => {
    playground.destroy()
  })

  it('should mount', () => {
    playground = shallowMount(Playground, {
      propsData: {
        sample: ''
      }
    })
    vm = playground.vm as any

    expect.assertions(1)
    expect(playground.html()).toBeDefined()
  })

  it('should mount', () => {
    const routes = [
      {
        name: 'welcome',
        path: '/welcome'
      },
      {
        name: 'playground',
        path: '/:sample'
      },
      {
        name: 'not-found',
        path: '*'
      }
    ]
    const $route = {
      path: '/example/test'
    }
    router = new VueRouter({
      routes: [...routes]
    })

    playground = shallowMount(Playground, {
      localVue,
      router,
      stubs: [
        'router-view'
      ],
      mocks: {
        $route
      },
      propsData: {
        sample: 'test'
      }
    })
    vm = playground.vm as any

    expect.assertions(1)
    expect(playground.html()).toBeDefined()
  })

  describe('.setPayload(string)', () => {
    it('should set the payload', () => {
      playground = shallowMount(Playground, {
        propsData: {
          sample: 'counter'
        }
      })
      vm = playground.vm as any

      expect.assertions(1)
      vm.setPayload('counter')
      expect(vm).toHaveProperty('payload', samples['counter'])
    })
  })
})
