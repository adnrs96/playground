<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Navbar from '@/components/Navbar/Navbar.vue'
import Logger from '@/components/Logger/Logger.vue'
import auth from '@/store/auth.module'
import ui from '@/store/ui.module'


@Component({
    name: 'App',
    components: {
        Logger,
        Navbar
    }
})
export default class App extends Vue {

    async mounted() {
        const queryString = new URLSearchParams(window.location.search)
        const tokenSecret: string | null = queryString.get("tokenSecret") || localStorage.getItem("tokenSecret")
        if (tokenSecret) {
            try {
                await auth.checkToken(tokenSecret)
            }
            catch (e) {
                localStorage.removeItem("tokenSecret")
            }
        }
        queryString.delete("tokenSecret")
        const newUrl: string = window.location.href.split('?')[0] + `?${queryString.toString()}`
        history.replaceState(null, "", newUrl)
    }

    get errorMessages(): string[] {
        return ui.errors.map(e => e.message)
    }

}
</script>

<template>
    <div>
        <navbar />
        <logger />
        <div class="z-50 absolute bottom-0 right-0 p-4 text-white">
            <p v-for="error in errorMessages">{{ error }}</p>
        </div>
    </div>
</template>
