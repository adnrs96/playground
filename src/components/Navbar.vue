<template>
  <nav class="flex items-center flex-no-wrap bg-white px-6 h-14 shadow-navbar border-solid border-b border-gray-20 z-20 justify-between">
    <div class="flex items-center">
      <div
        id="home-btn-logo"
        class="flex items-center mr-22 cursor-pointer"
        @click="!welcome ? $router.push({ name: 'welcome' }) : ''"
      >
        <s-icon
          icon="story"
          height="18"
          width="18"
        />
        <s-icon
          icon="storyscript"
          color="text-indigo-logo"
          height="14"
          width="82"
          class="ml-2 mt-1"
        />
      </div>
      <div
        v-if="!welcome"
        id="publish-btn"
        class="flex items-center"
        :class="[
          `${publishing ? 'cursor-wait' : 'cursor-pointer'}`
        ]"
        @click="publish"
      >
        <s-icon
          icon="play"
          :color="`${publishing ? 'text-gray-60' : 'text-indigo-60'}`"
          class="mr-2 flex items-center"
          :clickable="!publishing"
          width="12"
          height="12"
        />
        <s-text
          p="3"
          weight="semibold"
          :class="[
            `${publishing ? 'text-gray-60' : 'text-indigo-70 hover:text-indigo-80'}`
          ]"
        >
          Publish
        </s-text>
      </div>
      <div
        v-if="!welcome"
        id="see-more-examples-btn"
        class="flex items-center ml-12 cursor-pointer select-none h-full"
        @click="$router.push({ name: 'welcome' })"
      >
        <s-icon
          icon="rocket-o"
          color="text-indigo-60"
          class="mr-2 flex items-center rotate-45deg"
        />
        <s-text
          p="3"
          weight="semibold"
          class="text-indigo-70 hover:text-indigo-80 flex"
        >
          <span>
            See more examples
          </span>
        </s-text>
      </div>
      <div
        v-if="!welcome"
        id="new-from-scratch-btn"
        class="flex items-center ml-12 cursor-default select-none h-full"
      >
        <s-icon
          icon="rocket-o"
          color="text-gray-40"
          class="mr-2 flex items-center rotate-45deg"
        />
        <s-text
          p="3"
          weight="semibold"
          class="text-gray-40 flex"
        >
          <span>
            New from scratch
          </span>
          <s-tip
            v-if="!intro"
            id="new-from-scratch-tip"
            mode="hover|focus"
          >
            Studio for creating your own apps is under development.
          </s-tip>
        </s-text>
      </div>
    </div>
    <div
      v-if="!welcome"
      class="flex items-center"
    >
      <s-collaborators class="mr-8" />
      <s-login />
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import SLogin from '@/views/Login.vue'
import SIcon from '@/components/Icon.vue'
import SText from '@/components/Text.vue'
import event from '@/event'
import STip from '@/components/Tip.vue'
import SCollaborators from '@/components/Collaborators.vue'

@Component({
  name: 'Navbar',
  components: {
    SIcon,
    SText,
    SLogin,
    STip,
    SCollaborators
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
