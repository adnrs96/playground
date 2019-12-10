import { mount } from '@vue/test-utils'
import { SInput } from '@/components/Inputs'

describe('Input.vue', () => {
  describe('basic input', () => {
    it('should exist', () => {
      const input = mount(SInput, {
        stubs: {
          's-text': '<div />',
          's-icon': '<div />'
        }
      })

      expect.assertions(1)
      expect(input.html()).toBeTruthy()
      input.destroy()
    })

    it('should exist - textarea', () => {
      const input = mount(SInput, {
        stubs: {
          's-text': '<div />',
          's-icon': '<div />'
        },
        propsData: {
          textarea: true
        }
      })

      expect.assertions(3)
      expect(input.html()).toBeTruthy()
      const textarea = input.findAll('textarea')
      const inputs = input.findAll('input')
      expect(textarea.length).toEqual(1)
      expect(inputs.length).toEqual(0)
      input.destroy()
    })
  })

  describe('validation', () => {
    it('should be neutral when nothing changed', () => {
      const cmpnt = mount(SInput, {
        stubs: {
          's-text': '<div />',
          's-icon': '<div />'
        }
      })

      expect(cmpnt.classes('border-gray-30')).toBeTruthy()
      cmpnt.destroy()
    })

    it('should be green when it is valid', () => {
      const cmpnt = mount(SInput, {
        propsData: {
          valid: true
        },
        stubs: {
          's-text': '<div />',
          's-icon': '<div />'
        }
      })

      expect(cmpnt.classes('border-green-50')).toBeTruthy()
      cmpnt.destroy()
    })

    it('should be red when it is invalid', () => {
      const cmpnt = mount(SInput, {
        propsData: {
          valid: false
        },
        stubs: {
          's-text': '<div />',
          's-icon': '<div />'
        }
      })
      const input = cmpnt.find('input')

      expect.assertions(2)
      expect(cmpnt.classes('border-red-50')).toBeTruthy()
      expect(input.classes('text-red-80')).toBeTruthy()
      cmpnt.destroy()
    })

    it('should have a valid icon', () => {
      const valid = mount(SInput, {
        propsData: {
          icon: 'github-o'
        },
        stubs: {
          's-text': '<div />',
          's-icon': '<div />'
        }
      })

      expect.assertions(1)
      expect(valid.vm).toHaveProperty('icon', 'github-o')
      valid.destroy()
    })

    it('should emit', () => {
      const valid = mount(SInput, {
        stubs: {
          's-text': '<div />',
          's-icon': '<div />'
        }
      })

      expect.assertions(14)
      const vm = valid.vm as any
      vm.onClick()
      expect(valid.emitted().click).toBeTruthy()
      vm.onFocus()
      expect(valid.emitted().focus).toBeTruthy()
      expect(vm).toHaveProperty('focused', true)
      vm.onBlur()
      expect(valid.emitted().blur).toBeTruthy()
      expect(vm).toHaveProperty('focused', false)
      vm.onChange()
      expect(valid.emitted().change).toBeTruthy()
      vm.onKeyUp()
      expect(valid.emitted().keyup).toBeTruthy()
      vm.onKeyDown()
      expect(valid.emitted().keydown).toBeTruthy()
      vm.onInput({ target: { value: 'toto' } })
      expect(valid.emitted().input).toBeTruthy()
      expect(valid.emitted().update).toBeTruthy()
      expect(valid.emitted().input[0]).toEqual([
        'toto',
        { target: { value: 'toto' } }
      ])
      vm.onInput('toto')
      expect(valid.emitted().input).toBeTruthy()
      expect(valid.emitted().update).toBeTruthy()
      expect(valid.emitted().input[0]).toEqual([
        'toto',
        { target: { value: 'toto' } }
      ])
      valid.destroy()
    })

    it('should emit no-value', () => {
      const valid = mount(SInput, {
        stubs: {
          's-text': '<div />',
          's-icon': '<div />'
        }
      })

      expect.assertions(1)
      const vm = valid.vm as any
      vm.onInput(undefined)
      expect(valid.emitted().update[0]).toEqual(['', undefined])
      valid.destroy()
    })
  })
})
