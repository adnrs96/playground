<template>
  <div
    :class="[{ 'relative': $slots.default && $slots.default.length > 0, 'cursor-pointer': clickable }]"
    @click="$emit('click', $event)"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="[
        color,
        'fill-current',
        { 'animate-wheel': loading === true },
        { 'cursor-pointer': clickable }
      ]"
      :viewBox="`0 0 ${viewBoxWidth} ${viewBoxHeight}`"
      :height="height"
      :width="width"
    >
      <defs v-if="defs">
        <linearGradient
          v-if="defs.linearGradient"
          :id="defs.linearGradient.id"
          :x1="defs.linearGradient.x1"
          :y1="defs.linearGradient.y1"
          :x2="defs.linearGradient.x2"
          :y2="defs.linearGradient.y2"
          :gradientUnits="defs.linearGradient.gradientUnits"
        >
          <stop
            v-for="(stop, idx) of defs.linearGradient.stops"
            :key="`def-icon-gradient-stop-${idx}`"
            v-bind="stop"
          />
        </linearGradient>
      </defs>
      <template v-if="path">
        <path
          v-for="(p, idx) of path"
          :key="`icon-${icon}-p-${idx}`"
          :fill="icon === 'story' && !color ? [dark ? '#9791FF': '#6E66FF', '#FE585A', '#96C8EB', '#FFB81E', '#FFB81E'][idx] : p.fill || undefined"
          v-bind="p"
        />
      </template>
      <circle
        v-if="circle"
        v-bind="circle"
      />
    </svg>
    <div
      v-if="$slots.default"
      class="absolute inset-0 inline-flex items-center justify-center"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Icons from '@/components/icons.json'

@Component({
  name: 'SIcon'
})
export default class Icon extends Vue {
  @Prop({
    type: String,
    required: true,
    validator: x => Icons.map(i => i.name).includes(x)
  }) readonly icon!: string

  @Prop({
    type: String,
    default: undefined
  }) color!: string | undefined

  @Prop({
    type: Boolean,
    default: false
  }) readonly loading!: boolean

  @Prop({
    type: [String, Number],
    default: 16
  }) readonly height!: boolean

  @Prop({
    type: [String, Number],
    default: 16
  }) readonly width!: boolean

  @Prop({
    type: Boolean,
    default: false
  }) readonly clickable!: boolean

  @Prop({
    type: Boolean,
    default: false
  }) readonly dark!: boolean

  private readonly icons: any[] = Icons

  private get current () {
    return this.icons.find(i => i.name === this.icon) || { name: '', width: 0, height: 0, circle: {}, path: {} }
  }

  private get viewBoxHeight () {
    return this.current.height
  }

  private get viewBoxWidth () {
    return this.current.width
  }

  private get path () {
    return this.current.path && !Array.isArray(this.current.path) ? [this.current.path] : this.current.path
  }

  private get circle () {
    return this.current.circle
  }

  private get defs () {
    return this.current.defs || undefined
  }
}
</script>
