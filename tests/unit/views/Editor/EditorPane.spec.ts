import { Wrapper, shallowMount } from '@vue/test-utils'
import EditorPane from '@app/Editor/EditorPane.vue'

describe('EditorPane.vue', () => {
  let editor: Wrapper<EditorPane>

  beforeEach(() => {
    editor = shallowMount(EditorPane, {
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
