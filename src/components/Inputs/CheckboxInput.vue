<template>
  <div
    :class="[
      'bg-white w-21 rounded-3xl p-1 flex ease',
      { 'shadow-sm': shadow },
      { 'cursor-pointer': !disabled && !loading},
      { 'justify-start': !value && !loading },
      { 'justify-end': value && !loading },
      { 'justify-center': loading }
    ]"
    @click="!loading ? $emit('input', !value) && $emit('change', !value) : ''"
  >
    <div
      :class="[
        'rounded-3xl w-11 h-8 ease flex justify-center items-center',
        disabled && !value ? 'bg-gray-10': disabled && value ? 'bg-gray-30' : value && !loading ? 'bg-indigo-60' : 'bg-indigo-10',
        { 'border': !value || loading },
        { 'border-gray-30': disabled && !value },
        { 'border-indigo-60': !disabled && (!value || loading) }
      ]"
    >
      <s-icon
        v-if="loading"
        icon="spinner"
        loading
        color="text-indigo-60"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SIcon from '@/components/Icon.vue'

@Component({
  name: 'CheckboxInput',
  components: {
    SIcon
  }
})
export default class CheckboxInput extends Vue {
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean
  @Prop({ type: Boolean, default: false }) readonly value!: boolean
  @Prop({ type: Boolean, default: false }) readonly shadow!: boolean
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
}
</script>
