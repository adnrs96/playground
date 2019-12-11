<template>
  <nav class="flex items-center flex-no-wrap bg-indigo-50 px-5 h-14 z-20 justify-between">
    <div class="flex justify-center items-center border-r border-indigo-70 mr-2">
      <s-icon
        icon="story"
        color="text-white"
        width="24"
        height="24"
        class="mr-5"
        clickable
        @click="$router.push({ name: 'welcome' })"
      />
    </div>
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
import SShare from '@app/Share.vue'
import SHelp from '@internal/components/HelpDrop.vue'
import SRegisterInterest from '@app/RegisterInterest.vue'

@Component({
  name: 'Navbar',
  components: {
    SDrop,
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
