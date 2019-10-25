import { shallowMount } from '@vue/test-utils'
import SelectInput from '@/components/Inputs/SelectInput.vue'
import Directives from '@/directives'

Directives.register()

describe('SelectInput.vue', () => {
  it('should mount', () => {
    const view = shallowMount(SelectInput, {
      propsData: {
        options: ['toto', 'tata']
      }
    })

    expect(view.html()).toBeTruthy()
    view.destroy()
  })

  it('should close', () => {
    const view = shallowMount(SelectInput, {
      propsData: {
        options: ['toto', 'tata']
      }
    })
    const vm = view.vm as any
    vm.open = true
    expect(vm).toHaveProperty('open', true)
    vm.close()
    expect(vm).toHaveProperty('open', false)
    view.destroy()
  })

  it('.openable()', () => {
    expect.assertions(2)
    let view = shallowMount(SelectInput, {
      propsData: {
        disabled: true,
        options: ['toto', 'tata']
      }
    })
    let vm = view.vm as any
    expect(vm.openable).toBeFalsy()
    view.destroy()
    view = shallowMount(SelectInput, {
      propsData: {
        options: []
      }
    })
    vm = view.vm as any
    expect(vm.openable).toBeFalsy()
    view.destroy()
  })
})
