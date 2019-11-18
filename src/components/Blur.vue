<template>
  <transition name="fade-in">
    <div
      v-show="open"
      class="ease bg-blurred-3xl z-30 w-screen h-screen absolute inset-0 bg-indigo-100-10"
    >
      <perfect-scrollbar
        ref="blurPS"
        class="min-h-screen max-h-screen w-full flex flex-col"
      >
        <div class="ease w-full h-full p-2 my-auto">
          <slot />
        </div>
      </perfect-scrollbar>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Watch, Provide } from 'vue-property-decorator'
import PerfectScrollbar from '@/components/PerfectScrollbar.vue'
import event from '@/event'
import IDisplay from '@/models/Display'

@Component({
  name: 'SBlur',
  components: { PerfectScrollbar }
})
export default class Blur extends Vue implements IDisplay {
  private open = false
  private enforce = false

  @Watch('open')
  private onOpenWatcher () {
    if (this.enforce) {
      this.enforce = false
      setTimeout(() => (this.open = false), 60)
    }
    const ps = this.$refs.blurPS as PerfectScrollbar
    if (this.open) {
      document.documentElement.classList.add('overflow-hidden')
      event.$emit('stopScrolling')
      ps.setScrollingY(true)
    } else {
      document.documentElement.classList.remove('overflow-hidden')
      event.$emit('startScrolling')
    }
  }

  @Provide('show')
  public show () {
    setTimeout(() => (this.open = true), 50)
  }

  @Provide('hide')
  public hide () {
    if (this.open) {
      this.open = false
      this.$emit('hidden')
    }
  }

  get forceHide (): boolean {
    return this.enforce
  }

  set forceHide (enforce: boolean) {
    this.enforce = enforce
  }
}
</script>
