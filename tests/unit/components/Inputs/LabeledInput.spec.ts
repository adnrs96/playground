import { shallowMount } from '@vue/test-utils'
import LabeledInput from '@/components/Inputs/LabeledInput.vue'

describe('LabeledInput.vue', () => {
  it('should mount', () => {
    const view = shallowMount(LabeledInput, {})

    expect(view.html()).toBeTruthy()
    view.destroy()
  })
})
