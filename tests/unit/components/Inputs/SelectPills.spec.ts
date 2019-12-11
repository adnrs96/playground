import { mount } from '@vue/test-utils'
import { SSelectPills } from '@internal/components/Inputs'

describe('SelectPills.vue', () => {
  describe('basic input', () => {
    it('should exist', () => {
      const pills = mount(SSelectPills, {
        propsData: {
          optionStrings: ['foo', 'bar']
        }
      })

      expect.assertions(7)
      expect(pills.html()).toBeTruthy()

      const inputs = pills.findAll('input')
      expect(inputs.length).toEqual(2)
      expect(inputs.at(0).attributes('value')).toEqual('foo')
      expect(inputs.at(1).attributes('value')).toEqual('bar')

      const labels = pills.findAll('label')
      expect(labels.length).toEqual(2)
      expect(labels.at(0).text()).toEqual('foo')
      expect(labels.at(1).text()).toEqual('bar')

      pills.destroy()
    })

    it('should emit on selection', () => {
      const pills = mount(SSelectPills, {
        propsData: {
          optionStrings: ['foo', 'bar']
        }
      })

      const option = pills.findAll('label').at(0)
      option.trigger('click')
      expect(pills.emitted().input).toBeTruthy()
      pills.destroy()
    })
  })

  describe('font-size p 1-5', () => {
    it('font-size p1', () => {
      const pills = mount(SSelectPills, {
        propsData: {
          optionStrings: ['foo', 'bar'],
          p: '1'
        }
      })

      expect.assertions(1)
      const option = pills.findAll('label').at(0)
      expect(option.classes('text-lg')).toBeTruthy()
      pills.destroy()
    })

    it('font-size p2', () => {
      const pills = mount(SSelectPills, {
        propsData: {
          optionStrings: ['foo', 'bar'],
          p: '2'
        }
      })

      expect.assertions(1)
      const option = pills.findAll('label').at(0)
      expect(option.classes('text-base')).toBeTruthy()
      pills.destroy()
    })

    it('font-size p3', () => {
      const pills = mount(SSelectPills, {
        propsData: {
          optionStrings: ['foo', 'bar'],
          p: '3'
        }
      })

      expect.assertions(1)
      const option = pills.findAll('label').at(0)
      expect(option.classes('text-sm')).toBeTruthy()
      pills.destroy()
    })

    it('font-size p4', () => {
      const pills = mount(SSelectPills, {
        propsData: {
          optionStrings: ['foo', 'bar'],
          p: '5'
        }
      })

      expect.assertions(1)
      const option = pills.findAll('label').at(0)
      expect(option.classes('text-xs')).toBeTruthy()
      pills.destroy()
    })

    it('font-size p5', () => {
      const pills = mount(SSelectPills, {
        propsData: {
          optionStrings: ['foo', 'bar'],
          p: '5'
        }
      })

      expect.assertions(1)
      const option = pills.findAll('label').at(0)
      expect(option.classes('text-xs')).toBeTruthy()
      pills.destroy()
    })
  })

  describe('font-weight', () => {
    it('font-weight regular', () => {
      const pills = mount(SSelectPills, {
        propsData: {
          optionStrings: ['foo', 'bar'],
          weight: 'regular'
        }
      })

      expect.assertions(1)
      const option = pills.findAll('label').at(0)
      expect(option.classes('font-normal')).toBeTruthy()
      pills.destroy()
    })

    it('font-weight medium', () => {
      const pills = mount(SSelectPills, {
        propsData: {
          optionStrings: ['foo', 'bar'],
          weight: 'medium'
        }
      })

      expect.assertions(1)
      const option = pills.findAll('label').at(0)
      expect(option.classes('font-medium')).toBeTruthy()
      pills.destroy()
    })

    it('font-weight semibold', () => {
      const pills = mount(SSelectPills, {
        propsData: {
          optionStrings: ['foo', 'bar'],
          weight: 'semibold'
        }
      })

      expect.assertions(1)
      const option = pills.findAll('label').at(0)
      expect(option.classes('font-semibold')).toBeTruthy()
      pills.destroy()
    })

    it('font-weight bold', () => {
      const pills = mount(SSelectPills, {
        propsData: {
          optionStrings: ['foo', 'bar'],
          weight: 'bold'
        }
      })

      expect.assertions(1)
      const option = pills.findAll('label').at(0)
      expect(option.classes('font-bold')).toBeTruthy()
      pills.destroy()
    })
  })
})
