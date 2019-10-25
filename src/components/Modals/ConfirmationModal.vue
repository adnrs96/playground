<template>
  <s-modal
    :title="title"
    :cross="cross"
  >
    <template>
      <div class="px-5 md:px-16 pt-8 pb-6">
        <slot />
      </div>
      <div class="flex flex-col sm:flex-row items-center mb-10 px-5 md:px-16">
        <s-text
          :data-confirm-modal="confirmText"
          p="2"
          ease
          weight="semibold"
          color="text-indigo-60"
          class="bg-indigo-10 active:bg-indigo-20 rounded-md cursor-pointer w-full sm:w-48 text-center py-2 mr-0 sm:mr-3"
          @click="$emit('confirm') && hide()"
        >
          {{ confirmText }}
        </s-text>
        <s-text
          :data-deny-modal="confirmText"
          p="2"
          ease
          weight="medium"
          color="text-gray-60"
          class="cursor-pointer active:bg-gray-20 rounded-md w-full sm:w-48 text-center py-2 ml-0 mt-4 sm:mt-0 sm:ml-3"
          @click="hide()"
        >
          {{ denyText }}
        </s-text>
      </div>
    </template>
  </s-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SModal from './Modal.vue'
import SText from '@/components/Text.vue'

@Component({
  name: 'ConfirmationModal',
  components: {
    SModal,
    SText
  }
})
export default class ConfirmationModal extends SModal {
  @Prop({ type: String, default: 'Cancel' }) readonly denyText!: string
  @Prop({ type: String, default: 'Confirm' }) readonly confirmText!: string
}
</script>
