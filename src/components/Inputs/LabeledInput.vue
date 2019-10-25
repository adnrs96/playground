<template>
  <div>
    <label
      :for="name"
      class="flex items-center mb-2 justify-between"
    >
      <s-text
        p="3"
        weight="semibold"
        color="text-gray-80"
        class="mb-2"
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import SInput from '@/components/Inputs/Input.vue'
import SText from '@/components/Text.vue'
import SIcon from '@/components/Icon.vue'

@Component({
  name: 'LabeledInput',
  components: {
    SText,
    SInput,
    SIcon
  }
})
export default class LabeledInput extends SInput {}
</script>
