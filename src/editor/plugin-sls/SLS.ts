import {
  CloseAction,
  createConnection,
  ErrorAction,
  MonacoLanguageClient,
  MonacoServices,
  Disposable
} from 'monaco-languageclient'
import { MessageConnection } from 'vscode-ws-jsonrpc'
import { IStandaloneCodeEditor } from '&/editor.d'
import Socket from './Socket'

export class SLS extends Socket {
  private _client?: MonacoLanguageClient
  private _instance?: Disposable
  private readonly _name: string
  private readonly _selectors: string[]

  constructor (url: string, name: string, selector: string | string[]) {
    super(url)
    this._name = name
    this._selectors = (typeof selector === typeof '' ? [selector] : selector) as string[]
  }

  /* istanbul ignore next */
  protected onConnect (connection: MessageConnection) {
    this._client = this.createLanguageClient(connection)
    this._instance = this._client.start()
  }

  /* istanbul ignore next */
  protected onClose () {
    if (this._instance) {
      this._instance.dispose()
    }
  }

  public install (editor: IStandaloneCodeEditor) {
    MonacoServices.install(editor)
  }

  public connect () {
    this.listen()
  }

  public disconnect () {
    this.close()
  }

  /* istanbul ignore next */
  public get languageClient (): MonacoLanguageClient | undefined {
    return this._client
  }

  /* istanbul ignore next */
  private createLanguageClient (connection: MessageConnection): MonacoLanguageClient {
    return new MonacoLanguageClient({
      name: this._name,
      clientOptions: {
        documentSelector: this._selectors,
        errorHandler: {
          error: () => ErrorAction.Continue,
          closed: () => CloseAction.DoNotRestart
        }
      },
      connectionProvider: {
        get: (errorHandler, closeHandler) => {
          return Promise.resolve(
            createConnection(connection, errorHandler, closeHandler))
        }
      }
    })
  }
}

export default SLS
