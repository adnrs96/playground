<template>
  <div
    id="studio-view"
    class="flex flex-row"
  >
    <div class="flex flex-col w-full">
      <s-navbar
        :title="payload.name"
      />
      <div class="min-h-screen-no-navbar flex bg-gray-10">
        <div
          v-if="$slots.notification && $slots.notification.length > 0"
          class="absolute mx-auto w-full -mt-2"
        >
          <slot name="notification" />
        </div>

        <div
          id="layout-content"
          class="flex flex-row justify-center items-stretch w-full"
        >
          <div class="inline-flex">
            <s-library class="pt-3" />
          </div>
          <s-editor />
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
import SNavbar from '@app/Layout/Navbar.vue'
import SIntro from '@internal/components/Intro.vue'
import SEditor from '@app/Editor/index.vue'
import SLibrary from '@app/Library/index.vue'

@Component({
  name: 'SLayout',
  components: {
    SNavbar,
    SIntro,
    SEditor,
    SLibrary
  }
})
export default class SLayout extends Vue {
  @Prop({ type: String, default: 'counter' }) readonly sample!: string

  @Getter('getPayload')
  private payload!: IStorySample

  @Getter('hasTipsBeenShown')
  private hasTipsBeenShown!: (sampleId: string) => boolean

  @Mutation('sampleHasBeenShown')
  private sampleHasBeenShown!: (sampleId: string) => void

  @Mutation('setPayload')
  private setPayload!: (payload: IStorySample) => void

  private get isIntro (): boolean {
    return !(this.hasTipsBeenShown(this.sample) || this.skipIntro)
  }

  private skipIntro: boolean = false

  created () {
    if (this.sample in samples) {
      this.setPayload(samples[this.sample])
    } else {
      this.$router.replace({ name: 'not-found' })
    }
    this.skipIntro = !!(this.$route && this.$route.query && this.$route.query.skipIntro && this.$route.query.skipIntro === 'true')
  }
}
</script>
