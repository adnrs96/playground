import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

import store from '@/store/index'
import * as api from '@/api/auth.api'
import {playgroundApi} from '@/api';


@Module({
    namespaced: true,
    name: 'auth',
    dynamic: true,
    store
})
class AuthModule extends VuexModule {
    ownerUuid: string | null = null
    tokenSecret: string | null = null
    isLoggedIn: boolean = false
    profileImageUrl: string | null = null

    @Mutation
    setCredentials({ ownerUuid, tokenSecret }: { ownerUuid: string, tokenSecret: string }) {
        this.ownerUuid = ownerUuid
        this.tokenSecret = tokenSecret
        localStorage.setItem('tokenSecret', this.tokenSecret)
    }

    @Mutation
    setIsLoggedIn({ isLoggedIn, profileImageUrl }: { isLoggedIn: boolean, profileImageUrl: string | null }) {
        this.isLoggedIn = isLoggedIn
        this.profileImageUrl = profileImageUrl
    }

    get isUser(): boolean {
        return this.ownerUuid !== null && this.tokenSecret !== null
    }

    @Action
    async checkToken(tokenSecret: string) {
        const { ownerUuid }: { ownerUuid: string } = await api.getOwnerDetails(tokenSecret)
        this.setCredentials({ ownerUuid, tokenSecret })
        const { isLoggedIn, profileImageUrl } = await api.isGithubAccount()
        this.setIsLoggedIn({ isLoggedIn, profileImageUrl })
    }

    @Action
    async createAnonymousUser() {
        const { tokenSecret }: { tokenSecret: string } = await api.createAnonymousUser()
        await this.checkToken(tokenSecret)
    }

    @Action
    login() {
        const redirectUrl: string = `${playgroundApi.defaults.baseURL}/auth/github_redirect`
        window.location.assign(redirectUrl)
    }

}


export default getModule(AuthModule)
