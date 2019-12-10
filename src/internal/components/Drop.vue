<template>
  <div
    ref="self"
    v-click-outside="hideIfShown"
    class="drop"
  >
    <div
      ref="button"
      tabindex="3"
      class="cursor-pointer relative focus:outline-none"
      @mouseover="showTrigger('hover', true)"
      @mouseleave="showTrigger('hover', false)"
      @focus.capture="showTrigger('focus', true)"
      @blur.capture="showTrigger('focus', false);"
      @click="$emit('click', $event); showTrigger('click', !show)"
    >
      <slot :open="show" />
    </div>
    <!-- fade-in-enter fade-in-leave-to fade-in-enter-active fade-in-leave-active -->
    <transition name="fade-in">
      <div
        v-if="show && ($slots.content || (options && options.length > 0))"
        ref="content"
        :class="[
          'content',
          { light },
          { [`shadow-${shadow}`]: shadow },
          [`before-m${currentPosition[1][0]}-${arrowForceMargin || buttonSize}`],
          { [`${currentPosition[0]}-full`]: currentPosition !== undefined },
          { [`${currentPosition[1]}-0`]: currentPosition !== undefined },
          { 'border border-gray-30': bordered },
          { 'p-px': narrow },
          { 'rounded-sm': narrow },
          { 'rounded-xl': !narrow },
          { 'no-arrow': noArrow }
        ]"
      >
        <div
          v-if="$slots.content"
          :class="narrow ? 'm-px' : 'my-2 mx-2'"
        >
          <slot name="content" />
        </div>
        <ul v-else-if="options && options.length > 0">
          <li
            v-for="(option, idx) in options"
            :key="`dropdown-${Math.random()}-option-${idx}`"
            :data-drop-item-name="option.name"
            class="flex items-center"
            :class="[{ 'my-4': !narrow }, { 'my-2': narrow }, { 'px-4': !option.divider && !narrow }, { 'px-3': !option.divider && narrow }, { 'cursor-pointer': !option.divider }]"
            @click.stop="itemClick(option)"
          >
            <div
              v-if="option.divider"
              class="h-px bg-gray-90 w-full"
            />
            <template v-else>
              <s-icon
                v-if="option.icon"
                color="text-gray-50"
                class="inline-flex mr-2"
                :icon="option.icon"
              />
              <s-text
                p="4"
                :class="['text-gray-30', { 'min-w-24': !narrow }]"
                v-text="option.name"
              />
            </template>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'SDrop'
})
export default class Drop extends Vue {
  private show = false
  private currentPosition = ['bottom', 'left']

  /**
   * options is the array of options to be displayed in the dropdown
   * option object prototype: { name: '', [icon: 's_icon_name', [keepOpen: false]] }
   */
  @Prop({ type: Array, default: undefined }) private options!: any[]

  @Prop({ type: Boolean, default: false }) private up!: boolean
  @Prop({ type: Boolean, default: false }) private down!: boolean
  @Prop({ type: Boolean, default: false }) private left!: boolean
  @Prop({ type: Boolean, default: false }) private right!: boolean
  @Prop({ type: Boolean, default: false }) private arrowup!: boolean
  @Prop({ type: Boolean, default: false }) private arrowdown!: boolean
  @Prop({ type: Boolean, default: false }) private arrowleft!: boolean
  @Prop({ type: Boolean, default: false }) private arrowright!: boolean
  @Prop({ type: Boolean, default: false }) private narrow!: boolean
  @Prop({ type: [String, Number], default: undefined }) private arrowForceMargin!: string | number | undefined
  @Prop({ type: Boolean, default: false }) private noArrow!: boolean

  @Prop({ type: Boolean, default: false }) readonly light!: boolean

  // shadow-sm
  @Prop({ type: String, default: undefined }) readonly shadow!: string | undefined

  @Prop({ type: Boolean, default: false }) readonly bordered!: boolean

  @Prop({ type: String, default: 'click', validator: v => ['click', 'hover', 'focus', 'hover|focus'].includes(v) })
  private mode!: string

  private modes: any = { click: false, hover: false, focus: false }

  @Watch('show') private onDisplayChange () {
    this.refreshPosition()
  }

  @Watch('modes', { deep: true })
  private onModesUpdate () {
    this.$nextTick().then(() => (this.show = this.modes.click || this.modes.hover || this.modes.focus))
  }

