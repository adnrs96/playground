import uuid from 'uuid/v4'
import { getModule, Module, Action, Mutation, VuexModule } from 'vuex-module-decorators';

import store from '@/store/index'
import * as models from '@/models/ui.models'


@Module({
    namespaced: true,
    name: 'ui',
    dynamic: true,
    store
})
class UIModule extends VuexModule {

    modals = {
        'settings': false,
        'share': false,
    }

    errors: models.ErrorMessage[] = []

    @Mutation
    toggleModal(key: 'settings' | 'share', visibility: boolean | null = null) {
        if (visibility !== null) {
            this.modals[key] = visibility
        } else {
            this.modals[key] = !this.modals[key]
        }
    }

    @Mutation
    addError(error: models.ErrorMessage) {
        this.errors.push(error)
    }

    @Mutation
    removeError(error: models.ErrorMessage) {
        this.errors = this.errors.filter(e => e !== error)
    }

    @Action
    showError(message: string) {
        const error: models.ErrorMessage = {
            id: uuid(),
            message: message
        }
        this.addError(error)
        setTimeout(() => this.removeError(error), 3000)
    }

}

export default getModule(UIModule)
