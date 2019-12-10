import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils'
import HelpDrop from '@internal/components/HelpDrop.vue'
import Vuex, { Store } from 'vuex'
import Tips, { IStoreTips } from '@app/store/modules/Tips'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('HelpDrop.vue', () => {
  let helpDrop: Wrapper<HelpDrop>
  let vm: any
  let store: Store<IStoreTips>

  beforeEach(() => {
    store = new Vuex.Store(Tips)
    helpDrop = shallowMount(HelpDrop, {
      mocks: {
        $route: {
          name: 'welcome',
          params: {
            sample: 'hello'
          }
        }
      },
      stubs: {
        's-text': '<div />',
        's-icon': '<div />'
      },
      store,
      localVue
    })
    vm = helpDrop.vm as any
  })

  afterEach(() => {
    helpDrop.destroy()
  })

  it('should display', () => {
    expect(helpDrop.html()).toBeTruthy()
  })

  describe('.chatWithUs()', () => {
    it('show show intercom and call hideOnElementClick', () => {
      expect.assertions(2)
      vm.$intercom = { show: jest.fn() }
      vm.hideOnElementClicked = jest.fn()
      vm.chatWithUs()
      expect(vm.$intercom.show).toHaveBeenCalled()
      expect(vm.hideOnElementClicked).toHaveBeenCalled()
    })
  })

  describe('.showTips()', () => {
    it('should call showTip and hideOnElementClick', () => {
      expect.assertions(2)
      vm.showTip = jest.fn()
      vm.$refs.self = { hideIfShown: jest.fn() }
      vm.showTips()
      expect(vm.showTip).toHaveBeenCalled()
      expect(vm.$refs.self.hideIfShown).toHaveBeenCalled()
    })
  })

  describe('.hideOnElementClicked()', () => {
    it('should call hideIfShown', () => {
      expect.assertions(1)
      vm.$refs.self = { hideIfShown: jest.fn() }
      vm.hideOnElementClicked()
      expect(vm.$refs.self.hideIfShown).toHaveBeenCalled()
    })
  })

  describe('.clickBtn()', () => {
    it('should call showTrigger', () => {
      expect.assertions(1)
      vm.$refs.self = { showTrigger: jest.fn(), show: false }
      vm.clickBtn()
      expect(vm.$refs.self.showTrigger).toHaveBeenCalled()
    })
    it('should not call showTrigger', () => {
      expect.assertions(1)
      vm.$refs.self = undefined
      vm.clickBtn()
      expect(vm.$refs.self).toBeUndefined()
    })
  })
})
