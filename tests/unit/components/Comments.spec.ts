import { shallowMount, Wrapper } from '@vue/test-utils'
import Comments from '@/components/Comments.vue'

describe('Comments.vue', () => {
  let view: Wrapper<Comments>
  let vm: any

  beforeEach(() => {
    view = shallowMount(Comments, {
      propsData: {
        comments: [{
          author: 'story',
          comment: 'hello'
        }, {
          author: 'story',
          comment: 'hello'
        }]
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

  describe('.addComment()', () => {
    it('should not add comment', () => {
      expect.assertions(1)
      vm.addComment()
      expect(vm).toHaveProperty('mComments', [])
    })

    it(`should add comment`, () => {
      expect.assertions(1)
      vm.commentInput = 'hello'
      vm.addComment()
      expect(vm).toHaveProperty('mComments', [{ author: 'story', comment: 'hello' }])
    })
  })
})
