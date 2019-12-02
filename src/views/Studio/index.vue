<template>
  <div
    id="studio-view"
    class="flex flex-row"
  >
    <s-toolbar />
    <div class="flex flex-col w-full">
      <s-navbar :intro="isIntro" />
      <div class="min-h-screen-no-navbar flex">
        <div
          v-if="$slots.notification && $slots.notification.length > 0"
          class="absolute mx-auto w-full -mt-2"
        >
          <slot name="notification" />
        </div>
        <div
          id="left-col"
          class="flex flex-col"
          :class="[
            `${fullscreen ? 'w-full' : 'w-2/3'}`
          ]"
        >
          <div class="flex justify-between items-center my-4 mx-8">
            <div class="flex items-center">
              <s-text
                p="3"
                weight="semibold"
                color="text-gray-100"
              >
                {{ payload.name }}
              </s-text>
            </div>
            <s-icon
              id="toggle-fullscreen"
              :icon="`${!fullscreen ? 'fullscreen' : 'fullscreen-exit'}`"
              width="20"
              height="20"
              color="text-indigo-50"
              class="hover:bg-gray-10 rounded-full p-1"
              clickable
              @click="fullscreen = !fullscreen"
            />
          </div>
          <!-- FIX FOR SAFARI, see https://bugs.webkit.org/show_bug.cgi?id=198375 -->
          <div class="h-0 flex-1">
            <monaco-editor
              v-model="payload.code"
              class="w-full h-full"
              :options="options"
            />
          </div>
          <div
            id="bottom-container"
            class="w-full flex"
            :class="{'h-0': fullscreen}"
          >
            <s-architecture :services="payload.services" />
          </div>
        </div>
        <s-tabs
          id="right-col"
          class="border-l border-gray-20"
          :class="[
            `${fullscreen ? 'w-0' : 'w-1/3'}`]
          "
        >
          <s-events
            data-tab-title="Events"
            :events="payload.events"
          />
          <s-comments
            data-tab-title="Comments"
            :comments="payload.comments"
          />
        </s-tabs>
        <s-intro
          v-if="payload.tips && isIntro"
          :tips="payload.tips"
          show-at-startup
          @done="isIntro = false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import SArchitecture from '@/views/Studio/Architecture.vue'
import SEvents from '@/views/Studio/Events.vue'
import { IStorySample } from '@/models/StorySample'
import samples from '@/samples'
import MonacoEditor from '@/components/MonacoEditor.vue'
import SNavbar from '@/components/Navbar.vue'
import SText from '@/components/Text.vue'
import SIcon from '@/components/Icon.vue'
import SIntro from '@/components/Intro.vue'
import STabs from '@/components/Tabs.vue'
import SComments from '@/components/Comments.vue'
import SToolbar from '@/components/Toolbar.vue'

@Component({
  components: {
    SArchitecture,
    MonacoEditor,
    SIcon,
    SNavbar,
    SText,
    SIntro,
    STabs,
    SComments,
    SEvents,
    SToolbar
  }
})
export default class Studio extends Vue {
  @Prop({ type: String, default: 'counter' }) readonly sample!: string

  @Mutation('setPayload')
  private setPayload!: (payload: IStorySample) => void

  private payload: IStorySample = samples[this.sample in samples ? this.sample : 'counter' || 'counter']
  private isIntro = false
  private fullscreen = false
  private options: any = {
    readOnly: true,
    minimap: { enabled: false },
    fontSize: 12,
    automaticLayout: true,
    renderIndentGuides: false,
    scrollBeyondLastLine: false,
    scrollBeyondLastColumn: false,
    contextmenu: false
  }

  mounted () {
    window.addEventListener('keyup', this.exitFullscreen)
  }

  beforeDestroy () {
    window.removeEventListener('keyup', this.exitFullscreen)
  }

  created () {
    if (this.sample.length > 0) {
      if (this.sample in samples) {
        this.setPayloadName(this.sample)
      } else {
        this.$router.replace({ name: 'not-found' })
      }
    }
    this.isIntro = !(this.$route && this.$route.query && this.$route.query.skipIntro && this.$route.query.skipIntro === 'true')
  }

  public setPayloadName (sample: string) {
    this.payload = samples[sample]
    this.setPayload(this.payload)
  }

  private exitFullscreen (evt: KeyboardEvent) {
    if (evt.key === 'Escape' && this.fullscreen) {
      this.fullscreen = false
    }
  }
}
</script>
