import { shallowMount } from '@vue/test-utils'
import Modal from '@internal/components/Modals/Modal.vue'
import Directives from '@internal/directives'

Directives.register()

describe('Modal.vue', () => {
  it('should mount', () => {
    const view = shallowMount(Modal, {
      propsData: {
        title: 'hello world',
        close: false
      },
      inject: {
        show: { from: 'SBlur', default: () => { } },
        hide: { from: 'SBlur', default: () => { } }
      },
      stubs: {
        's-text': '<div />'
      }
    })

    expect(view.html()).toBeTruthy()
    view.destroy()
  })
})
