import { shallowMount, Wrapper } from '@vue/test-utils'
import Comments from '@internal/components/Comments.vue'

describe('Comments.vue', () => {
  let view: Wrapper<Comments>
  let vm: any

  beforeEach(() => {
    view = shallowMount(Comments, {
      propsData: {
        comments: [{
          author: 'Crabbie',
          comment: 'hello'
        }, {
          author: 'Crabbie',
          comment: 'hello'
        }]
      },
      stubs: {
        's-text': '<div />',
        's-text-button': '<div />'
      }
    })
    vm = view.vm as any
  })

  afterEach(() => {
    view.destroy()
  })

  it('should mount', () => {
    expect.assertions(1)
    expect(view.html()).toBeTruthy()
  })

  it('should mount without comments', () => {
    expect.assertions(1)
    const vView = shallowMount(Comments, {
      stubs: {
        's-text': '<div />',
        's-text-button': '<div />'
      }
    })
    expect(vView.html()).toBeTruthy()
    vView.destroy()
  })

  describe('.addComment()', () => {
    it('should not add comment', () => {
      expect.assertions(1)
      vm.addComment()
      expect(vm).toHaveProperty('mComments', [])
    })

    it('should add comment', () => {
      expect.assertions(1)
      vm.commentInput = 'hello'
      vm.addComment()
      expect(vm).toHaveProperty('mComments', [{ author: 'Crabbie', comment: 'hello' }])
    })
  })
})
