import { playgroundApi, storyscriptApi } from '@/api';
import * as models from '@/models/app.models'


export async function loadSampleStory(): Promise<string> {
    const response = await playgroundApi.get('/app/sample')
    return response.data
}


export async function compileStory(story: string) {
    const response = await playgroundApi.post('/app/compile', { story })
    return response.data
}


export async function createApp(ownerUuid: string | null, name: string): Promise<models.createAppResponse> {
    const response = await storyscriptApi.request({
        data: {
            query: `
            mutation($data: CreateAppInput!){
                createApp(input: $data) {
                    app {
                        uuid
                        name
                    }
                }
            }
            `,
            variables: {
                data: {
                    app: {
                        name,
                        ownerUuid
                    }
                }
            }
        }
    })
    const { uuid: appUuid, name: appName } = response.data.data.createApp.app
    return { appUuid, appName }
}


export async function deployApp(appUuid: string | null, payload: object, config: object) {
    await storyscriptApi.request({
        data: {
            query: `
            mutation($data: CreateReleaseInput!) {
                createRelease(input: $data) {
                    release { id }
                }
            }`,
            variables: {
                data: {
                    release: {
                        appUuid,
                        payload,
                        config,
                        message: 'Deploy app'
                    }
                }
            }
        }
    })
}


export async function getDeploymentStatus(appUuid: string | null): Promise<models.appState> {
    const response = await storyscriptApi.request({
        data: {
            query: `
            query($appUuid: UUID!) {
                allReleases(condition: { appUuid: $appUuid }, first: 1, orderBy: ID_DESC) {
                    nodes {
                        id
                        state
                    }
                }
            }
            `,
            variables: { appUuid }
        }
    })
    const state: string = response.data.data.allReleases.nodes[0].state
    // @ts-ignore
    return models.appState[state]
}
