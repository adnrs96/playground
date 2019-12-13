import { enterIndentAction } from '@editor-plugin-sls/actions'
import { StoryscriptSLS } from '@editor-plugin-sls'

describe('editor-plugin-sls action enterIndentAction', () => {
  let sls: StoryscriptSLS

  beforeEach(() => {
    sls = new StoryscriptSLS()
  })

  it('should return an object', () => {
    const action = enterIndentAction(sls)
    expect(typeof action).toBe('object')
  })
})
