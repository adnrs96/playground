import { enterIndentAction } from '@editor-plugin-sls/actions'
import { StoryscriptSLS } from '@editor-plugin-sls'
import { MonacoPlugin } from '@editor/plugins/monaco'

const monaco = new MonacoPlugin().get()
const element = document.createElement('div') as HTMLDivElement

describe('editor-plugin-sls action enterIndentAction', () => {
  let sls: StoryscriptSLS

  beforeEach(() => {
    sls = new StoryscriptSLS()
  })

  it('should return an object', () => {
    const action = enterIndentAction(sls)
    expect(typeof action).toBe('object')
    action.run(monaco.editor.create(element as HTMLElement, { value: '', theme: 'vs', language: 'storyscript' }))
  })
})
