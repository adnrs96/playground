<template>
  <div
    id="studio-view"
    class="flex flex-row"
  >
    <div class="flex flex-col w-full">
      <s-navbar
        :title="payload.name"
      />
      <div class="min-h-screen-no-navbar flex">
        <div
          v-if="$slots.notification && $slots.notification.length > 0"
          class="absolute mx-auto w-full -mt-2"
        >
          <slot name="notification" />
        </div>

        <div class="w-full flex-1 flex">
          <s-library class="pt-3" />
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Mutation, Getter } from 'vuex-class'
import { IStorySample } from '&/StorySample'
import samples from '@/samples'
import MonacoEditor from '@editor/MonacoEditor.vue'
import SNavbar from '@app/Layout/Navbar.vue'
import SIntro from '@internal/components/Intro.vue'
import SComments from '@internal/components/Comments.vue'
import SLibrary from '@app/Library/index.vue'

@Component({
  name: 'SLayout',
  components: {
    MonacoEditor,
    SNavbar,
    SIntro,
    SComments,
    SLibrary
  }
})
export default class SLayout extends Vue {
  @Prop({ type: String, default: 'counter' }) readonly sample!: string

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
