import { playgroundApi, storyscriptApi } from '@/api';


export function isAppValid(appName: string) {
    storyscriptApi.request({
        data: {
            query: `
            query($appName: Title!, $ownerUuid: UUID!) {
              appByOwnerUuidAndName(name: $appName, ownerUuid: $ownerUuid) {
                name
              }
            }
            `,
            variables: {
                appName
            }
        }
    })
}


export function isTokenValid(appName: string, token: string) {

}
