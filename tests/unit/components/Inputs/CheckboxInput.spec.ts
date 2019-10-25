import { shallowMount } from '@vue/test-utils'
import CheckboxInput from '@/components/Inputs/CheckboxInput.vue'

describe('CheckboxInput.vue', () => {
  it('should mount', () => {
    const view = shallowMount(CheckboxInput, {})

    expect(view.html()).toBeTruthy()
    view.destroy()
  })
})
