<template>
  <nav class="flex items-center flex-no-wrap bg-indigo-50 px-6 h-14 z-20 justify-between">
    <div class="flex flex-1 items-center justify-start">
      <div class="flex items-center mr-6">
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
        <s-drop
          id="new-from-tpl-btn"
          mode="hover|focus"
          bottom
          light
          bordered
          class="ml-8"
        >
          <s-gradient-border-button secondary>
            New from template
          </s-gradient-border-button>
          <s-text
            slot="content"
            p="4"
            weight="medium"
            class="max-w-xxs whitespace-normal w-max-content text-gray-90"
          >
            Studio for creating your own apps is under active development.
          </s-text>
        </s-drop>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import SDrop from '@/components/Drop.vue'
import event from '@/event'
import SCollaborators from '@/components/Collaborators.vue'
import SShare from '@/views/Share.vue'

@Component({
  name: 'Navbar',
  components: {
    SDrop,
    SCollaborators,
    SShare
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
