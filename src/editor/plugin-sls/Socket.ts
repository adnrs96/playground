import ReconnectingWebSocket, { Options } from 'reconnecting-websocket'
import 'setimmediate' // required by vscode-jsonrpc
import { listen, MessageConnection } from 'vscode-ws-jsonrpc'
import normalizeURL from 'normalize-url'

export const SocketDefaultOptions: Options = {
  maxReconnectionDelay: 10000,
  minReconnectionDelay: 1000,
  reconnectionDelayGrowFactor: 1.3,
  connectionTimeout: 10000,
  maxRetries: Infinity,
  debug: false
}

export abstract class Socket {
  private readonly _url: URL
  private readonly _ws: WebSocket
  private readonly _wsOpts: Options

  constructor (url: string, options?: Options) {
    this._url = new URL(normalizeURL(url))
    this._url.protocol = this._url.protocol === 'https:' ? 'wss:' : 'ws:'
    this._wsOpts = {
      ...SocketDefaultOptions,
      ...options
    }
    this._ws = new ReconnectingWebSocket(this._url.toString(), [], this._wsOpts) as unknown as WebSocket
  }

  protected abstract onClose (): void
  protected abstract onConnect (connection: MessageConnection): void

  /* istanbul ignore next */
  private onConnection (connection: MessageConnection) {
    this.onConnect(connection)
    connection.onClose(() => this.onClose())
  }

  protected listen () {
    listen({
      webSocket: this._ws,
      onConnection: this.onConnection
    })
  }

  /* istanbul ignore next */
  protected close () {
    if (![WebSocket.CLOSED, WebSocket.CLOSING].includes(this._ws.readyState)) {
      this._ws.close()
    }
  }
}

export default Socket
