<template>
  <div
    id="studio-view"
    class="flex flex-row"
  >
    <div class="flex flex-col w-full">
      <s-navbar
        :intro="isIntro"
        :title="payload.name"
      />
      <div class="min-h-screen-no-navbar flex">
        <div
          v-if="$slots.notification && $slots.notification.length > 0"
          class="absolute mx-auto w-full -mt-2"
        >
          <slot name="notification" />
        </div>

        <div class="mt-3 w-full flex-1 flex">
          <s-library />
        </div>

        <div
          id="left-col"
          class="flex flex-col"
          :class="[
            `${fullscreen ? 'w-full' : 'w-2/3'}`
          ]"
        >
          <!-- FIX FOR SAFARI, see https://bugs.webkit.org/show_bug.cgi?id=198375 -->
          <div
            id="editor"
            class="h-0 flex-1"
          >
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
          @done="sampleHasBeenShown(payload.id)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { Mutation, Getter } from 'vuex-class'
import SArchitecture from '@app/Studio/Architecture.vue'
import SEvents from '@app/Studio/Events.vue'
import { IStorySample } from '&/StorySample'
import samples from '@/samples'
import MonacoEditor from '@editor/MonacoEditor.vue'
import SNavbar from '@app/Layout/Navbar.vue'
import SIntro from '@internal/components/Intro.vue'
import STabs from '@internal/components/Tabs.vue'
import SComments from '@internal/components/Comments.vue'
import SLibrary from '@app/Library/index.vue'

@Component({
  components: {
    SArchitecture,
    MonacoEditor,
    SNavbar,
    SIntro,
    STabs,
    SComments,
    SEvents,
    SLibrary
  }
})
export default class Studio extends Vue {
  @Prop({ type: String, default: 'counter' }) readonly sample!: string

  @Emit('introChange')
  @Watch('isIntro') private onIntroChange (): boolean {
    return this.isIntro
  }

  @Getter('hasTipsBeenShown')
  private hasTipsBeenShown!: (sampleId: string) => boolean

  @Mutation('setPayload')
  private setPayload!: (payload: IStorySample) => void

  @Mutation('sampleHasBeenShown')
  private sampleHasBeenShown!: (sampleId: string) => void

  private payload: IStorySample = samples[this.sample in samples ? this.sample : 'counter' || 'counter']

  private get isIntro (): boolean {
    return !(this.hasTipsBeenShown(this.payload.id) || this.skipIntro)
  }

  private skipIntro: boolean = false
  private fullscreen: boolean = false
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
    this.skipIntro = !!(this.$route && this.$route.query && this.$route.query.skipIntro && this.$route.query.skipIntro === 'true')
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
