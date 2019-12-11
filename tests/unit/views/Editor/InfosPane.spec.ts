import { Wrapper, shallowMount } from '@vue/test-utils'
import InfosPane from '@app/Editor/InfosPane.vue'

describe('InfosPane.vue', () => {
  let infos: Wrapper<InfosPane>

  beforeEach(() => {
    infos = shallowMount(InfosPane, {
      stubs: {
        's-text': '<div />',
        's-icon': '<div />',
        's-scrollbar': '<div />'
      }
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
