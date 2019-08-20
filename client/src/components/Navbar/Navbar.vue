<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Logo from '@/components/Navbar/Logo.vue'
import AppActions from '@/components/Navbar/AppActions.vue';
import AuthActions from '@/components/Navbar/AuthActions.vue';
import ShareModal from '@/components/Modals/Share.vue'
import SettingsModal from '@/components/Modals/Settings.vue'


@Component({
    name: 'Navbar',
    components: {
        Logo,
        AppActions,
        AuthActions,
        ShareModal,
        SettingsModal
    }
})
export default class Navbar extends Vue {
}
</script>


<template>
    <div>
        <nav
            class="
                flex justify-between items-center
                bg-white px-6 h-14 shadow-navbar
                border-solid border-b border-gray-20
            "
        >
            <div class="flex cursor-pointer">
                <logo icon class="h-6 w-6" />
                <logo variant="light" class="ml-3 mt-1 h-5 w-auto" />
            </div>
            <app-actions />
            <auth-actions />
        </nav>
        <settings-modal />
        <share-modal />
    </div>
</template>
