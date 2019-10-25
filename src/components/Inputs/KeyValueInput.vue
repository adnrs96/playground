<template>
  <div class="key-value-input flex justify-between">
    <s-input
      v-model="value.key"
      placeholder="Key"
      :type="type"
      :disabled="disabled"
      :name="`key-${uuid}`"
      :required="required"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :white="white"
      :shadow="shadow"
      :full="full"
      :loading="loading"
      :valid="valid"
      :shake="shake"
      :icon-is-clickable="iconIsClickable"
      :small="small"
      class="mr-4 w-full"
    />
    <s-input
      v-model="value.value"
      placeholder="Value"
      :type="type"
      :disabled="disabled"
      :name="`value-${uuid}`"
      :required="required"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :white="white"
      :shadow="shadow"
      :full="full"
      :loading="loading"
      :valid="valid"
      :shake="shake"
      :icon-is-clickable="iconIsClickable"
      :small="small"
      class="w-full"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import SInput from '@/components/Inputs/Input.vue'
import uuid from 'uuid/v4'

@Component({
  name: 'KeyValueInput'
})
export default class KeyValueInput extends SInput {
  private uuid: string = uuid()
  @Prop({ type: Object, default: () => ({}) }) readonly value!: any

  @Watch('value', { deep: true })
  private onInputChange () {
    this.$emit('input', this.value)
    this.$emit('change', this.value)
  }
}
</script>
