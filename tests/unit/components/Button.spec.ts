import { mount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button.vue', () => {
  describe('get path()', () => {
    it('should return the good color', () => {
      const black = mount(Button, {
        propsData: {
          black: true
        }
      })
      const white = mount(Button, {
        propsData: {
          white: true
        }
      })

      expect(black.vm).toHaveProperty('textColor', 'text-white')
      expect(white.vm).toHaveProperty('textColor', 'text-black')
      black.destroy()
      white.destroy()
    })
  })

  describe('get textColor', () => {
    it('should return the good icon', () => {
      const github = mount(Button, {
        propsData: {
          icon: 'github-o'
        }
      })
      const gitlab = mount(Button, {
        propsData: {
          icon: 'gitlab-o'
        }
      })
      const google = mount(Button, {
        propsData: {
          icon: 'google-f'
        }
      })

      expect(github.vm).toHaveProperty(
        'path',
        './assets/img/logos/github-waving-cat-outline.svg'
      )
      expect(gitlab.vm).toHaveProperty(
        'path',
        './assets/img/logos/gitlab-outline.svg'
      )
      expect(google.vm).toHaveProperty(
        'path',
        './assets/img/logos/google-filled.svg'
      )
      github.destroy()
      gitlab.destroy()
      google.destroy()
    })
  })

  describe('get title', () => {
    it('should not be empty when slot is provided', () => {
      const button = mount(Button, {
        slots: {
          default: 'toto'
        }
      })

      expect((button.vm as any).title).toEqual('toto')
    })
  })
})
