import { Wrapper, shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'

describe('Login', () => {
  let login: Wrapper<Login>
  let vm: any

  beforeEach(() => {
    login = shallowMount(Login)
    vm = login.vm as any
  })

  it('should mount', () => {
    expect.assertions(1)
    expect(login.html()).toBeTruthy()
  })

  describe('watchers', () => {
    describe('name', () => {
      it('should not do anything when name is valid', () => {
        expect.assertions(1)
        vm.name = 'toto'
        vm.onNameHandler()
        expect(vm).toHaveProperty('nameError', '')
      })

      it('should display an error when name is invalid', () => {
        expect.assertions(1)
        vm.name = 'to'
        vm.onNameHandler()
        expect(vm).toHaveProperty('nameError', 'Name too short.')
      })
    })

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


  describe('.close()', () => {
    it('should close the modal, then reset the inputs', () => {
      expect.assertions(3)
      vm.$refs.loginModal.hide = jest.fn()
      vm.close()
      expect(vm.$refs.loginModal.hide).toHaveBeenCalledTimes(1)
      expect(vm).toHaveProperty('name', '')
      expect(vm).toHaveProperty('email', '')
    })
  })
})
