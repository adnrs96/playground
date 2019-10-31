<template>
  <div
    v-if="currentTip"
    class="fixed z-50 top-0 left-0"
  >
    <div class="bg-gray-100 opacity-25 w-screen h-screen inset-0 absolute" />
    <s-drop
      v-if="!refreshTip"
      :id="`tip-${currentTip.name}`"
      ref="tip"
      bordered
      class="ml-px mt-px"
      light
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
          p="5"
          weight="medium"
          color="text-gray-90"
          class="max-w-xxs w-max-content"
          v-text="currentTip.text"
        />
        <s-text
          p="6"
          weight="semibold"
          color="text-indigo-60"
          class="mt-2 cursor-pointer"
          @click="$refs.tip.hideIfShown()"
          v-text="currentTipIdx + 1 < tips.length ? 'Next tip' : undefined"
        />
      </template>
    </s-drop>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { IStorySampleTip } from '@/models/StorySample'
import SDrop from '@/components/Drop.vue'
import SIcon from '@/components/Icon.vue'
import SText from '@/components/Text.vue'

@Component({
  name: 'Intro',
  components: {
    SDrop,
    SIcon,
    SText
  }
})
export default class Intro extends Vue {
  @Prop({ type: Array, required: true }) private tips!: IStorySampleTip[]
  private currentTipIdx: number = 0
  private refreshTip: boolean = false

  @Watch('currentTipIdx')
  private onCurrentTipIncrement () {
    this.refreshTip = true
    this.$nextTick().then(() => (this.refreshTip = false))
  }

  private updateTip () {
    this.currentTipIdx++
    if (this.currentTip) {
      this.$nextTick().then(() => {
        setTimeout(() => {
          const tip = this.$refs.tip as any
          tip.show = true
        }, 100)
      })
    } else {
      this.$emit('done')
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
