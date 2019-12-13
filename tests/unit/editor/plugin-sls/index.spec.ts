import { StoryscriptSLS } from '@editor-plugin-sls'
import { MonacoPlugin } from '@editor/plugins/monaco'

const monaco = new MonacoPlugin().get()
const element = document.createElement('div') as HTMLDivElement

describe('editor-plugin-sls', () => {
  it('should create an SLS class', () => {
    const sls = new StoryscriptSLS('http://sls.server.com')
    expect(sls).toHaveProperty('_url', new URL('ws://sls.server.com/'))
    expect(typeof sls).toBe('object')
  })

  it('should return a websoket', () => {
    const sls = new StoryscriptSLS()
    const editor = monaco.editor.create(element as HTMLElement, { value: '', theme: 'vs', language: 'storyscript' })
    sls.attach(editor)
    sls.detach()
  })
})
