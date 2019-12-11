import { Wrapper, shallowMount } from '@vue/test-utils'
import Editor from '@app/Editor/index.vue'

describe('Editor.vue', () => {
  let editor: Wrapper<Editor>

  beforeEach(() => {
    editor = shallowMount(Editor, {
      stubs: {
        's-text': '<div />',
        's-icon': '<div />',
        's-scrollbar': '<div />'
      }
    })
  })

  afterEach(() => {
    editor.destroy()
  })

  it('should mount', () => {
    expect.assertions(1)
    expect(editor.html()).toBeTruthy()
  })
})
