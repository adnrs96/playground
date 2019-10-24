<template>
  <div
    id="logs"
    class="overflow-y-auto pt-3 px-6 border-l border-solid border-gray-30"
  >
    <s-text
      p="3"
      weight="semibold"
      color="text-gray-100"
      class="mb-4"
    >
      Logs
    </s-text>
    <pre class="whitespace-pre-wrap"><code class="text-gray-100 font-body text-sm">{{ logs }}</code></pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SText from '@/components/Text.vue'

@Component({
  name: 'Logs',
  components: {
    SText
  }
})
export default class Logs extends Vue {
  @Prop({ type: String, required: true }) readonly logs!: string
}
</script>
