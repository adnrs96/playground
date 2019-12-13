import { SLS } from '@editor-plugin-sls/SLS'
import { MonacoPlugin } from '@editor/plugins/monaco'
import WS from 'jest-websocket-mock'

const monaco = new MonacoPlugin().get()
const element = document.createElement('div') as HTMLDivElement

describe('editor-plugin-sls SLS', () => {
  it('should create a SLS class and get values from mocked server', async () => {
    const server = new WS('ws://localhost:1234')
    const sls = new SLS('http://localhost:1234', 'my name', ['dummy-selector'])
    expect(sls).toHaveProperty('_ws.readyState', WebSocket.CONNECTING)
    await server.connected
    sls.install(monaco.editor.create(element as HTMLElement, { value: '', theme: 'vs', language: 'storyscript' }))
    sls.connect()
    expect(sls).toHaveProperty('_url', new URL('ws://localhost:1234/'))
    expect(sls).toHaveProperty('_ws.readyState', WebSocket.OPEN)
    expect(sls.languageClient).toBeUndefined()
    sls.disconnect()
    await server.closed
    expect(sls).toHaveProperty('_ws.readyState', WebSocket.CLOSED)
    WS.clean()
  })
})
