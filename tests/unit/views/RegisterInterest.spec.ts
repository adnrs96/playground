import { Wrapper, shallowMount } from '@vue/test-utils'
import RegisterInterest from '@/views/RegisterInterest.vue'

describe('RegisterInterest', () => {
  let registerInterest: Wrapper<RegisterInterest>
  let vm: any

  beforeEach(() => {
    registerInterest = shallowMount(RegisterInterest, {
      stubs: {
        's-text': '<div />',
        's-button': '<div />',
        's-gradient-border-button': '<div />',
        's-modal': '<div />'
      }
    })
    vm = registerInterest.vm as any
  })

  afterEach(() => {
    registerInterest.destroy()
  })

  it('should mount', () => {
    expect.assertions(1)
    expect(registerInterest.html()).toBeTruthy()
  })

  describe('watchers', () => {
    describe('email', () => {
      it('should not do anything when email is valid', () => {
        expect.assertions(1)
        vm.email = 'aurelien@storyscript.io'
        vm.onEmailHandler()
        expect(vm).toHaveProperty('emailError', '')
      })

      it('should display an error when email is invalid', () => {
        expect.assertions(1)
        vm.email = 'aurelien.storyscript.io'
        vm.onEmailHandler()
        expect(vm).toHaveProperty('emailError', 'Email is invalid.')
      })
    })
  })

  describe('.submit()', () => {
    it('should not do anything when already sending', async () => {
      expect.assertions(1)
      vm.sending = true
      vm.submit()
      expect(vm).toHaveProperty('sending', true)
    })

    it('should send form info to netlify - error', async () => {
      expect.assertions(2)
      vm.sending = false
      window.fetch = jest.fn().mockResolvedValue({
        status: 500
      })
      vm.$refs.registerInterestModal.hide = jest.fn()
      vm.submit()
      await new Promise(resolve => setTimeout(resolve, 1))
      expect(window.fetch).toHaveBeenCalledTimes(1)
      expect(vm).toHaveProperty('error', true)
    })

    it('should send form info to netlify - success', async () => {
      expect.assertions(2)
      vm.sending = false
      window.fetch = jest.fn().mockResolvedValue({
        status: 200
      })
      vm.$refs.registerInterestModal.hide = jest.fn()
      vm.submit()
      expect(vm).toHaveProperty('error', false)
      expect(window.fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('.close()', () => {
    it('should close the modal, then reset the inputs', () => {
      expect.assertions(3)
      vm.$refs.registerInterestModal.hide = jest.fn()
      vm.close()
      expect(vm.$refs.registerInterestModal.hide).toHaveBeenCalledTimes(1)
      expect(vm).toHaveProperty('comment', '')
      expect(vm).toHaveProperty('email', '')
    })
  })

  describe('.onSuccess()', () => {
    it('should reset success state, then close the modal, after 2s', async () => {
      expect.assertions(6)
      vm.$refs.registerInterestModal = { hide: jest.fn() }
      await vm.onSuccess()
      expect(vm.$refs.registerInterestModal.hide).toHaveBeenCalledTimes(0)
      vm.success = true
      vm.error = true
      expect(vm).toHaveProperty('success', true)
      expect(vm).toHaveProperty('error', true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      expect(vm.$refs.registerInterestModal.hide).toHaveBeenCalledTimes(1)
      expect(vm).toHaveProperty('success', false)
      expect(vm).toHaveProperty('error', false)
    })
  })
})
