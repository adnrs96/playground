import { editor } from 'monaco-editor/esm/vs/editor/editor.api'
export { Position } from 'monaco-editor/esm/vs/editor/editor.api'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEditorConstructionOptions extends editor.IEditorConstructionOptions {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IStandaloneCodeEditor extends editor.IStandaloneCodeEditor {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IActionDescriptor extends editor.IActionDescriptor {}

export class EditorLang {
  name: string
  extension: string
  icon: string
}

export interface EditorPlugin {
  attach: (editor: IStandaloneCodeEditor) => void
  detach: () => void
}

export namespace Languages {
  export const Storyscript: EditorLang
  export const Text: EditorLang
}

export const EditorOptions: IEditorConstructionOptions

export declare abstract class EditorDefaultOptions {
  public get options (): IEditorConstructionOptions
  constructor (options?: IEditorConstructionOptions)
}

export declare class Editor extends EditorDefaultOptions {
  value: String
  constructor (lang: EditorLang, value?: string, options?: IEditorConstructionOptions)
  public get icon (): string
  public get language (): string
}

export default Editor
