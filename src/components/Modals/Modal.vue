<template>
  <!-- v-click-outside="clickOutsideHandler()" -->
  <div
    v-click-outside="hide"
    class="bg-white rounded-xl shadow-box-xl flex flex-col items-center w-auto max-w-lg mx-auto"
  >
    <div
      class="flex w-full items-center p-6"
      :class="[
        title ? 'justify-between border-b border-gray-20' : 'justify-end'
      ]"
    >
      <div
        v-if="title"
        class="spacer"
      />
      <s-text
        v-if="title"
        p="4"
        weight="semibold"
        color="text-black"
      >
        {{ title }}
      </s-text>
      <s-icon
        v-if="cross"
        icon="cross"
        color="text-gray-70"
        clickable
        @click="hide()"
      />
      <div
        v-else
        class="spacer"
      />
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import SText from '@/components/Text.vue'
import SIcon from '@/components/Icon.vue'
import IDisplay from '@/models/Display'

@Component({
  name: 'Modal',
  components: {
    SText,
    SIcon
  }
})
export default class Modal extends Vue implements IDisplay {
  @Prop({ type: String, default: undefined }) readonly title!: string | undefined
  @Prop({ type: Boolean, default: false }) readonly cross!: boolean

  @Inject('show') readonly show!: () => void
  @Inject('hide') readonly hide!: () => void
}
</script>
