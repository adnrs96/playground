import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import EditorPane from '@app/Editor/EditorPane.vue'
import Payload from '@app/store/modules/Payload'
import Vuex, { Store } from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EditorPane.vue', () => {
  let editor: Wrapper<EditorPane>
  const store: Store<any> = new Vuex.Store(Payload)

  beforeEach(() => {
    editor = shallowMount(EditorPane, {
      stubs: {
        's-text': '<div />',
        's-icon': '<div />',
        's-scrollbar': '<div />'
      },
      localVue,
      store
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
