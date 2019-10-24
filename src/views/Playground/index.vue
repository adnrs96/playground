<template>
  <div class="min-h-screen">
    <s-navbar />
    <div class="min-h-screen-no-navbar flex">
      <div class="w-2/3">
        <monaco-editor
          v-model="code"
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
  private automateLogs: boolean = false
  private code: string = 'redis set key: "count" value: 0\nwhen http server listen path: "/count" as req\n  count = (redis get key: "count").result + 1\n  redis set key: "count" value: count\n  req write content: "This page has been loaded {count} times"'

  private options: any = {
    readOnly: true,
    minimap: { enabled: false },
    fontSize: 16,
    automaticLayout: true
  }
}
</script>
