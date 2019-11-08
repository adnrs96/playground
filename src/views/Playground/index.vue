<template>
  <div
    id="playground"
    class="min-h-screen-no-navbar flex"
  >
    <div
      v-if="$slots.notification && $slots.notification.length > 0"
      class="absolute mx-auto w-full -mt-2"
    >
      <slot name="notification" />
    </div>
    <div class="flex flex-col w-2/3">
      <div class="flex items-center my-4 mx-8">
        <s-text
          p="3"
          weight="semibold"
          color="text-gray-100"
        >
          {{ payload.stories[0] }}.story
        </s-text>
        <s-text
          p="6"
          weight="semibold"
          color="text-indigo-70"
          class="flex items-center py-1 px-2 rounded-sm bg-indigo-10 ml-3 cursor-default select-none"
        >
          <s-icon icon="eye" />
          <span class="ml-1">Read only</span>
        </s-text>
        <s-text
          p="6"
          weight="semibold"
          color="text-indigo-70"
          class="flex items-center py-1 px-2 rounded-sm bg-indigo-10 ml-3 cursor-default select-none "
        >
          <span>Demonstration</span>
        </s-text>
      </div>
      <!-- FIX FOR SAFARI, see https://bugs.webkit.org/show_bug.cgi?id=198375 -->
      <div class="h-0 flex-1">
        <monaco-editor
          v-model="payload.code"
          class="w-full h-full"
          :options="options"
        />
      </div>
      <div class="w-full flex">
        <s-architecture
          :services="payload.services"
        />
      </div>
    </div>
    <s-logs
      class="w-1/3"
      :payload="payload"
    />
    <s-intro
      v-if="payload.tips && isIntro"
      :tips="payload.tips"
      show-at-startup
      @done="isIntro = false"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import SLogs from '@/views/Playground/Logs.vue'
import SArchitecture from '@/views/Playground/Architecture.vue'
import { IStorySample } from '@/models/StorySample'
import samples from '@/samples'
import MonacoEditor from '@/components/MonacoEditor.vue'
import SText from '@/components/Text.vue'
import SIcon from '@/components/Icon.vue'
import SIntro from '@/components/Intro.vue'

@Component({
  components: {
    SLogs,
    SArchitecture,
    MonacoEditor,
    SIcon,
    SText,
    SIntro
  }
})
export default class Playground extends Vue {
  @Prop({ type: String, default: 'counter' }) readonly sample!: string

  private payload: IStorySample = samples[samples.hasOwnProperty(this.sample) ? this.sample : 'counter' || 'counter']
  private isIntro: boolean = false

  @Emit('introChange')
  @Watch('isIntro') private onIntroChange (): boolean {
    return this.isIntro
  }

  private options: any = {
    readOnly: true,
    minimap: { enabled: false },
    fontSize: 16,
    automaticLayout: true
  }

  @Mutation('setPayload')
  private setPayload!: (payload: IStorySample) => void

  public setPayloadName (sample: string) {
    this.payload = samples[sample]
    this.setPayload(this.payload)
  }

  created () {
    if (this.sample.length > 0) {
      if (samples.hasOwnProperty(this.sample)) {
        this.setPayloadName(this.sample)
      } else {
        this.$router.replace({ name: 'not-found' })
      }
    }
    this.isIntro = !(this.$route && this.$route.query && this.$route.query.skipIntro && this.$route.query.skipIntro === 'true')
  }
}
</script>
