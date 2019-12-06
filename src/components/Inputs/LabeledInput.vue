<template>
  <div>
    <label
      :for="name"
      class="flex items-center mb-2 justify-between"
    >
      <s-text
        p="3"
        weight="semibold"
        class="mb-2 text-gray-80"
      >
        <slot name="label" />
      </s-text>
      <slot name="drop" />
    </label>
    <s-input
      :type="type"
      :disabled="disabled"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :value="value"
      :white="white"
      :shadow="shadow"
      :full="full"
      :loading="loading"
      :valid="valid"
      :icon="icon"
      :shake="shake"
      :icon-is-clickable="iconIsClickable"
      :small="small"
      v-on="listeners"
    />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import SInput from '@/components/Inputs/Input.vue'

@Component({
  name: 'LabeledInput',
  components: {
    SInput
  }
})
export default class LabeledInput extends SInput {}
</script>
