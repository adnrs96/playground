<template>
  <s-scrollbar
    id="editor-view"
    class="min-h-screen-no-navbar max-h-screen-no-navbar w-full"
  >
    <div class="mx-auto w-auto max-w-5xl flex min-h-screen-no-navbar">
      <editor-pane class="w-2/3" />
      <infos-pane class="w-1/3" />
    </div>
  </s-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditorPane from '@app/Editor/EditorPane.vue'
import InfosPane from '@app/Editor/InfosPane.vue'

@Component({
  name: 'Editor',
  components: { EditorPane, InfosPane }
})
export default class Editor extends Vue {
}
</script>
