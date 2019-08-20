<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

import app from '@/store/app.module'
import ui from '@/store/ui.module'


@Component({
    name: 'AppActions'
})
export default class AppActions extends Vue {

    showModal(modalName: 'settings' | 'share') {
        ui.toggleModal(modalName, true)
    }

    async deploy() {
        await app.deploy()
    }

}
</script>

<template>
    <div>
        <button
            @click="() => showModal('settings')"
            class="
            focus:outline-none
            bg-transparent hover:bg-indigo-100
            text-indigo-100 hover:text-white
            border border-indigo-100 hover:border-transparent
            mr-2 py-2 px-4 rounded shadow
            "
        >
            Settings
        </button>
        <button
            @click="deploy"
            class="
            focus:outline-none
            bg-transparent hover:bg-indigo-100
            text-indigo-100 hover:text-white
            border border-indigo-100 hover:border-transparent
            mr-2 py-2 px-4 rounded shadow
            "
        >
            Deploy
        </button>
        <button
            @click="() => showModal('share')"
            class="
            focus:outline-none
            bg-transparent hover:bg-indigo-100
            text-indigo-100 hover:text-white
            border border-indigo-100 hover:border-transparent
            mr-2 py-2 px-4 rounded shadow
            "
        >
            Share
        </button>
    </div>
</template>
