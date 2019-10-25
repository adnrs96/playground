<template>
  <div
    v-click-outside="close"
    :class="[
      'relative',
      'group',
      { 'w-full': full }
    ]"
  >
    <div
      :class="[
        'flex items-center justify-between border z-0',
        { 'rounded-tl-xl rounded-tr-xl': !small },
        { 'rounded-tl-md rounded-tr-md': small },
        { 'rounded-bl-xl rounded-br-xl': !small && !open },
        { 'rounded-bl-md rounded-br-md': small && !open },
        { 'shadow-sm': !open && shadow },
        { 'bg-white': openable && white},
        { 'cursor-pointer': openable },
        { 'cursor-default': !openable },
        { 'bg-gray-10': !openable },
        { 'border-gray-20': !open },
        { 'border-gray-30': open },
        `${small ? 'pr-3' : 'pr-4'}`,

      ]"
      @click="open = (!openable ? open : !open)"
    >
      <input
        :class="[
          'w-full font-body bg-transparent focus:outline-none rounded-xl font-medium',
          { 'cursor-pointer': openable },
          { 'cursor-default': !openable },
          { 'text-gray-30': !openable },
          `${small ? 'rounded-md' : 'rounded-xl'}`,
          `${small ? 'text-xs' : 'text-base'}`,
          `${small ? 'py-2' : 'py-4'}`,
          `${small ? 'pl-3' : 'pl-4'}`,

        ]"
        :placeholder="placeholder"
        :value="value"
        readonly
      >
      <s-icon
        v-if="openable"
        icon="carret"
        :width="24"
        :height="24"
        :class="[
          `${open ? 'pl-6' : 'pr-6'}`,
          { 'rotate-180deg': !open },
          { 'cursor-pointer': openable }
        ]"
        :color="open ? 'text-black': 'text-gray-50'"
      />
    </div>
    <transition name="fade-in">
      <div
        v-if="open"
        :class="[
          'absolute w-full p-2 border-l border-r border-b border-solid border-gray-30 rounded-bl-xl rounded-br-xl z-10',
          { 'shadow-sm': open && shadow },
          { 'bg-white': white},
          { 'cursor-pointer': openable }
        ]"
      >
        <div
          v-if="name"
          class="flex w-full items-center justify-between"
        >
          <s-text
            p="3"
            weight="bold"
            color="text-gray-100"
            class="p-2"
          >
            {{ name }}
          </s-text>
          <s-text
            v-if="value !== null"
            p="5"
            weight="semibold"
            color="text-gray-40"
            class="flex items-center"
            @click="open = false; $emit('input', null)"
          >
            <span class="mr-2">Remove {{ name }}</span>
            <s-icon
              icon="plus-c"
              color="text-gray-40"
              class="rotate-45deg"
            />
          </s-text>
        </div>
        <div
          v-for="(opt, idx) in options"
          :key="`option-${idx}`"
          :class="[
            'hover:bg-indigo-10 rounded-md',
            { 'cursor-pointer': openable }
          ]"
          @click="open = false; $emit('input', opt)"
        >
          <s-text
            :data-input-select-opt="opt"
            :p="small ? '4': '3'"
            weight="medium"
            color="text-gray-100"
            :class="[
              'p-2',
              { 'pl-4': name }
            ]"
          >
            {{ opt }}
          </s-text>
        </div>
        <slot name="footer" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SInput from '@/components/Inputs/Input.vue'
import SText from '@/components/Text.vue'

@Component({
  name: 'SelectInput',
  components: {
    SText
  }
})
export default class SelectInput extends SInput {
  @Prop({
    type: Array,
    required: true
  }) readonly options!: any[]

  @Prop({ type: String, default: null }) readonly value!: string

  private get openable (): boolean {
    return !(this.disabled || (this.options.length === 0 && !this.$slots.footer))
  }

  private open: boolean = false
  private selected: number = 0

  private close () {
    this.open = false
  }
}
</script>
