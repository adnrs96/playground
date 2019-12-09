import { mount } from '@vue/test-utils'
import NotFound from '@app/NotFound.vue'

describe('NotFound.vue', () => {
  it('should mount', () => {
    const view = mount(NotFound)

    expect(view.html()).toBeTruthy()
    view.destroy()
  })
})
