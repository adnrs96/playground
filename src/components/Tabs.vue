<template>
  <div class="flex flex-col">
    <div class="flex flex-row w-full bg-white border-b border-gray-20">
      <s-text
        v-for="(s, idx) of slots"
        :key="`slot-tab-${idx}`"
        :tabindex="10 + idx"
        p="4"
        weight="semibold"
        color="text-gray-100"
        :class="{ 'bg-gray-20 cursor-default': visibleSlot === idx, 'cursor-pointer hover:bg-gray-10': visibleSlot !== idx }"
        class="ml-4 px-3 py-1 mt-1 flex items-center focus:outline-none rounded-t-sm"
        role="tab"
        @click="visibleSlot = idx"
      >
        {{ s }}
      </s-text>
    </div>
    <!-- FIX FOR SAFARI, see https://bugs.webkit.org/show_bug.cgi?id=198375 -->
    <!-- Added flex to be able to add `flex-1` when we need a 10% height div on Safari (iPad) -->
    <s-perfect-scrollbar
      class="flex min-h-screen-no-navbar-tabs max-h-screen-no-navbar-tabs w-full"
    >
      <slot />
    </s-perfect-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import SText from '@/components/Text.vue'
import SPerfectScrollbar from '@/components/PerfectScrollbar.vue'

@Component({ name: 'Tabs', components: { SText, SPerfectScrollbar } })
export default class Tabs extends Vue {
  @Prop({ type: [String, Number], default: 0 })
  private selected!: string | number

  private visibleSlot = -1

  private get slots (): string[] {
    return (this.$slots &&
      this.$slots.default &&
      this.$slots.default.length > 0 &&
      this.$slots.default.reduce((arr: string[], n: any) => [...arr, n.data.attrs['data-tab-title']], [])) ||
      []
  }

  private get selectedIdx (): number {
    return typeof this.selected === typeof 0
      ? this.selected as number
      : /^\d+$/.test(this.selected as string)
        ? parseInt(this.selected as string)
        : this.slots.indexOf(this.selected as string)
  }

  @Watch('visibleSlot')
  private onVisibleSlotChange (idx: number, old: number) {
    if (!this.$slots || !this.$slots.default) return
    if (old >= 0 && old < this.$slots.default.length) {
      const oldSlot = this.$slots.default[old] as any
      oldSlot.elm.style.display = 'none'
    }
    if (idx >= 0 && idx < this.$slots.default.length) {
      const newSlot = this.$slots.default[idx] as any
      newSlot.elm.style.display = ''
      this.$emit('selected', { idx, name: this.slots[idx] })
    }
  }

  mounted () {
    this.$nextTick().then(() => {
      if (!this.$slots || !this.$slots.default) return
      for (const slot of this.$slots.default) {
        (slot as any).elm.style.display = 'none'
      }
      this.visibleSlot = this.selectedIdx
    })
  }
}
</script>
