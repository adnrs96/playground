<template>
  <div
    id="studio-view"
    class="flex flex-row"
  >
    <s-toolbar />
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
        <div
          id="left-col"
          class="flex flex-col w-full"
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
        </div>

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
import { IStorySample } from '&/StorySample'
import samples from '@/samples'
import MonacoEditor from '@editor/MonacoEditor.vue'
import SNavbar from '@internal/components/Navbar.vue'
import SIntro from '@internal/components/Intro.vue'
import SToolbar from '@internal/components/Toolbar.vue'

@Component({
  components: {
    MonacoEditor,
    SNavbar,
    SIntro,
    SToolbar
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
}
</script>
