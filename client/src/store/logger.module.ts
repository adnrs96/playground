import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

import store from '@/store/index';
import * as models from '@/models/logger.models';
import { appState } from '@/models/app.models';
import logstreamer from '@/api/logger.api';
import auth from '@/store/auth.module';
import app from '@/store/app.module';


@Module({
    namespaced: true,
    name: 'logger',
    dynamic: true,
    store
})
class LoggerModule extends VuexModule {

    mode: models.loggerMode = models.loggerMode.INFO
    infoOutput: string[] = [
        'Write your story and hit deploy! 🚀'
    ]
    shouldSeeLogs: boolean = false
    logMessages: models.logMessage[] = []


    @Mutation
    setShouldSeeLogs(bool: boolean) {
        this.shouldSeeLogs = bool
    }

    @Mutation
    setInfo({ message, clear = false }: { message: string, clear?: boolean }) {
        this.mode = models.loggerMode.INFO
        if (clear) {
            this.infoOutput = []
        }
        this.infoOutput.push(message)
    }

    @Mutation
    clearLogs() {
        this.logMessages = []
    }

    @Mutation
    setMode(mode: models.loggerMode) {
        this.mode = mode
    }

    @Mutation
    addLog(message: any) {
        message.timestamp = new Date().toUTCString()
        if (message.source.toLowerCase() == 'service') {
            message.source = message.service_name
        } else {
            message.source = 'runtime'
        }
        this.logMessages.push(message as models.logMessage)
    }

    @Action
    setDeploymentState(deploymentState: appState) {
        switch(deploymentState) {
            case appState.COMPILATION_FAILED:
                this.setInfo({ message: `❌ Deployment failed!` })
                this.setInfo({ message: `Error in story compilation` })
                break
            case appState.DEPLOYING:
                this.setInfo({ message: `Deploying app...`, clear: true })
                break
            case appState.QUEUED:
                this.setInfo({ message: `✅ Your app has been queued for deployment.` })
                this.setInfo({ message: `Waiting for deployment to complete...` })
                break
            case appState.DEPLOYED:
                this.setInfo({ message: `✅ Deployment successful!` })
                this.setInfo({
                    message: `If your Story responds to HTTP requests, please visit: ${app.name}.storyscriptapp.com`
                })
                this.setShouldSeeLogs(true)
                break
            case appState.FAILED:
                this.setInfo({ message: `❌ Deployment failed!` })
                this.setShouldSeeLogs(true)
                break
            case appState.TEMP_DEPLOYMENT_FAILURE:
                this.setInfo({ message: `❌ Deployment failed!` })
                this.setInfo({ message: `An internal error occurred.` })
                this.setInfo({ message: `The Storyscript team has been notified.` })
                this.setInfo({
                    message: `Please visit https://status.storyscript.io for incident reports and updates.`
                })
                this.setShouldSeeLogs(true)
                break
            default:
                this.setInfo({ message: `An unhandled state of your app has been encountered - ${deploymentState}` })
                this.setInfo({ message: `Please shoot an e-mail to support@storyscript.io` })
        }
    }

    @Action
    async showLogs() {
        if (logstreamer.connected) {
            this.setMode(models.loggerMode.LOGS)
            return
        }
        this.setShouldSeeLogs(false)
        this.setInfo({ message: `Connecting to logstreamer...`, clear: true })
        logstreamer.connect({
            command: 'auth',
            access_token: auth.tokenSecret,
            id: auth.ownerUuid,
            app_id: app.uuid,
        })
    }

}


export default getModule(LoggerModule)
