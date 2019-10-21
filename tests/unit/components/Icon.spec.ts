import { mount } from '@vue/test-utils'
import Icon from '@/components/Icon.vue'

describe('Icon.vue', () => {
  it('should have the good color', () => {
    expect.assertions(3)

    const icon1 = mount(Icon, {
      propsData: {
        icon: 'github-o',
        color: 'text-white'
      }
    })
    const icon2 = mount(Icon, {
      propsData: {
        icon: 'github-o',
        color: 'text-gray-50'
      }
    })
    const icon3 = mount(Icon, {
      propsData: {
        icon: 'github-o',
        color: 'text-black'
      }
    })

    expect(icon1.find('svg').classes('text-white')).toBeTruthy()
    expect(icon2.find('svg').classes('text-gray-50')).toBeTruthy()
    expect(icon3.find('svg').classes('text-black')).toBeTruthy()
    icon1.destroy()
    icon2.destroy()
    icon3.destroy()
  })

  describe('get current', () => {
    it('should return icon properties', () => {
      expect.assertions(3)

      const icon = mount(Icon, {
        propsData: {
          icon: 'refresh'
        }
      })
      const vm = icon.vm as any

      expect(vm.current.name).toEqual('refresh')
      expect(vm.current.height).toEqual(24)
      expect(vm.current.width).toEqual(24)
      icon.destroy()
    })

    it('path should be array', () => {
      expect.assertions(1)

      const icon = mount(Icon, {
        propsData: {
          icon: 'puzzle'
        }
      })
      const vm = icon.vm as any

      expect(Array.isArray(vm.current.path)).toBeTruthy()
      icon.destroy()
    })

    it('should return empty properties when icon is not found', () => {
      expect.assertions(5)

      const icon = mount(Icon, {
        propsData: {
          icon: 'dot'
        }
      })
      const vm = icon.vm as any
      icon.setProps({ icon: 'invalid' })

      expect(vm.current.name).toEqual('')
      expect(vm.current.height).toEqual(0)
      expect(vm.current.width).toEqual(0)
      expect(vm.current.circle).toEqual({})
      expect(vm.current.path).toEqual({})
      icon.destroy()
    })
  })
})
