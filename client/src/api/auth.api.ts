import { playgroundApi, storyscriptApi } from '@/api';
import * as models from '@/models/auth.models';


export async function createAnonymousUser(): Promise<models.createAnonymousUserResponse> {
    const response = await playgroundApi.post('/auth/anonymous')
    return response.data
}


export async function getOwnerDetails(tokenSecret: string): Promise<models.getOwnerDetailsResponse> {
    const response = await storyscriptApi.request({
        headers: {
            'Authorization': `Bearer ${tokenSecret}`
        },
        data: {
            query: `
            query {
              viewer {
                uuid
              }
            }
            `
        }
    })
    const ownerUuid: string = response.data.data.viewer.uuid
    return { ownerUuid }
}


export async function isGithubAccount() {
    const response = await storyscriptApi.request({
        data: {
            query: `
            query {
              viewer {
                ownerVcs {
                  edges {
                    node {
                      uuid
                      owner {
                          profileImageUrl
                      }
                    }
                  }
                }
              }
            }
            `
        }
    })
    const isLoggedIn: boolean = response.data.data.viewer.ownerVcs.edges.length > 0
    let profileImageUrl: string | null = null
    if (isLoggedIn) {
        profileImageUrl = response.data.data.viewer.ownerVcs.edges[0].node.owner.profileImageUrl
    }
    return { isLoggedIn, profileImageUrl }
}
