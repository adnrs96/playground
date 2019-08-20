require('monaco-editor-core')
import * as rpc from 'vscode-ws-jsonrpc';
import * as languageClient from 'monaco-languageclient';
import ReconnectingWebSocket from 'reconnecting-websocket';


languageClient.MonacoServices.install(window.editor)

const url = 'ws://localhost:8000/sls'
const webSocket: any = new ReconnectingWebSocket(url)
rpc.listen({
    webSocket,
    onConnection: (connection: any) => {
        const storyscriptLanguageClient = new languageClient.MonacoLanguageClient({
            name: 'Storyscript Language Client',
            clientOptions: {
                documentSelector: ['storyscript'],
                errorHandler: {
                    error: () => languageClient.ErrorAction.Continue,
                    closed: () => languageClient.CloseAction.DoNotRestart
                }
            },
            connectionProvider: {
                get: (errorHandler, closeHandler) => {
                    return Promise.resolve(languageClient.createConnection(connection, errorHandler, closeHandler))
                }
            }
        })
        const disposable = storyscriptLanguageClient.start()
        connection.onClose(() => disposable.dispose())
    }
})
