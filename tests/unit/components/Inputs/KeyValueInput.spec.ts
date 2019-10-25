import { shallowMount } from '@vue/test-utils'
import KeyValueInput from '@/components/Inputs/KeyValueInput.vue'

describe('KeyValueInput.vue', () => {
  it('should mount', () => {
    const view = shallowMount(KeyValueInput, {})

    expect(view.html()).toBeTruthy()
    view.destroy()
  })

  it('should emit on value changes', () => {
    const view = shallowMount(KeyValueInput, {})
    const vm = view.vm as any

    expect.assertions(6)
    expect(vm.value).toEqual({})
    view.setProps({
      value: {
        scope: 'http',
        key: 'API_KEY_STUB',
        value: 'toto'
      }
    })
    vm.onInputChange()
    expect(view.emitted().input).toBeTruthy()
    expect(view.emitted().change).toBeTruthy()
    expect(view.emitted().input[0][0]).toEqual({
      scope: 'http',
      key: 'API_KEY_STUB',
      value: 'toto'
    })
    expect(view.emitted().change[0][0]).toEqual({
      scope: 'http',
      key: 'API_KEY_STUB',
      value: 'toto'
    })
    expect(vm.value).toEqual({
      scope: 'http',
      key: 'API_KEY_STUB',
      value: 'toto'
    })
    view.destroy()
  })
})
