<template>
  <nav class="flex items-center flex-no-wrap bg-white px-6 h-14 shadow-navbar border-solid border-b border-gray-20 z-20 justify-between">
    <div class="flex items-center">
      <div
        id="home-btn-logo"
        class="flex items-center mr-22 cursor-pointer"
        @click="$route.name !== 'playground' ? $router.push({ name: 'playground' }) : ''"
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
        id="deploy-btn"
        class="flex items-center"
        :class="[
          `${deploying ? 'cursor-wait' : 'cursor-pointer'}`
        ]"
        @click="deploy"
      >
        <s-icon
          icon="play"
          :color="`${deploying ? 'text-gray-60' : 'text-indigo-60'}`"
          class="mr-2 flex items-center"
          :clickable="!deploying"
          width="12"
          height="12"
        />
        <s-text
          p="3"
          weight="semibold"
          :class="[
            `${deploying ? 'text-gray-60' : 'text-indigo-70 hover:text-indigo-80'}`
          ]"
        >
          Deploy
        </s-text>
      </div>
      <div
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
          <s-tip id="new-from-scratch-tip">
            Playground for creating your own apps is under development.
          </s-tip>
        </s-text>
      </div>
    </div>
    <s-login />
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import SLogin from '@/views/Login.vue'
import SIcon from '@/components/Icon.vue'
import SText from '@/components/Text.vue'
import event from '@/event'
import STip from '@/components/Tip.vue'

@Component({
  name: 'Navbar',
  components: {
    SIcon,
    SText,
    SLogin,
    STip
  }
})
export default class Navbar extends Vue {
  private deploying: boolean = false

  @Mutation('incrementReleasesCount')
  private incrementReleasesCount!: () => void

  private deploy () {
    if (this.deploying) {
      return
    }
    this.incrementReleasesCount()
    this.deploying = true
    event.$emit('deploy', this.deployDone)
  }

  private deployDone () {
    this.deploying = false
  }
}
</script>
