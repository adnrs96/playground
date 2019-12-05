<template>
  <!-- s-drop using class before-mr-2 -->
  <s-drop
    class="ml-px mt-px"
    mode="hover|focus"
    right
    light
    bordered
    shadow="sm"
  >
    <s-icon
      icon="dot"
      width="12"
      height="12"
      class="text-red-50 animate-ripple"
      clickable
    />
    <s-text
      slot="content"
      p="4"
      weight="medium"
      class="max-w-xxs whitespace-normal w-max-content text-gray-90"
      v-text="text"
    />
  </s-drop>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SDrop from '@/components/Drop.vue'

@Component({
  name: 'Tip',
  components: {
    SDrop
  }
})
export default class Tip extends Vue {
  @Prop({ type: String, default: undefined }) private content!: string

  private get text (): string {
    return (this.content || (this.$slots.default || [{ text: '' }])[0].text || '').trim()
  }
}
</script>
