<template>
  <nav class="flex items-center flex-no-wrap bg-indigo-50 px-6 h-14 z-20 justify-between">
    <div class="flex flex-1 items-center justify-start">
      <div class="flex items-center mr-6">
        <s-text
          p="2"
          weight="medium"
          color="text-white whitespace-no-wrap"
        >
          My first story
        </s-text>
        <s-icon
          icon="info-o"
          color="text-indigo-20 hover:text-indigo-10"
          class="ml-1"
          clickable
        />
      </div>
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
    <div class="flex flex-1 items-center justify-center">
      <s-text
        p="5"
        weight="medium"
        color="text-white whitespace-no-wrap"
      >
        Studio Preview
      </s-text>
      <s-icon
        icon="info-o"
        color="text-indigo-20 hover:text-indigo-10"
        class="ml-1"
        clickable
      />
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
        <div class="flex items-center cursor-pointer select-none bg-colorful">
          <s-text
            p="5"
            weight="medium"
            color="text-gray-100"
            class="px-3 py-2 whitespace-no-wrap"
          >
            New from template
          </s-text>
        </div>
        <s-text
          slot="content"
          p="5"
          weight="medium"
          color="text-gray-90"
          class="max-w-xxs whitespace-normal w-max-content"
        >
          Studio for creating your own apps is under active development.
        </s-text>
      </s-drop>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import SDrop from '@/components/Drop.vue'
import SIcon from '@/components/Icon.vue'
import SText from '@/components/Text.vue'
import event from '@/event'
import SCollaborators from '@/components/Collaborators.vue'
import SShare from '@/views/Share.vue'

@Component({
  name: 'Navbar',
  components: {
    SIcon,
    SText,
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
