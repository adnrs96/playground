<template>
  <component
    :is="tag"
    :class="[
      'font-body',
      'leading-normal',
      { ease },
      { shimmer },
      { 'bg-transparent': !shimmer },
      { 'cursor-pointer': clickable },
      { [color]: !shimmer },
      `${fontSize}`,
      `${fontWeight}`,
      `${letterSpacing}`,
      `${left ? 'text-left': ''}`,
      `${center ? 'text-center': ''}`,
      `${right ? 'text-right': ''}`,
      `${justify ? 'text-justify': ''}`
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'SText'
})
export default class Text extends Vue {
  @Prop({ type: Boolean, default: false }) readonly shimmer!: boolean
  @Prop({ type: Boolean, default: false }) readonly span!: boolean
  @Prop({ type: Boolean, default: false }) readonly li!: boolean
  @Prop({ type: Boolean, default: false }) readonly ease!: boolean
  @Prop({ type: Boolean, default: false }) readonly clickable!: boolean
  @Prop({
    type: String,
    default: undefined,
    validator: v => ['1', '2'].includes(v)
  }) readonly head!: string | undefined

  @Prop({
    type: String,
    default: undefined,
    validator: v => ['1', '2', '3', '4', '5', '6'].includes(v)
  }) readonly p!: string | undefined

  @Prop({
    type: String,
    default: 'regular',
    validator: v => ['regular', 'medium', 'semibold', 'bold'].includes(v)
  }) readonly weight!: string

  @Prop({
    type: String,
    default: 'black'
  }) readonly color !: string

  @Prop({ type: Boolean, default: false }) readonly left!: boolean
  @Prop({ type: Boolean, default: false }) readonly center!: boolean
  @Prop({ type: Boolean, default: false }) readonly right!: boolean
  @Prop({ type: Boolean, default: false }) readonly justify!: boolean

  private get tag (): string {
    return this.span ? 'span' : this.li ? 'li' : this.head ? `h${this.head}` : 'p'
  }

  private get fontSize (): string {
    switch (this.head) {
      case '1':
        return 'text-5xl'
      case '2':
        return 'text-2xl'
    }
    switch (this.p) {
      case '1':
        return 'text-lg'
      case '3':
        return 'text-sm'
      case '4':
      case '5':
      case '6':
        return 'text-xs'
      case '2':
      default:
        return 'text-base'
    }
  }

  private get letterSpacing (): string {
    switch (this.p) {
      case '3':
      case '5':
        return 'tracking-wider'
      case '4':
      case '6':
        return 'tracking-wide'
      default:
        return 'tracking-normal'
    }
  }

  private get fontWeight (): string {
    switch (this.weight) {
      case 'medium':
        return 'font-medium'
      case 'bold':
        return 'font-bold'
      case 'semibold':
        return 'font-semibold'
      case 'regular':
      default:
        return 'font-normal'
    }
  }
}
</script>
