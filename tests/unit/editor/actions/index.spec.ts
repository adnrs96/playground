import * as actions from '@editor-plugin-sls/actions'

describe('editor-plugin-sls actions index.spec.ts', () => {
  it('should return the actions', () => {
    for (const d in actions) {
      expect(d).toBeTruthy()
    }
  })
})
