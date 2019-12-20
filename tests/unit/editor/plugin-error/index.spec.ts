import { StoryscriptError } from '@editor-plugin-error'
import { MonacoPlugin } from '@editor/plugins/monaco'

const monaco = new MonacoPlugin().get()
const element = document.createElement('div') as HTMLDivElement

describe('editor-plugin-error', () => {
  it('should create an StoryscriptError object', () => {
    const errorPlugin = new StoryscriptError(monaco.editor)
    expect(errorPlugin).toHaveProperty('monacoEditor', monaco.editor)
    expect(errorPlugin).toHaveProperty('setModelMarkersOriginal', monaco.editor.setModelMarkers)
    expect(typeof errorPlugin).toBe('object')
  })

  it('should attach and detach accordingly', () => {
    const errorPlugin = new StoryscriptError(monaco.editor)
    const editor = monaco.editor.create(element as HTMLElement, { value: '', theme: 'vs', language: 'storyscript' })
    editor.onDidChangeCursorPosition = jest.fn()
    editor.onDidBlurEditorText = jest.fn()
    errorPlugin.attach(editor)
    // TODO: Test something here?
    errorPlugin.detach()
    expect(errorPlugin).toHaveProperty('setModelMarkersOriginal', monaco.editor.setModelMarkers)
    expect(editor.onDidBlurEditorText).toHaveBeenCalled()
    expect(editor.onDidChangeCursorPosition).toHaveBeenCalled()
  })
})
