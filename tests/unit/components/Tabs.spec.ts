import { shallowMount, Wrapper } from '@vue/test-utils'
import Tabs from '@/components/Tabs.vue'

describe('Tabs.vue', () => {
  let view: Wrapper<Tabs>
  let vm: any

  beforeEach(() => {
    view = shallowMount(Tabs, {
      slots: {
        default: ['<div data-tab-title="hello" />', '<div data-tab-title="world" />']
      }
    })
    vm = view.vm as any
  })

  afterEach(() => {
    view.destroy()
  })

  it('should mount', () => {
    expect.assertions(3)
    expect(view.html()).toBeTruthy()
    expect(vm).toHaveProperty('visibleSlot', 0)
    expect(vm).toHaveProperty('slots', ['hello', 'world'])
  })

  describe('.onVisibleSlotChange(idx, old)', () => {
    it('should not set and emit', () => {
      expect.assertions(1)
      vm.visibleSlot = 0
      vm.visibleSlot = 3
      expect(view.emitted().selected.length).toBe(1)
    })

    it(`should set new slot and emit`, () => {
      expect.assertions(1)
      vm.visibleSlot = 1
      expect(view.emitted().selected).toBeTruthy()
    })
  })

  it('selectedIdx', () => {
    expect.assertions(2)
    view.setProps({ selected: '1' })
    expect(vm.selectedIdx).toBe(1)
    view.setProps({ selected: 'hello' })
    expect(vm.selectedIdx).toBe(0)
  })

  it('mount with no slots has no slots', () => {
    expect.assertions(1)
    const tabs = shallowMount(Tabs)
    expect(tabs.vm).toHaveProperty('slots', [])
    tabs.destroy()
  })
})
