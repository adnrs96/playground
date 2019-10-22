import { shallowMount } from '@vue/test-utils'
import Editor from '@/views/Editor.vue'

describe('Editor.vue', () => {
  it('should mount', () => {
    expect.assertions(1)
    const view = shallowMount(Editor)
    expect(view.html()).toBeTruthy()
    view.destroy()
  })
})
