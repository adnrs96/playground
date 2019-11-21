import { Wrapper, shallowMount } from '@vue/test-utils'
import Share from '@/views/Share.vue'

describe('Share', () => {
  let share: Wrapper<Share>
  let vm: any

  beforeEach(() => {
    share = shallowMount(Share, {
      mocks: {
        $copyText: jest.fn()
      }
    })
    vm = share.vm as any
  })

  afterEach(() => {
    share.destroy()
  })

  it('should mount', () => {
    expect.assertions(1)
    expect(share.html()).toBeTruthy()
  })

  describe('.copy()', () => {
    it('should copy text', async () => {
      vm.copy()
      expect(vm.copied).toBeTruthy()
      await new Promise(resolve => setTimeout(resolve, 2500))
      expect(vm.copied).toBeFalsy()
    })
  })
})
