import PerfectScrollbar from '@internal/components/PerfectScrollbar.vue'
import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils'
import event from '@app/event'

const localVue = createLocalVue()

describe('PerfectScrollbar.vue', () => {
  describe('should update correctly', () => {
    let perfectScrollbar: Wrapper<PerfectScrollbar>
    let vm: any

    beforeEach(() => {
      perfectScrollbar = shallowMount(PerfectScrollbar, {
        slots: {
          default: '<div>hello world</div>'
        }
      })
      vm = perfectScrollbar.vm as any
    })

    afterEach(() => {
      perfectScrollbar.destroy()
    })

    it('should call hooks', async (done) => {
      expect.assertions(2)
      vm.destroy = jest.fn()
      vm.update = jest.fn()
      vm.onRouteUpdate()
      perfectScrollbar.vm.$forceUpdate()
      perfectScrollbar.destroy()
      vm.$nextTick(() => {
        try {
          expect(vm.update).toHaveBeenCalledTimes(2)
          expect(vm.destroy).toHaveBeenCalledTimes(1)
          done()
        } catch (e) { done.fail(e) }
      })
    })

    it('scrollHandle -- should emit', () => {
      vm.scrollHandle({ type: 'scrollType' })
      expect(perfectScrollbar.emitted().scrollType).toBeTruthy()
    })

    it('setScrollingY -- should disable and call destroy', () => {
      vm.destroy = jest.fn()
      vm.init = jest.fn()
      vm.setScrollingY(false)
      expect(vm.destroy).toHaveBeenCalled()
      expect(vm.init).not.toHaveBeenCalled()
      expect(vm).toHaveProperty('suppressScrollY', true)
    })

    it('setScrollingY -- should enable and call init', () => {
      vm.destroy = jest.fn()
      vm.init = jest.fn()
      vm.setScrollingY(true)
      expect(vm.destroy).not.toHaveBeenCalled()
      expect(vm.init).toHaveBeenCalled()
      expect(vm).toHaveProperty('suppressScrollY', false)
    })

    it('update -- should update', () => {
      vm.ps.update = jest.fn()
      vm.update()
      expect(vm.ps.update).toHaveBeenCalled()
    })

    it('update -- should not update', () => {
      vm.ps = undefined
      vm.update()
      expect(vm.ps).toBe(undefined)
    })

    it('init -- should update', () => {
      vm.update = jest.fn()
      vm.init()
      expect(vm.update).toHaveBeenCalled()
    })

    it('init -- should not do anything', () => {
      vm.update = jest.fn()
      perfectScrollbar.setProps({ swicher: false })
      vm.init()
      expect(vm.update).not.toHaveBeenCalled()
    })

    it('destroy -- should destroy', () => {
      vm.destroy()
      expect(vm).toHaveProperty('isPSInitialized', false)
    })

    it('destroy -- should not destroy', () => {
      vm.ps = null
      vm.destroy()
      expect(vm).toHaveProperty('isPSInitialized', true)
    })

    it('onSwicherChange should call init', () => {
      vm.init = jest.fn()
      vm.destroy = jest.fn()
      vm.isPSInitialized = false
      vm.onSwicherChange(true)
      expect(vm.init).toHaveBeenCalled()
      expect(vm.destroy).not.toHaveBeenCalled()
    })

    it('onSwicherChange should call destroy', () => {
      vm.init = jest.fn()
      vm.destroy = jest.fn()
      vm.isPSInitialized = true
      vm.onSwicherChange(false)
      expect(vm.destroy).toHaveBeenCalled()
      expect(vm.init).not.toHaveBeenCalled()
    })

    it('mounted should not init', async () => {
      const init = jest.fn()
      Object.defineProperty(localVue.prototype, '$isServer', {
        get: () => true
      })
      const wrapper = await shallowMount(PerfectScrollbar, {
        localVue,
        methods: {
          init
        }
      })
      expect(init).not.toHaveBeenCalled()
      wrapper.destroy()
    })

    it('mounted should listen on event', async () => {
      const setScrollingY = jest.fn()
      const wrapper = await shallowMount(PerfectScrollbar, {
        methods: {
          setScrollingY
        }
      })
      event.$emit('stopScrolling')
      expect(setScrollingY).toHaveBeenCalledWith(false)
      event.$emit('startScrolling')
      expect(setScrollingY).toHaveBeenCalledWith(true)
      expect(setScrollingY).toHaveBeenCalledTimes(2)
      wrapper.destroy()
    })
  })
})
