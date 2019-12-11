import { shallowMount, Wrapper } from '@vue/test-utils'
import Blur from '@internal/components/Blur.vue'

describe('Blur.vue', () => {
  let view: Wrapper<Blur>
  let vm: any

  beforeEach(() => {
    view = shallowMount(Blur, {
      stubs: {
        's-scrollbar': '<div />'
      }
    })
    const ps = view.vm.$refs.blurPS as any
    ps.setScrollingY = jest.fn()
    vm = view.vm as any
  })

  afterEach(() => {
    view.destroy()
  })

  it('should mount', () => {
    expect(view.html()).toBeTruthy()
    view.destroy()
  })

  describe('.hide()', () => {
    it('should hide when open', () => {
      vm.open = true
      vm.hide()
      expect(view.emitted().hidden).toBeTruthy()
      expect(vm.open).toEqual(false)
    })

    it('shouldn\'t do anything when already closed', () => {
      vm.open = false
      vm.hide()
      expect(view.emitted().hidden).toBeFalsy()
      expect(vm.open).toEqual(false)
    })
  })

  describe('.show()', () => {
    it('should open', async () => {
      vm.open = false
      vm.show()
      await new Promise((resolve) => setTimeout(resolve, 100))
      expect(vm.open).toBeTruthy()
    })

    it('should open but close directly', async () => {
      vm.enforce = true
      vm.open = false
      vm.show()
      vm.onOpenWatcher()
      await new Promise((resolve) => setTimeout(resolve, 100))
      expect(vm.open).toBeFalsy()
    })
  })

  describe('forceHide', () => {
    it('get', async () => {
      const enforce = vm.forceHide
      expect(enforce).toBeFalsy()
    })

    it('set', async () => {
      vm.forceHide = true
      expect(vm.forceHide).toBeTruthy()
    })
  })
})
