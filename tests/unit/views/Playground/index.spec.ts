import Playground from '@/views/Playground/index.vue'
import { Wrapper, shallowMount } from '@vue/test-utils'

describe('Playground index', () => {
  let playground: Wrapper<Playground>
  let vm: any

  beforeEach(() => {
    playground = shallowMount(Playground)
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
      mocks: {
        $route: {
          query: { skipIntro: 'true' }
        }
      }
    })
    expect(view.vm).toHaveProperty('isIntro', false)
    view.destroy()
  })
})
