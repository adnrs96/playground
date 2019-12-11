import { Wrapper, shallowMount } from '@vue/test-utils'
import Feedback from '@app/Feedback.vue'

describe('Feedback', () => {
  let feedback: Wrapper<Feedback>
  let vm: any

  beforeEach(() => {
    feedback = shallowMount(Feedback, {
      stubs: {
        's-text': '<div />',
        's-button': '<div />',
        's-icon': '<div />',
        's-modal': '<div />'
      }
    })
    vm = feedback.vm as any
  })

  afterEach(() => {
    feedback.destroy()
  })

  it('should mount', () => {
    expect.assertions(1)
    expect(feedback.html()).toBeTruthy()
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

    describe('comment', () => {
      it('should make button enabled when not null', () => {
        expect.assertions(1)
        vm.email = ''
        vm.comment = 'foobar'
        vm.emailError = ''
        vm.questionsAnswered = 0
        vm.disabled = true
        vm.onComment()
        expect(vm).toHaveProperty('disabled', false)
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

    it('should not do anything when disabled', async () => {
      expect.assertions(1)
      vm.disabled = true
      vm.submit()
      expect(vm).toHaveProperty('disabled', true)
    })

    it('should send form info to netlify - error', async () => {
      expect.assertions(2)
      vm.sending = false
      vm.disabled = false
      window.fetch = jest.fn().mockResolvedValue({
        status: 500
      })
      vm.$refs.feedbackModal.hide = jest.fn()
      vm.submit()
      await new Promise(resolve => setTimeout(resolve, 1))
      expect(window.fetch).toHaveBeenCalledTimes(1)
      expect(vm).toHaveProperty('error', true)
    })

    it('should send form info to netlify - success', async () => {
      expect.assertions(2)
      vm.sending = false
      vm.disabled = false
      window.fetch = jest.fn().mockResolvedValue({
        status: 200
      })
      vm.$refs.feedbackModal.hide = jest.fn()
      vm.submit()
      expect(vm).toHaveProperty('error', false)
      expect(window.fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('.close()', () => {
    it('should close the modal, then reset the inputs', () => {
      expect.assertions(5)
      vm.$refs.feedbackModal.hide = jest.fn()
      vm.close()
      expect(vm.$refs.feedbackModal.hide).toHaveBeenCalledTimes(1)
      expect(vm).toHaveProperty('comment', '')
      expect(vm).toHaveProperty('email', '')
      expect(vm).toHaveProperty('success', false)
      expect(vm).toHaveProperty('error', false)
    })
  })

  describe('.onSuccess()', () => {
    it('should call close() after 2.5s', async () => {
      expect.assertions(2)
      vm.close = jest.fn()
      vm.success = true

      vm.onSuccess()
      expect(vm.close).not.toHaveBeenCalled()
      await new Promise(resolve => setTimeout(resolve, 2500))
      expect(vm.close).toHaveBeenCalledTimes(1)
    })

    it('should not call close on error', async () => {
      expect.assertions(2)
      vm.close = jest.fn()
      vm.success = false

      vm.onSuccess()
      expect(vm.close).not.toHaveBeenCalled()
      await new Promise(resolve => setTimeout(resolve, 2500))
      expect(vm.close).not.toHaveBeenCalled()
    })
  })

  describe('.onPillSelectionChange()', () => {
    it('should store answer to question 1', async () => {
      vm.shutdownStoryscriptAnswer = ''
      vm.questionsAnswered = 0
      vm.onPillSelectionChange('q1', 'foobar')

      expect.assertions(2)
      expect(vm.questionsAnswered).toBe(1)
      expect(vm.shutdownStoryscriptAnswer).toBe('foobar')
    })

    it('should store answer to question 2', async () => {
      vm.understandStoryscriptAnswer = ''
      vm.questionsAnswered = 0
      vm.onPillSelectionChange('q2', 'foobar')

      expect.assertions(2)
      expect(vm.questionsAnswered).toBe(1)
      expect(vm.understandStoryscriptAnswer).toBe('foobar')
    })

    it('should store answer to question 3', async () => {
      vm.understandStoryscriptAnswer = ''
      vm.questionsAnswered = 0
      vm.onPillSelectionChange('q3', 'foobar')

      expect.assertions(2)
      expect(vm.questionsAnswered).toBe(0)
      expect(vm.understandStoryscriptAnswer).toBe('')
    })
  })
})
