import { MonacoLanguageClient } from 'monaco-languageclient'
import { EditorPlugin, IStandaloneCodeEditor } from '&/editor.d'

export declare class SLS implements EditorPlugin {
  attach: (editor: IStandaloneCodeEditor) => void
  detach: () => void
  connect: (editor: IStandaloneCodeEditor) => void
  getLanguageClient: () => MonacoLanguageClient
  disconnect: () => void
}
