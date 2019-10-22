<template>
  <monaco-editor
    v-model="code"
    class="w-screen h-screen"
    :options="options"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MonacoEditor from '@/components/MonacoEditor.vue'

@Component({
  name: 'Editor',
  components: { MonacoEditor }
})
export default class Editor extends Vue {
  private code: string = 'redis set key: "count" value: 0\nwhen http server listen path: "/count" as req\n  count = (redis get key: "count").result + 1\n  redis set key: "count" value: count\n  req write content: "This page has been loaded {count} times"'

  private options: any = {
    readOnly: true,
    minimap: { enabled: false },
    fontSize: 16
  }
}
</script>
