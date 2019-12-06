<template>
  <transition name="fade-in">
    <div
      v-if="currentTip"
      class="fixed z-50 top-0 left-0"
    >
      <div
        id="intro-layer"
        class="bg-gray-100 opacity-25 w-screen h-screen inset-0 absolute"
      />
      <!-- s-drop using class before-ml-4 -->
      <s-drop
        v-if="!refreshTip"
        :id="`tip-${currentTip.name}`"
        ref="tip"
        bordered
        class="ml-px mt-px"
        light
        down
        mode="click"
        shadow="sm"
        :style="`left:${currentTip.x}px;top:${currentTip.y}px`"
        @close="updateTip"
      >
        <s-icon
          icon="dot"
          width="14"
          height="14"
          class="text-red-50 animate-ripple p-3 bg-white opacity-75 rounded-full -ml-3 -mt-3"
          clickable
        />
        <template #content>
          <s-text
            id="tip-content"
            p="4"
            weight="medium"
            class="max-w-xs w-max-content text-gray-90"
            v-text="currentTip.text"
          />
          <div class="flex items-stretch justify-between mt-2">
            <s-text
              id="next-tip"
              p="4"
              weight="semibold"
              class="cursor-pointer text-indigo-60"
              @click="$refs.tip.hideIfShown()"
              v-text="currentTipIdx + 1 < tips.length ? 'Next tip' : 'Got it!'"
            />
            <s-text
              v-if="currentTipIdx + 1 < tips.length"
              id="skip-tips"
              p="4"
              weight="semibold"
              class="cursor-pointer text-indigo-60"
              @click="$emit('done')"
            >
              Skip tips
            </s-text>
          </div>
        </template>
      </s-drop>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { IStorySampleTip } from '@/models/StorySample'
import SDrop from '@/components/Drop.vue'

@Component({
  name: 'Intro',
  components: {
    SDrop
  }
})
export default class Intro extends Vue {
  @Prop({ type: Array, required: true }) private tips!: IStorySampleTip[]
  @Prop({ type: Boolean, default: false }) private showAtStartup!: boolean
  private currentTipIdx = 0
  private refreshTip = false

  @Watch('currentTipIdx')
  private onCurrentTipIncrement () {
    this.refreshTip = true
    this.$nextTick().then(() => (this.refreshTip = false))
  }

  private updateTip () {
    this.currentTipIdx++
    if (this.currentTip) {
      this.$nextTick().then(this.showTip)
    } else {
      this.$emit('done')
    }
  }

  private showTip () {
    setTimeout(() => {
      const tip = this.$refs.tip as any
      if (tip) {
        tip.show = true
      }
    }, 100)
  }

  mounted () {
    if (this.showAtStartup) {
      this.$nextTick().then(this.showTip)
    }
  }

  private get currentTip (): IStorySampleTip | undefined {
    if (this.currentTipIdx < this.tips.length) {
      return this.tips[this.currentTipIdx]
    }
    return undefined
  }
}
</script>
