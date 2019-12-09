import { shallowMount, Wrapper } from '@vue/test-utils'
import Intro from '@internal/components/Intro.vue'

describe('Intro.vue', () => {
  describe('intro should mount', () => {
    it('should display', () => {
      const intro = shallowMount(Intro, {
        propsData: {
          tips: [{ name: '', text: '', x: 0, y: 0 }]
        },
        stubs: {
          's-text': '<div />',
          's-icon': '<div />'
        }
      })
      expect(intro.html()).toBeTruthy()
      intro.destroy()
    })
  })

  describe('intro methods', () => {
    let view: Wrapper<Intro>
    let vm: any

    beforeEach(() => {
      view = shallowMount(Intro, {
        propsData: {
          tips: [{
            name: 'tip-1',
            text: 'content',
            x: 0,
            y: 0
          }, {
            name: 'tip-2',
            text: 'content',
            x: 0,
            y: 0
          }],
          showAtStartup: true
        },
        stubs: {
          's-icon': '<div />',
          's-text': '<div />'
        }
      })
      vm = view.vm as any
    })

    afterEach(() => {
      view.destroy()
    })

    it('onCurrentTipIncrement', async () => {
      expect.assertions(3)
      expect(vm).toHaveProperty('refreshTip', false)
      vm.onCurrentTipIncrement()
      expect(vm).toHaveProperty('refreshTip', true)
      vm.$nextTick().then(() => {
        expect(vm).toHaveProperty('refreshTip', false)
      })
    })

    it('showTip', async () => {
      expect.assertions(2)
      vm.$refs.tip = { show: false }
      expect(vm.$refs.tip).toHaveProperty('show', false)
      vm.showTip()
      await new Promise(resolve => {
        setTimeout(() => {
          expect(vm.$refs.tip).toHaveProperty('show', true)
          resolve()
        }, 200)
      })
    })

    it('updateTip', async () => {
      expect.assertions(4)
      vm.showTip = jest.fn()
      expect(vm).toHaveProperty('currentTipIdx', 0)
      vm.updateTip()
      expect(vm).toHaveProperty('currentTipIdx', 1)
      await vm.$nextTick()
      expect(vm.showTip).toHaveBeenCalled()
      vm.updateTip()
      expect(view.emitted().done).toBeTruthy()
    })
  })
})
