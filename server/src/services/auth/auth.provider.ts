import uuid from 'uuid/v4'

import Database from '../../database';


export default class AuthProvider {

    public static async createAnonymousUser(): Promise<{ tokenSecret: string }> {
        const [ownerUuid]: string[] = await Database.knex('owners')
            .insert({
                username: `play-${uuid()}`,
            })
            .returning('uuid')
        const [tokenUuid]: string[] = await Database.knex('tokens')
            .insert({
                owner_uuid: ownerUuid,
                type: 'LOGIN',
                name: 'Playground  Login'
            })
            .returning('uuid')
        const tokenSecret = await this.getTokenSecret(tokenUuid)
        return { tokenSecret }
    }

    private static async getTokenSecret(tokenUuid: string): Promise<string> {
        const { tokenSecret }: { tokenSecret: string } = await Database.knex('token_secrets')
            .select('secret as tokenSecret')
            .where({
                token_uuid: tokenUuid
            })
            .first()
        return tokenSecret
    }

    public static async getOrCreateOwner(githubId: string, username: string, name: string,
                                         email: string, oauthToken: string): Promise<{ tokenSecret: string }> {
        const { rows: [{ data }] } = await Database.knex.raw(`SELECT app_private.create_owner_by_login(
                                                        :service::app_public.git_service,
                                                        :githubId::text,
                                                        :username::app_public.username,
                                                        :name::text,
                                                        :email::app_public.email,
                                                        :oauthToken::text) as data`, {
                service: 'github',
                githubId,
                username,
                name,
                email,
                oauthToken
            })
        const { token_uuid }: { token_uuid: string } = data
        const tokenSecret = await this.getTokenSecret(token_uuid)
        return { tokenSecret }
    }

}
