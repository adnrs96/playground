<template>
  <component
    :is="url ? 'a' : 'button'"
    :href="url"
    :title="title"
    class="flex items-center focus:outline-none group"
    :class="[
      { 'px-5': !center && !small },
      { 'px-12': !center && small },
      backgroundColor,
      dashed ? 'flex-row-reverse' : 'flex-row',
      { 'focus:shadow-outline': !dashed || danger },
      small ? 'rounded-lg' : 'rounded-xl',
      { 'border border-solid border-gray-30': !(black || primary || dashed || danger) },
      `${center ? 'justify-center': 'justify-between'}`
    ]"
    :type="!url ? type : undefined"
    @click="$emit('click', $event)"
  >
    <s-text
      v-if="$slots.default"
      :p="dashed ? '5' : '2'"
      :weight="dashed ? 'medium' : 'semibold'"
      :color="textColor"
      :class="[
        `${!small ? 'py-4' : 'py-3'}`
      ]"
    >
      <slot />
    </s-text>
    <s-icon
      v-if="icon || loading"
      :icon="icon || 'spinner'"
      :color="black || primary || danger ? 'text-white' : dashed ? 'text-gray-40 group-hover:text-gray-80 group-active:text-gray-40' : 'text-gray-50'"
      :loading="loading"
      :class="[
        { 'py-7/8 px-14': !$slots.default },
        { [`p${dashed || danger ? 'r' : 'l'}-3`]: $slots.default }
      ]"
    />
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SText from '@/components/Text.vue'
import SIcon from '@/components/Icon.vue'

@Component({
  name: 'SButton',
  components: {
    SText,
    SIcon
  }
})
export default class Button extends Vue {
  @Prop({ type: Boolean, default: false }) readonly white!: boolean
  @Prop({ type: Boolean, default: false }) readonly transparent!: boolean
  @Prop({ type: Boolean, default: false }) readonly danger!: boolean
  @Prop({ type: Boolean, default: false }) readonly outlined!: boolean
  @Prop({ type: Boolean, default: false }) readonly black!: boolean
  @Prop({ type: Boolean, default: false }) readonly primary!: boolean
  @Prop({ type: Boolean, default: false }) readonly dashed!: boolean
  @Prop({ type: Boolean, default: false }) readonly center!: boolean
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean
  @Prop({ type: String, default: undefined }) readonly url!: string | undefined
  @Prop({ type: String, default: 'button' }) readonly type!: boolean
  @Prop({
    type: String,
    default: undefined
  }) readonly icon!: string | undefined
  @Prop({
    type: Boolean,
    default: false
  }) readonly small!: boolean
  @Prop({
    type: String,
    default: undefined
  }) readonly color!: string

  private get path (): string {
    return `./assets/img/logos/${this.icon === 'gitlab-o'
      ? 'gitlab-outline.svg' : this.icon === 'google-f'
        ? 'google-filled.svg' : this.icon === 'github-o'
          ? 'github-waving-cat-outline.svg' : ''}`
  }

  private get textColor (): string {
    return this.black || this.primary ? 'text-white' : this.danger ? 'text-red-60 group-hover:text-white group-active:text-white' : this.dashed ? 'text-gray-50 group-hover:text-gray-80 group-active:text-gray-50' : this.color ? this.color : 'text-black'
  }

  private get title (): string {
    return (this.$slots.default && this.$slots.default[0] && this.$slots.default[0].text && this.$slots.default[0].text.trim()) || ''
  }

  private get backgroundColor (): string {
    return this.black
      ? 'bg-gray-100 hover:bg-gray-90' : this.primary
        ? 'bg-indigo-60 hover:bg-indigo-70' : this.dashed
          ? 'bg-border-dashed' : this.danger
            ? 'bg-white border-transparent hover:bg-red-70 active:bg-red-60' : this.transparent
              ? 'bg-transparent border-gray-60 hover:bg-gray-20' : 'bg-white hover:bg-gray-10'
  }
}
</script>
