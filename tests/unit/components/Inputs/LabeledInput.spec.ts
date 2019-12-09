import { shallowMount } from '@vue/test-utils'
import LabeledInput from '@internal/components/Inputs/LabeledInput.vue'

describe('LabeledInput.vue', () => {
  it('should mount', () => {
    const view = shallowMount(LabeledInput, {
      stubs: {
        's-text': '<div />'
      }
    })

    expect(view.html()).toBeTruthy()
    view.destroy()
  })
})
