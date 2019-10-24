<template>
  <div class="min-h-screen">
    <s-navbar />
    <div class="min-h-screen-no-navbar flex">
      <div class="w-2/3">
        <monaco-editor
          v-model="payload.code"
          class="w-full h-full"
          :options="options"
        />
      </div>

      <s-logs
        class="w-1/3"
        :logs="payload.logs"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SNavbar from '@/components/Navbar.vue'
import SLogs from '@/views/Playground/Logs.vue'
import { IStorySample } from '@/models/StorySample'
import counter from '@/samples/counter'
import MonacoEditor from '@/components/MonacoEditor.vue'

@Component({
  components: {
    SNavbar,
    SLogs,
    MonacoEditor
  }
})
export default class Playground extends Vue {
  private payload: IStorySample = counter

  private options: any = {
    readOnly: true,
    minimap: { enabled: false },
    fontSize: 16,
    automaticLayout: true
  }
}
</script>
