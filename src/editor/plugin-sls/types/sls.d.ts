import { MonacoLanguageClient } from 'monaco-languageclient'
import { IStandaloneCodeEditor } from '&/editor.d'
import Socket from './Socket'

export declare class SLS extends Socket {
  constructor (url: string, name: string, selector: string | string[])
  connect (): void
  disconnect (): void
  install (editor: IStandaloneCodeEditor): void
  get languageClient (): MonacoLanguageClient | undefined
}
