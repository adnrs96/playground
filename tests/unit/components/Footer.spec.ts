import { shallowMount, createLocalVue } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'

const localVue = createLocalVue()
localVue.use(require('vue-moment'))

describe('Footer.vue', () => {
  it('should mount', () => {
    const footer = shallowMount(Footer, { localVue })
    expect(footer.html()).toBeTruthy()
    footer.destroy()
  })
})
