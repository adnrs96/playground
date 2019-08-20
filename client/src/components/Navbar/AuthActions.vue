<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

import auth from '@/store/auth.module'
import app from '@/store/app.module'
import ui from '@/store/ui.module'


@Component({
    name: 'AuthActions'
})
export default class AuthActions extends Vue {

    get isLoggedIn() {
        return auth.isLoggedIn
    }

    get profileImageUrl() {
        return auth.profileImageUrl
    }

    async login() {
        auth.login()
    }

    async deploy() {
        await app.deploy()
    }

}
</script>

<template>
    <div>
        <button
            v-if="!isLoggedIn"
            @click="login"
            class="
            focus:outline-none
            bg-transparent hover:bg-indigo-100
            text-indigo-100 hover:text-white
            border border-indigo-100 hover:border-transparent
            mr-2 py-2 px-4 rounded shadow
            "
        >
            Login
        </button>
        <img
            v-else
            :src="`${profileImageUrl}?s=64`"
            alt="User's avatar"
            class="h-10 w-10 rounded-full border-white border border-solid shadow-avatar"
        >
    </div>
</template>