  public hideIfShown () {
    if (this.show) {
      this.modes.click = false
      this.modes.focus = false
      this.modes.hover = false
      this.$emit('close')
    }
  }

  private itemClick (item: any) {
    if (item && item.emit) {
      this.$emit('selected', item.emit)

      if (!item.keepOpen) {
        this.show = false
      }
    }
  }

  private showTrigger (mode: string, show: boolean) {
    if (this.mode.includes(mode)) {
      this.modes[mode] = show
    }
  }

  private buttonSize = 0

  /**
   * refreshPosition will set a new array of position and define the buttonSize needed for the arrow position
   * prevent those classes to be purged in production : before-mr-3 before-mr-4 before-mr-20 before-mr-6 before-ml-3
   * before-ml-4 before-ml-6 before-mt-3 before-mt-4 before-mt-6 before-mb-3 before-m-4 before-mb-6
   * top-full bottom-full left-full right-full top-0 bottom-0 left-0 right-0
   */
  public refreshPosition () {
    this.$nextTick().then(() => {
      const newPos = ['top', 'left']
      const content = this.$refs.content as Element
      const button = this.$refs.self as Element
      if (content) {
        const spaceUp = button.getBoundingClientRect().top - content.clientHeight
        const spaceDown = window.innerHeight - button.getBoundingClientRect().bottom - content.clientHeight
        const spaceLeft = button.getBoundingClientRect().left - content.clientWidth
        const spaceRight = window.innerWidth - button.getBoundingClientRect().right - content.clientWidth
        const spaceArrowUp = button.getBoundingClientRect().top + button.clientHeight - content.clientHeight
        const spaceArrowDown = window.innerHeight - button.getBoundingClientRect().top - content.clientHeight
        const spaceArrowLeft = button.getBoundingClientRect().left + button.clientWidth - content.clientWidth
        const spaceArrowRight = window.innerWidth - button.getBoundingClientRect().left - content.clientWidth
        this.buttonSize = (button.clientWidth >= 160) ? 24 : (button.clientWidth > 64) ? (((button.clientWidth / 2 >> 4) + 1) << 4) / 4 : Math.round(button.clientWidth / 2 / 4) + 1

        if (this.up || this.down) {
          newPos[0] = 'top'
          if (this.up && spaceUp > 0) {
            newPos[0] = 'bottom'
          }
          newPos[1] = this.compareSpace(spaceArrowLeft, spaceArrowRight, this.arrowleft, this.arrowright) ? 'left' : 'right'
        } else if (this.left || this.right) {
          newPos[0] = 'left'
          if (this.left && spaceLeft > 0) {
            newPos[0] = 'right'
          }
          newPos[1] = this.compareSpace(spaceArrowUp, spaceArrowDown, this.arrowup, this.arrowdown) ? 'top' : 'bottom'
        } else {
          const maxSpace = Math.max(spaceUp, spaceDown, spaceLeft, spaceRight)

          if (maxSpace === spaceUp) {
            newPos[0] = 'bottom'
            newPos[1] = this.compareSpace(spaceArrowLeft, spaceArrowRight, this.arrowleft, this.arrowright) ? 'left' : 'right'
          } else if (maxSpace === spaceDown) {
            newPos[0] = 'top'
            newPos[1] = this.compareSpace(spaceArrowLeft, spaceArrowRight, this.arrowleft, this.arrowright) ? 'left' : 'right'
          } else if (maxSpace === spaceLeft) {
            newPos[0] = 'right'
            newPos[1] = this.compareSpace(spaceArrowUp, spaceArrowDown, this.arrowup, this.arrowdown) ? 'top' : 'bottom'
          } else {
            newPos[0] = 'left'
            newPos[1] = this.compareSpace(spaceArrowUp, spaceArrowDown, this.arrowup, this.arrowdown) ? 'top' : 'bottom'
          }
        }

        if (newPos[0] !== this.currentPosition[0] || newPos[1] !== this.currentPosition[1]) {
          this.currentPosition = newPos
        }
      }
    })
  }

  private compareSpace (s1: number, s2: number, o1: boolean, o2: boolean) {
    if ((Math.max(s1, s2) === s1 || o2) && !o1) {
      return false
    }
    return true
  }

  mounted () {
    window.addEventListener('scroll', this.refreshPosition)
    window.addEventListener('resize', this.refreshPosition)
  }

  beforeDestroy () {
    window.removeEventListener('scroll', this.refreshPosition)
    window.removeEventListener('resize', this.refreshPosition)
  }
}
</script>
