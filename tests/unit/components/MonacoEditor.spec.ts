import { shallowMount, Wrapper } from '@vue/test-utils'
import MonacoEditor from '@editor/MonacoEditor.vue'
import { EditorPlugin } from '&/editor.d'

describe('MonacoEditor.vue', () => {
  let view: Wrapper<MonacoEditor>
  let vm: any
  const editor: any = {
    onDidChangeModelContent: jest.fn(),
    getModifiedEditor: jest.fn().mockImplementation(() => ({ ...editor })),
    focus: jest.fn(),
    dispose: jest.fn(),
    setModel: jest.fn(),
    getModel: jest.fn().mockImplementation(() => ({ ...editor })),
    setValue: jest.fn(),
    getValue: jest.fn(),
    updateOptions: jest.fn(),
    getLineCount: jest.fn(),
    layout: jest.fn()
  }
  const monacoEditor: any = {
    createModel: jest.fn(),
    createDiffEditor: jest.fn().mockImplementation(() => ({ ...editor })),
    create: jest.fn().mockImplementation(() => ({ ...editor })),
    setModelLanguage: jest.fn(),
    setTheme: jest.fn()
  }

  beforeEach(() => {
    view = shallowMount(MonacoEditor, {
      propsData: {
        value: ''
      },
      mocks: {
        $monaco: {
          editor: monacoEditor
        }
      }
    })
    vm = view.vm as any
  })

  afterEach(() => {
    view.destroy()
  })

  it('should display', () => {
    expect(view.html()).toBeTruthy()
  })

  it('should have plugins', () => {
    const plugin = { attach: jest.fn(), detach: jest.fn() } as EditorPlugin
    view.setProps({ plugins: [plugin] })
    vm.initMonaco()
    expect(view.vm).toHaveProperty('plugins', [plugin])
  })

  it('should not have plugins', () => {
    view.setProps({ plugins: undefined })
    vm.initMonaco()
    expect(view.vm).toHaveProperty('plugins', undefined)
  })

  it('onOptionsChange()', () => {
    expect.assertions(2)
    vm.onOptionsChange()
    expect(vm.editor.updateOptions).toHaveBeenCalled()
    vm.editor = undefined
    vm.getModifiedEditor = jest.fn().mockImplementationOnce(() => ({ ...editor }))
    vm.onOptionsChange()
    expect(vm.getModifiedEditor).not.toHaveBeenCalled()
  })

  it('onValueChange()', () => {
    expect.assertions(3)
    vm.editor.getValue = jest.fn().mockImplementationOnce(() => '')
    vm.onValueChange()
    expect(vm.editor.setValue).not.toHaveBeenCalled()
    vm.editor.getValue = jest.fn().mockImplementationOnce(() => 'hello')
    vm.onValueChange()
    expect(vm.editor.setValue).toHaveBeenCalled()
    vm.editor = undefined
    vm.getModifiedEditor = jest.fn().mockImplementationOnce(() => ({ ...editor }))
    vm.onValueChange()
    expect(vm.getModifiedEditor).not.toHaveBeenCalled()
  })

  it('autoHeightEditor()', () => {
    expect.assertions(2)
    vm.editor.getModel = jest.fn().mockImplementationOnce(() => ({ ...editor, getLineCount: jest.fn().mockImplementationOnce(() => 3) }))
    vm.autoHeightEditor()
    expect(view.element.style).toHaveProperty('height', '57px')
    vm.editor = undefined
    vm.getModifiedEditor = jest.fn().mockImplementationOnce(() => ({ ...editor }))
    vm.autoHeightEditor()
    expect(vm.getModifiedEditor).not.toHaveBeenCalled()
  })

  it('onLanguageChange()', () => {
    expect.assertions(2)
    vm.onLanguageChange()
    expect(vm.$monaco.editor.setModelLanguage).toHaveBeenCalled()
    vm.editor = undefined
    vm.$monaco.editor.setModelLanguage = jest.fn()
    vm.onLanguageChange()
    expect(vm.$monaco.editor.setModelLanguage).not.toHaveBeenCalled()
  })

  it('onThemeChange()', () => {
    expect.assertions(2)
    vm.onThemeChange()
    expect(vm.$monaco.editor.setTheme).toHaveBeenCalled()
    vm.editor = undefined
    vm.$monaco.editor.setTheme = jest.fn()
    vm.onThemeChange()
    expect(vm.$monaco.editor.setTheme).not.toHaveBeenCalled()
  })

  it('initMonaco()', () => {
    expect.assertions(10)
    vm.editor.getModifiedEditor = jest.fn()
    vm.initMonaco()
    expect(vm.$monaco.editor.createDiffEditor).not.toHaveBeenCalled()
    expect(vm.$monaco.editor.createModel).not.toHaveBeenCalled()
    expect(vm.editor.setModel).not.toHaveBeenCalled()
    expect(vm.$monaco.editor.create).toHaveBeenCalled()
    expect(view.emitted().editorWillMount).toBeTruthy()
    expect(view.emitted().editorDidMount).toBeTruthy()

    view.setProps({ diffEditor: true })
    vm.$monaco.editor.create = jest.fn().mockImplementation(() => ({ ...editor }))

    vm.initMonaco()
    expect(vm.$monaco.editor.createDiffEditor).toHaveBeenCalled()
    expect(vm.$monaco.editor.createModel).toHaveBeenCalled()
    expect(vm.editor.setModel).toHaveBeenCalled()
    expect(vm.$monaco.editor.create).not.toHaveBeenCalled()
  })

  it('onDidChangeModelContent()', () => {
    expect.assertions(4)
    vm.editor.getValue = jest.fn().mockImplementation(() => '')
    vm.onDidChangeModelContent('event')
    expect(view.emitted().change).toBeFalsy()
    expect(view.emitted().input).toBeFalsy()
    vm.editor.getValue = jest.fn().mockImplementation(() => 'hello world')
    vm.onDidChangeModelContent('event')
    expect(view.emitted().change).toBeTruthy()
    expect(view.emitted().input).toBeTruthy()
  })

  it('getModifiedEditor()', () => {
    expect.assertions(2)
    vm.editor.getModifiedEditor = jest.fn().mockImplementation(() => ({ ...editor }))
    vm.getModifiedEditor()
    expect(vm.editor.getModifiedEditor).not.toHaveBeenCalled()
    view.setProps({ diffEditor: true })
    vm.getModifiedEditor()
    expect(vm.editor.getModifiedEditor).toHaveBeenCalled()
  })

  it('getEditor()', () => {
    expect.assertions(1)
    const editor = vm.getEditor()
    expect(editor).toBe(vm.editor)
  })

  it('focus()', () => {
    expect.assertions(1)
    vm.editor.focus = jest.fn()
    vm.focus()
    expect(vm.editor.focus).toHaveBeenCalled()
  })
})
