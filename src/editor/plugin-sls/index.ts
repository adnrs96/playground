import {
  CloseAction,
  createConnection,
  ErrorAction,
  MonacoLanguageClient,
  MonacoServices
} from 'monaco-languageclient'
import ReconnectingWebSocket from 'reconnecting-websocket'
import 'setimmediate' // required by vscode-jsonrpc
import { listen, MessageConnection } from 'vscode-ws-jsonrpc'
import { EditorPlugin, IStandaloneCodeEditor } from '&/editor.d'
// import { enterIndentAction } from '@editor-plugin-sls/actions'

const normalizeURL = require('normalize-url')

export class SLS implements EditorPlugin {
  private webSocket: WebSocket | undefined
  private languageClient: MonacoLanguageClient | undefined

  attach (editor: IStandaloneCodeEditor) {
    this.connect(editor)
    // editor.addAction(enterIndentAction(this))
  }

  detach () {
    this.disconnect()
  }

  connect (editor: IStandaloneCodeEditor) {
    // install Monaco language client services
    MonacoServices.install(editor)

    // create the web socket
    const url = new URL(normalizeURL(process.env.VUE_APP_SLS_URL as string))
    this.webSocket = this.createWebSocket(url)

    // subscribe to websocket -> start client once opened
    listen({
      webSocket: this.webSocket,
      onConnection: connection => {
        // create and start the language client
        this.languageClient = this.createLanguageClient(connection)
        const languageClientInstance = this.languageClient.start()
        connection.onClose(() => languageClientInstance.dispose())
      }
    })
  }

  getLanguageClient () : MonacoLanguageClient {
    return this.languageClient!
  }

  disconnect () {
    if (this.webSocket !== undefined) {
      this.webSocket.close()
      this.webSocket = undefined
    }
  }

  private createLanguageClient (connection: MessageConnection): MonacoLanguageClient {
    return new MonacoLanguageClient({
      name: 'Storyscript Language Client',
      clientOptions: {
        documentSelector: ['storyscript'],
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

  private createWebSocket (url: URL): WebSocket {
    if (url.protocol === 'https:') {
      url.protocol = 'wss:'
    } else {
      url.protocol = 'wss:'
    }
    const ws = new ReconnectingWebSocket(url.toString(), [], {
      maxReconnectionDelay: 10000,
      minReconnectionDelay: 1000,
      reconnectionDelayGrowFactor: 1.3,
      connectionTimeout: 10000,
      maxRetries: Infinity,
      debug: false
    })
    // ignore missing dispatchEvent property
    return ws as unknown as WebSocket
  }
}

export default SLS
