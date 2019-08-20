export interface App {
    name: string,
    uuid: string
    story: string
    env: object
}


export interface createAppResponse {
    appUuid: string
    appName: string
}


export enum appState {
    QUEUED = 'QUEUED',
    DEPLOYING = 'DEPLOYING',
    DEPLOYED = 'DEPLOYED',
    COMPILATION_FAILED = 'COMPILATION_FAILED',
    FAILED = 'FAILED',
    TEMP_DEPLOYMENT_FAILURE = 'TEMP_DEPLOYMENT_FAILURE',
    MAINTENANCE = 'MAINTENANCE'
}
