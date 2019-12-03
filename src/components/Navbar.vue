<template>
  <nav class="flex items-center flex-no-wrap bg-indigo-50 px-6 h-14 z-20 justify-between">
    <div class="flex flex-1 items-center justify-start">
      <div class="flex items-center mr-6">
        <div
          id="publish-btn"
          tabindex="1"
          class="flex items-center rounded-md"
          :class="[
            `${publishing ? 'cursor-wait bg-indigo-40' : 'cursor-pointer bg-indigo-70 hover:bg-indigo-60'}`
          ]"
          @click="publish"
        >
          <s-text
            p="5"
            weight="semibold"
            class="mx-3 my-1 text-white"
          >
            Publish
          </s-text>
          <s-icon
            icon="send"
            color="text-white"
            class="mr-2"
            clickable
          />
        </div>
      </div>
      <div class="flex flex-1 items-center justify-end">
        <s-collaborators class="mr-4" />
        <s-share />
        <s-login />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import SIcon from '@/components/Icon.vue'
import SText from '@/components/Text.vue'
import event from '@/event'
import SCollaborators from '@/components/Collaborators.vue'
import SShare from '@/views/Share.vue'
import SLogin from '@/views/Login.vue'

@Component({
  name: 'Navbar',
  components: {
    SIcon,
    SText,
    SCollaborators,
    SShare,
    SLogin
  }
})
export default class Navbar extends Vue {
  @Prop({ type: Boolean, default: false }) private intro!: boolean

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
