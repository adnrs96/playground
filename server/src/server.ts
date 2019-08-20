import * as http from 'http'
import * as REST from 'typescript-rest'
import * as Sentry from '@sentry/node'
import express from 'express'
import expressWs from 'express-ws'
import cors from 'cors'
import morgan from 'morgan'

import SLS from './sls'
import services from './services'


export default class Server {

    private readonly _app: expressWs.Application
    public readonly _port: number
    private readonly _corsOptions: object
    private _server?: http.Server

    constructor(port: number = 8000) {
        this._app = expressWs(express()).app
        this._port = port

        let corsWhitelist: RegExp;
        if (process.env.NODE_ENV === 'production') {
            corsWhitelist = new RegExp(/^https:\/\/([\w\-\.]*)(storyscript\.io|netlify\.com|netlify\.live)$/)
        } else {
            corsWhitelist = new RegExp(/^http[s]*:\/\/([\w\-\.]*)(localhost:80([0-9][0-9])?|netlify\.live)$/)
        }
        this._corsOptions = {
            allowHeaders: ['Origin', 'Content-Type', 'Accept'],
            credentials: true,
            methods: ['GET, HEAD, OPTIONS', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: (origin: string | undefined, callback: Function): void => {
                if (!origin || corsWhitelist.test(origin)) {
                    callback(null, true)
                } else {
                    callback(new REST.Errors.UnauthorizedError('CORS Error'))
                }
            },
            preflightContinue: false
        }

        this.preConfig()

        for (let service of services) {
            REST.Server.buildServices(this._app, service)
        }

        this._app.ws('/sls', SLS.setupWebsocket)

        this.postConfig()
    }

    public get app(): expressWs.Application {
        return this._app
    }

    private preConfig() {
        this._app.use(cors(this._corsOptions))
        this._app.use(morgan('combined'))
        // this._app.use(Sentry.Handlers.requestHandler())
    }

    private postConfig() {
        // this._app.use(Sentry.Handlers.errorHandler())
        this._app.options('*', cors(this._corsOptions))
    }

    public async start() {
        return new Promise<any>((resolve, reject) => {
            this._server = this.app.listen(this._port, (err) => {
                if (err) {
                    return reject(err)
                }
                console.log(`Listening on http://localhost:${this._port}`)
                return resolve()
            })
        })
    }

    public async stop() {
        return new Promise<boolean> (resolve => {
            if (this._server) {
                this._server.close(() => resolve(true))
            } else {
                return resolve(true)
            }
        })
    }

}
