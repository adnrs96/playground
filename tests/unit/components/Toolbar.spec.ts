import { shallowMount, Wrapper } from '@vue/test-utils'
import Toolbar from '@/components/Toolbar.vue'

describe('Toolbar.vue', () => {
  let toolbar: Wrapper<Toolbar>

  beforeEach(() => {
    toolbar = shallowMount(Toolbar, {
      mocks: {
        $route: {
          name: 'welcome'
        }
      }
    })
  })

  afterEach(() => {
    toolbar.destroy()
  })

  it('should display', () => {
    expect(toolbar.html()).toBeTruthy()
  })
})
