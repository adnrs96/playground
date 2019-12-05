import { shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modals/Modal.vue'
import Directives from '@/directives'

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
