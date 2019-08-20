export enum loggerMode {
    INFO,
    LOGS
}

export interface logMessage {
    timestamp: string,
    source: string,
    level: 'debug' | 'info' | 'warning' | 'error',
    message: string
}


export interface authPayload {
    command: 'auth',
    access_token: string | null,
    app_id: string | null,
    id: string | null
}


export interface runtimeFilterPayload {
    command: 'filter',
    source: 'runtime',
    level: 'debug' | 'info' | 'warning' | 'error',
    n: number,
    watch: boolean
}

export interface serviceFilterPayload {
    command: 'filter',
    source: 'service',
    service_name: string,
    level: string,
    n: number,
    watch: boolean
}
