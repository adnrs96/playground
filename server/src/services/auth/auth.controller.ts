import axios from 'axios'
import { Request, Response } from 'express'
import { Path, GET, POST, ContextRequest, ContextResponse, QueryParam } from 'typescript-rest'

import * as models from './auth.models'
import provider from './auth.provider'


@Path('/auth')
export default class AuthController {

    @POST
    @Path('anonymous')
    async anonymous(): Promise<models.anonymousResponse> {
        return await provider.createAnonymousUser()
    }

    @GET
    @Path('github_redirect')
    async github_redirect(@ContextRequest request: Request, @ContextResponse response: Response): Promise<void> {
        const authorizationUrl = 'https://github.com/login/oauth/authorize'
        const params = new URLSearchParams()
        // @ts-ignore
        params.set('client_id', process.env.GITHUB_CLIENT_ID)
        params.set('redirect_uri', `${process.env.BASE_URL}/auth/github_authorize`)
        params.set('state', 'state')
        params.set('scope', 'user:email')
        response.redirect(`${authorizationUrl}?${params.toString()}`)
    }

    @GET
    @Path('github_authorize')
    async github_authorize(
        @QueryParam('code') code: string,
        @QueryParam('state') state: string,
        @ContextResponse response: Response
    ): Promise<void> {
        const accessTokenResponse = await axios.post(`https://github.com/login/oauth/access_token`, {}, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                redirect_uri: `${process.env.BASE_URL}/auth/github_authorize`,
                code,
                state
            },
            headers: {
                Accept: 'application/json'
            }
        })
        const accessToken: string = accessTokenResponse.data.access_token
        const userDetailsResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `bearer ${accessToken}`
            }
        })
        const userDetails = userDetailsResponse.data
        const userEmailsResponse = await axios.get('https://api.github.com/user/emails', {
            headers: {
                Authorization: `bearer ${accessToken}`
            }
        })
        const userEmail = userEmailsResponse.data[0].email
        const { tokenSecret } = await provider.getOrCreateOwner(
            userDetails.id, userDetails.login,
            userDetails.name, userEmail, accessToken
        )
        const params = new URLSearchParams({ tokenSecret })
        response.redirect(`${process.env.CLIENT_URL}?${params.toString()}`)
    }

}
