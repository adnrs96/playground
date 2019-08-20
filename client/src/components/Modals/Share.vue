<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import VueTailwindModal from 'vue-tailwind-modal'

import ui from '@/store/ui.module'


@Component({
    name: 'ShareModal',
    components: {
        VueTailwindModal
    }
})
export default class Share extends Vue {

    get visible(): boolean {
        return ui.modals['share']
    }

    hide() {
        ui.toggleModal('share', false)
    }

}
</script>

<template>
<vue-tailwind-modal class="z-50" :showing="visible" @close="hide">
    Share
</vue-tailwind-modal>
</template>
