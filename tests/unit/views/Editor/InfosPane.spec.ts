import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import InfosPane from '@app/Editor/InfosPane.vue'
import EditorErrors from '@app/store/modules/EditorErrors'
import Vuex, { Store } from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('InfosPane.vue', () => {
  let infos: Wrapper<InfosPane>
  const store: Store<any> = new Vuex.Store(EditorErrors)

  beforeEach(() => {
    infos = shallowMount(InfosPane, {
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
    infos.destroy()
  })

  it('should mount', () => {
    expect.assertions(1)
    expect(infos.html()).toBeTruthy()
  })
})
