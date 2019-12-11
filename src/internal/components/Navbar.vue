<template>
  <nav class="flex items-center flex-no-wrap bg-indigo-50 px-6 h-14 z-20 justify-between">
    <div class="flex flex-1 items-center justify-start">
      <s-text
        v-if="title"
        p="2"
        weight="medium"
        class="text-white"
      >
        {{ title }}
      </s-text>

      <div class="flex flex-1 items-center justify-end">
        <s-collaborators class="mr-4" />
        <s-share />
        <s-help />
        <s-register-interest />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import SDrop from '@internal/components/Drop.vue'
import SCollaborators from '@internal/components/Collaborators.vue'
import SShare from '@app/Share.vue'
import SHelp from '@internal/components/HelpDrop.vue'
import SRegisterInterest from '@app/RegisterInterest.vue'

@Component({
  name: 'Navbar',
  components: {
    SDrop,
    SCollaborators,
    SShare,
    SHelp,
    SRegisterInterest
  }
})
export default class Navbar extends Vue {
  @Prop({ type: String, default: undefined }) private title?: string

  private welcome: boolean = true

  @Watch('$route')
  private onRouteChange () {
    this.welcome = this.$route.name === 'welcome'
  }

  mounted () {
    this.welcome = this.$route.name === 'welcome'
  }
}
</script>
