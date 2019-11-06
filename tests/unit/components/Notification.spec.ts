import { shallowMount, Wrapper } from '@vue/test-utils'
import Notification from '@/components/Notification.vue'

describe('Notification.vue', () => {
  describe('notification should mount', () => {
    it('should display', () => {
      const notification = shallowMount(Notification)
      expect(notification.html()).toBeTruthy()
      notification.destroy()
    })
  })

  describe('itemSelected switch', () => {
    let notification: Wrapper<Notification>
    let vm: any

    beforeEach(() => {
      notification = shallowMount(Notification)
      vm = notification.vm as any
    })

    afterEach(() => {
      notification.destroy()
    })

    it('should show', () => {
      expect.assertions(2)
      vm.visible = false
      expect(vm).toHaveProperty('visible', false)
      vm.show()
      expect(vm).toHaveProperty('visible', true)
    })

    it('should hide', () => {
      expect.assertions(2)
      expect(vm).toHaveProperty('visible', true)
      vm.hide()
      expect(vm).toHaveProperty('visible', false)
    })

    it('should force visibility hidden', () => {
      expect.assertions(1)

      const view = shallowMount(Notification, {
        propsData: {
          hidden: true
        }
      })
      expect(view.vm).toHaveProperty('visible', false)
      view.destroy()
    })
  })
})
