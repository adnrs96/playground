<template>
  <component
    :is="tagname"
    ref="self"
    :class="['ps', { 'ps--hidden': disableUi }]"
    @mouseover.once="update"
    @ps-scroll-y="scrollHandle"
    @ps-scroll-x="scrollHandle"
    @ps-scroll-up="scrollHandle"
    @ps-scroll-down="scrollHandle"
    @ps-scroll-left="scrollHandle"
    @ps-scroll-right="scrollHandle"
    @ps-y-reach-start="scrollHandle"
    @ps-y-reach-end="scrollHandle"
    @ps-x-reach-start="scrollHandle"
    @ps-x-reach-end="scrollHandle"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import PerfectScrollbar from 'perfect-scrollbar'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import event from '@/event'

export interface IPerfectScrollbar {
  setScrollingY: (enable: boolean) => void
}

/** perfect-scrollbar classes to keep: .ps__rail-x, .ps__rail-y, .ps__thumb-x, .ps__thumb-y, .ps--clicking, .ps--focus, .ps--scrolling-x, .ps--scrolling-y, .ps--active-y, .ps--active-x */
@Component({ name: 'VuePerfectScrollbar' })
export default class VuePerfectScrollbar extends Vue implements IPerfectScrollbar {
  @Prop({ type: Object, default: () => ({}) }) private settings!: PerfectScrollbar.Options
  @Prop({ type: Boolean, default: true }) private swicher!: boolean
  @Prop({ type: Boolean, default: false }) private disableUi!: boolean
  @Prop({ type: String, default: 'section' }) private tagname!: string

  private isPSInitialized: boolean = false
  private ps?: PerfectScrollbar = undefined
  private suppressScrollY: boolean = false

  private scrollHandle (e: any) {
    this.$emit(e.type, e)
  }

  private update () {
    if (this.ps) {
      this.ps.update()
    }
  }

  private init () {
    if (this.swicher) {
      if (!this.isPSInitialized) {
        this.isPSInitialized = true
        const settings = {
          ...this.settings,
          suppressScrollY: this.suppressScrollY,
          swipeEasing: true,
          wheelPropagation: true,
          minScrollbarLength: 0
        }
        if (this.$refs.self) {
          this.ps = new PerfectScrollbar(this.$refs.self as HTMLElement, settings)
        }
      } else {
        this.update()
      }
    }
  }

  private destroy () {
    if (this.ps) {
      this.ps.destroy()
      delete this.ps
      this.isPSInitialized = false
    }
  }

  @Watch('swicher') private onSwicherChange (val: boolean) {
    if (val && !this.isPSInitialized) {
      this.init()
    }
    if (!val && this.isPSInitialized) {
      this.destroy()
    }
  }
  @Watch('$route') private onRouteUpdate () {
    this.update()
  }

  setScrollingY (enable: boolean) {
    this.suppressScrollY = !enable
    if (enable) {
      this.init()
    } else {
      this.destroy()
    }
  }

  mounted () {
    // for support ssr
    if (!this.$isServer) {
      this.init()
    }
    event.$on('stopScrolling', () => {
      this.setScrollingY(false)
    })
    event.$on('startScrolling', () => {
      this.setScrollingY(true)
    })
  }

  updated () {
    this.$nextTick(this.update)
  }

  beforeDestroy () {
    this.destroy()
  }
}
</script>
