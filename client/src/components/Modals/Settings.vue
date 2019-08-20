<script lang='ts'>
import {Vue, Component, Watch} from "vue-property-decorator";
import VueTailwindModal from 'vue-tailwind-modal'

import ui from '@/store/ui.module'
import app from '@/store/app.module'


@Component({
    name: 'SettingsModal',
    components: {
        VueTailwindModal
    }
})
export default class Settings extends Vue {

    localEnvironment: string[][] = []

    get visible(): boolean {
        return ui.modals['settings']
    }

    hide() {
        ui.toggleModal('settings', false)
    }

    addEnv() {
        this.localEnvironment.push(['', ''])
    }

    delEnv(index: number) {
        this.localEnvironment.splice(index, 1)
    }

    @Watch('visible')
    resetEnv() {
        this.localEnvironment = Object.entries(app.environment)
    }

    deploy() {
        const env: object = this.localEnvironment.reduce((accumulator: any, [k, v]) => {
            accumulator[k] = v
            return accumulator
        }, {})
        app.setEnv(env)
        app.deploy()
        this.hide()
    }

}
</script>

<template>
<vue-tailwind-modal class="z-50" :showing="visible" @close="hide">
    <p
        class="block text-purple-900 text-xl font-bold mb-6"
    >
        Settings
    </p>
    <div>
        <div
            class="
            flex justify-between mb-2
            "
        >
            <p
                class="
                mb-4 font-semibold
                text-purple-900
                "
            >
                Environment variables
            </p>
            <button
                @click="addEnv"
                class="
                focus:outline-none rounded-full
                bg-purple-900 text-xs text-white px-4
                "
            >
                +
            </button>
        </div>
        <div
            v-for="(entry, index) in localEnvironment"
            class="
            flex justify-between leading-tight mb-2
            "
        >
            <input
                class="
                shadow focus:shadow-inner
                border border-gray-30 focus:border-purple-900 focus:outline-none
                rounded py-2 px-3 w-full
                text-sm text-gray-70 font-thin
                "
                v-model="entry[0]"
            >
            <input
                class="
                shadow focus:shadow-inner
                border border-gray-30 focus:border-purple-900 focus:outline-none
                rounded py-2 px-3 w-full mx-4
                text-sm text-gray-70 font-thin
                "
                v-model="entry[1]"
            >
            <button
                @click="() => delEnv(index)"
                class="
                focus:outline-none rounded align-middle
                bg-transparent px-4 text-xs text-purple-900
                "
            >
                x
            </button>
        </div>
        <div
            class="flex justify-center mt-8"
        >
            <button
                @click="deploy"
                class="bg-purple-900 text-sm text-white rounded px-3 py-2"
            >
                Deploy
            </button>
        </div>
    </div>
</vue-tailwind-modal>
</template>
