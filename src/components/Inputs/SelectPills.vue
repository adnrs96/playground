<template>
  <div>
    <slot name="label" />
    <div class="flex flex-row rounded-md bg-gray-10 mb-4 px-2 py-2">
      <div
        v-for="(option, idx) in optionStrings"
        :key="`selectpill-${Math.random()}-option-${idx}`"
        class="w-full flex flex-row"
      >
        <label
          :class="[
            'whitespace-no-wrap',
            'w-full',
            'rounded-md',
            'text-center',
            'px-2',
            'py-2',
            'cursor-pointer',
            'select-none',
            'font-body',
            {'bg-indigo-50 text-white': option === selected},
            {'bg-white text-gray-100': option !== selected},
            fontSize,
            fontWeight
          ]"
        >
          <input
            v-model="selected"
            hidden
            :name="`selectpills-list-${uid}`"
            type="radio"
            :value="option"
          >
          {{ option }}
        </label>
        <div
          v-if="idx + 1 < optionStrings.length"
          class="border mx-2 my-1 rounded border-gray-30"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import uuid from 'uuid/v4'

@Component({
  name: 'SelectPills',
  components: {}
})
export default class SelectPills extends Vue {
  private selected = ''
  private uid = uuid()

  @Prop({ type: Array, default: undefined, required: true }) readonly optionStrings!: String[]

  @Prop({
    type: String,
    default: undefined,
    validator: v => ['1', '2', '3', '4', '5'].includes(v)
  })
  readonly p!: string | undefined

  @Prop({
    type: String,
    default: 'regular',
    validator: v => ['regular', 'medium', 'semibold', 'bold'].includes(v)
  })
  readonly weight!: string

  private get fontSize (): string {
    /* text-base text-lg text-sm text-xs */
    return `text-${
      this.p === '1'
        ? 'lg'
        : this.p === '3'
        ? 'sm'
        : this.p && ['4', '5'].includes(this.p)
        ? 'xs'
        : 'base'
    }`
  }

  private get fontWeight (): string {
    /* font-normal font-medium font-semibold font-bold */
    return `font-${this.weight === 'regular' ? 'normal' : this.weight}`
  }

  @Watch('selected')
  private onPillSelected () {
    this.$emit('pillSelectionChange', this.selected)
  }
}
</script>
