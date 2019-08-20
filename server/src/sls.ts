import ws from 'ws'
import { Request } from 'express'
import * as server from 'vscode-ws-jsonrpc/lib/server'
import * as lsp from 'vscode-languageserver'
import * as rpc from 'vscode-ws-jsonrpc'


export default class SLS {

    private static setupRpc(socket: rpc.IWebSocket) {
        const reader = new rpc.WebSocketMessageReader(socket)
        const writer = new rpc.WebSocketMessageWriter(socket)
        // start the language server as an external process
        const socketConnection = server.createConnection(reader, writer, () => socket.dispose())
        const serverConnection = server.createServerProcess('SLS', 'sls', ['stdio'])
        server.forward(socketConnection, serverConnection, message => {
            if (rpc.isRequestMessage(message)) {
                if (message.method === lsp.InitializeRequest.type.method) {
                    const initializeParams = message.params as lsp.InitializeParams
                    initializeParams.processId = process.pid
                }
            }
            return message
        })
    }

    public static setupWebsocket(ws: ws, req: Request) {
        const socket: rpc.IWebSocket = {
            send: content => ws.send(content, error => {
                if (error) {
                    throw error
                }
            }),
            onMessage: cb => ws.on('message', cb),
            onError: cb => ws.on('error', cb),
            onClose: cb => ws.on('close', cb),
            dispose: () => ws.close()
        }
        // launch the server when the web socket is opened
        if (ws.readyState === ws.OPEN) {
            SLS.setupRpc(socket)
        } else {
            ws.on('open', () => SLS.setupRpc(socket))
        }
    }

}
