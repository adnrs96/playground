<template>
  <div
    class="bg-transparent"
    :class="[
      `${validationBorder}`,
      `${shake ? 'animate-shake' : ''}`,
      { 'border': !readonly },
      `${small ? 'rounded-md' : 'rounded-xl'}`,
      'flex',
      'items-center',
      'justify-between',
      {'bg-gray-10': disabled},
      {'bg-white': white},
      {'shadow-sm': shadow || readonly },
      {'w-full': full}
    ]"
  >
    <input
      :class="[
        `${readonly ? 'text-indigo-90' : disabled ? 'text-gray-30' : valid === false ? 'text-red-80' : 'text-gray-100'}`,
        'font-body',
        `${small ? 'text-xs' : 'text-base'}`,
        `${small ? 'py-3' : 'py-4'}`,
        `${small ? 'px-3' : 'px-4'}`,
        'bg-transparent',
        'w-full',
        'focus:outline-none',
        `${small ? 'rounded-md' : 'rounded-xl'}`,
        {'bg-gray-10': disabled},
      ]"
      :type="type"
      :disabled="disabled"
      :value="value"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :readonly="readonly"
      :autocomplete="autocomplete"
      v-on="listeners"
    >
    <s-icon
      v-if="!$slots.icon && !icon && loading"
      icon="spinner"
      :height="small ? 14 : 24"
      :width="small ? 14 : 24"
      color="text-gray-50"
      :loading="loading"
      :clickable="iconIsClickable"
      @click="$emit('icon-click')"
    />
    <s-icon
      v-else-if="!$slots.icon && icon"
      :loading="loading"
      :height="small ? 14 : 24"
      :width="small ? 14 : 24"
      :icon="icon"
      color="text-gray-50"
      :clickable="iconIsClickable"
      @click="$emit('icon-click')"
    />
    <template v-else-if="$slots.icon">
      <slot
        name="icon"
        :loading="loading"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import SIcon from '@/components/Icon.vue'
import SText from '@/components/Text.vue'

@Component({
  name: 'SInput',
  components: {
    SIcon,
    SText
  }
})
export default class Input extends Vue {
  @Prop({ type: Boolean, default: false }) readonly white!: boolean
  @Prop({ type: Boolean, default: false }) readonly shadow!: boolean
  @Prop({ type: Boolean, default: false }) readonly full!: boolean

  @Prop({
    type: Boolean,
    default: undefined
  }) readonly disabled!: boolean | undefined

  @Prop({
    type: String,
    default: 'text',
    validator: x => ['text', 'email', 'password', 'tel', 'number'].includes(x)
  }) readonly type!: string

  @Prop({
    type: String,
    default: ''
  }) readonly value!: string

  @Prop({
    type: String,
    default: undefined
  }) readonly placeholder!: string | undefined

  @Prop({
    type: String,
    default: undefined
  }) readonly name!: string | undefined

  @Prop({
    type: Boolean,
    default: false
  }) readonly required!: boolean

  @Prop({
    type: Boolean,
    default: false
  }) readonly readonly!: boolean

  @Prop({
    type: Boolean,
    default: false
  }) readonly loading!: boolean

  @Prop({
    type: Boolean,
    default: undefined
  }) readonly valid!: boolean

  @Prop({
    type: String,
    default: undefined,
    validator: x => ['github-o', 'gitlab-o', 'google-f', 'spinner', 'search'].includes(x)
  }) readonly icon!: string | undefined

  @Prop({
    type: Boolean,
    default: false
  }) readonly shake!: boolean

  @Prop({
    type: String,
    default: 'on',
    validator: v => ['on', 'off'].includes(v)
  }) readonly autocomplete!: string

  @Prop({
    type: Boolean,
    default: false
  }) readonly iconIsClickable!: boolean

  /**
   * set the button small, adding rounded-md instead of rounded-xl,
   */
  @Prop({
    type: Boolean,
    default: false
  }) readonly small!: boolean

  private get validationBorder (): string {
    switch (this.valid) {
      case true:
        return 'border-green-50'
      case false:
        return 'border-red-50'
      case undefined:
      default:
        return this.focused ? 'border-gray-50' : 'border-gray-30'
    }
  }

  private focused: boolean = false

  private get listeners (): object {
    return {
      blur: this.onBlur,
      change: this.onChange,
      click: this.onClick,
      focus: this.onFocus,
      input: this.onInput,
      keyup: this.onKeyUp,
      keydown: this.onKeyDown
    }
  }

  @Emit('click')
  private onClick (e: any) { }

  @Emit('keyup')
  private onKeyUp (e: any) { }

  @Emit('keydown')
  private onKeyDown (e: any) { }

  @Emit('blur')
  private onBlur (e: any) {
    this.focused = false
  }

  @Emit('focus')
  private onFocus (e: any) {
    this.focused = true
  }

  @Emit('input')
  @Emit('update')
  private onInput (e: any) {
    return (e && e.target && e.target.value) || (typeof e === 'string' ? e : '')
  }

  @Emit('change')
  private onChange (e: any) { }
}
</script>
