import uuid from 'uuid/v4'
import validator from 'validator';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

import store from '@/store/index';
import auth from '@/store/auth.module';
import logger from '@/store/logger.module';
import * as models from '@/models/app.models';
import * as api from '@/api/app.api';


@Module({
    namespaced: true,
    name: 'app',
    dynamic: true,
    store
})
class AppModule extends VuexModule {
    name: string | null = null
    uuid: string | null = null
    environment: any = {'DATABASE_URL': 'postgres://user:password@host:port/database'}
    appState: models.appState | null = null

    @Mutation
    setApp({ name, uuid }: { name: string, uuid: string }) {
        this.name = name
        this.uuid = uuid
        history.replaceState(null, "", uuid)
    }

    @Mutation
    setEnv(env: object) {
        this.environment = env
    }

    @Mutation
    setState(appState: models.appState) {
        this.appState = appState
    }

    // @Action
    // async load() {
    //     const appHash = window.location.hash
    //     if (!validator.isUUID(appHash, 4)) {
    //         console.log('No app loaded, fetching sample story')
    //         window.location.hash = ''
    //         const sampleStory = await api.loadSampleStory()
    //         window.editor.setValue(sampleStory)
    //         return
    //     }
    //     const app: models.App = await api.loadApp(appHash)
    //     this.setApp(app.name, app.uuid)
    //     window.editor.setValue(app.story)
    //     this.setEnv(app.env)
    // }

    @Action
    async createApp() {
        const { appName, appUuid } = await api.createApp(auth.ownerUuid, `play-${uuid()}`)
        this.setApp({ name: appName, uuid: appUuid })
    }

    @Action
    async deploy() {

        if (!auth.isUser) {
            await auth.createAnonymousUser()
        }

        if (!this.uuid) {
            await this.createApp()
        }

        logger.setShouldSeeLogs(false)
        logger.setDeploymentState(models.appState.DEPLOYING)
        const story: string = window.editor.getValue()
        let payload: object
        try {
            payload = await api.compileStory(story)
        }
        catch (e) {
            logger.setDeploymentState(models.appState.COMPILATION_FAILED)
            return
        }
        await api.deployApp(this.uuid, payload, this.environment)
        logger.setDeploymentState(models.appState.QUEUED)
        this.setState(models.appState.QUEUED)

        const deployWait = async (interval: NodeJS.Timer) => {
            const status = await api.getDeploymentStatus(this.uuid)
            console.log(`Received state ${status}`)
            const waitingStates = [models.appState.QUEUED, models.appState.DEPLOYING, null]
            if (!waitingStates.includes(this.appState)) {
                // deployment is complete
                // another callback cleared the timeout
                return
            }
            this.setState(status)
            if (waitingStates.includes(status)) {
                // continue looping
                return
            }
            logger.setDeploymentState(status)
            clearInterval(interval)
        }

        const checkInterval: NodeJS.Timer = setInterval(() => deployWait(checkInterval), 500)
    }

}


export default getModule(AppModule)
