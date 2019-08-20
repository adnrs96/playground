import ReconnectingWebSocket from 'reconnecting-websocket';

import logger from '@/store/logger.module';
import * as models from '@/models/logger.models';
import {loggerMode} from '@/models/logger.models';


const LOGSTREAMER_ENDPOINT = 'wss://logs.storyscript.io'


export default class Logstreamer {

    private static socket: ReconnectingWebSocket
    private static connectionEstablished: boolean = false

    public static connect(authPayload: models.authPayload) {
        this.socket = new ReconnectingWebSocket(LOGSTREAMER_ENDPOINT)
        this.socket.onmessage = event => this.onMessage(JSON.parse(event.data))
        this.sendAuthPayload(authPayload)
        setInterval(() => this.ping(), 25000)
    }

    private static ping() {
        this.socket.send(JSON.stringify({
            command: 'ping'
        }))
    }

    public static get connected() {
        return this.connectionEstablished
    }

    private static sendFilterPayloads() {
        this.sendFilterPayload({
            command: 'filter',
            source: 'runtime',
            level: 'info',
            n: 100,
            watch: true
        })
        this.sendFilterPayload({
            command: 'filter',
            source: 'service',
            service_name: '*',
            level: 'info',
            n: 100,
            watch: true
        })
    }

    private static onMessage(message: any) {
        if (message.authorised) {
            logger.setInfo({ message: 'Fetching logs...' })
            this.sendFilterPayloads()
        }
        else if (message.level) {
            if (!this.connectionEstablished) {
                this.connectionEstablished = true
                logger.setMode(loggerMode.LOGS)
            }
            logger.addLog(message)
        }
    }

    private static sendAuthPayload(authPayload: models.authPayload) {
        this.socket.send(JSON.stringify(authPayload))
    }

    private static sendFilterPayload(filterPayload: models.runtimeFilterPayload | models.serviceFilterPayload) {
        this.socket.send(JSON.stringify(filterPayload))
    }

}
