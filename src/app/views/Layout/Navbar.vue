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
      <div class="flex items-center mx-6">
        <s-button
          id="publish-btn"
          tabindex="1"
          size="smaller"
          class="flex items-center rounded-md"
          :class="[
            `${publishing ? 'cursor-wait bg-indigo-40' : 'cursor-pointer bg-indigo-70 hover:bg-indigo-60'}`
          ]"
          @click="publish"
        >
          <s-text
            p="4"
            weight="semibold"
            class="mx-2 text-white"
          >
            Publish
          </s-text>
          <s-icon
            icon="send"
            color="text-white"
            class="mr-2"
            clickable
          />
        </s-button>
      </div>
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
import event from '@app/event'
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
  @Prop({ type: Boolean, default: false }) private intro!: boolean
  @Prop({ type: String, default: undefined }) private title?: string

  private publishing = false
  private welcome: boolean = true

  @Watch('$route')
  private onRouteChange () {
    this.welcome = this.$route.name === 'welcome'
  }

  mounted () {
    this.welcome = this.$route.name === 'welcome'
  }

  private publish () {
    if (this.publishing) {
      return
    }
    this.publishing = true
    event.$emit('publish', this.publishDone)
  }

  private publishDone () {
    this.publishing = false
  }
}
</script>
