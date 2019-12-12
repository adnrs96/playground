import { EditorLang, IEditorConstructionOptions } from '&/editor.d'

export namespace Languages {
  export const Storyscript: EditorLang = { name: 'storyscript', extension: 'story', icon: 'story' }
  export const Text: EditorLang = { name: 'text', extension: 'txt', icon: 'book' }
}

export const EditorOptions: IEditorConstructionOptions = {
  readOnly: false,
  minimap: { enabled: false },
  fontSize: 12,
  automaticLayout: true,
  renderIndentGuides: false,
  scrollBeyondLastLine: false,
  scrollBeyondLastColumn: 0,
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  selectionHighlight: false,
  occurrencesHighlight: false,
  contextmenu: false,
  folding: false,
  cursorBlinking: 'blink',
  cursorWidth: 1,
  lineNumbers: 'off'
}

export abstract class EditorDefaultOptions {
  private _opts: IEditorConstructionOptions = {}

  public get options (): IEditorConstructionOptions {
    return this._opts
  }

  constructor (options?: IEditorConstructionOptions) {
    this._opts = {
      ...EditorOptions,
      ...options
    }
  }
}

export class Editor extends EditorDefaultOptions {
  private readonly _lang: EditorLang
  public value: String

  constructor (lang: EditorLang, value?: string, options?: IEditorConstructionOptions) {
    super(options)
    this._lang = lang
    this.value = value || ''
  }

  public get icon (): string {
    return this._lang.icon
  }

  public get language (): string {
    return this._lang.name
  }
}

export default Editor
