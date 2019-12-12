<template>
  <div
    id="editor-pane"
    class="flex flex-1 flex-col"
  >
    <div class="bg-white mx-3 mt-3 shadow-dropdown flex flex-col flex-1 rounded-t-sm">
      <template v-for="(editor, idx) in editors">
        <div
          v-if="idx > 0"
          :key="`editor-pane-separator-${idx -1}-${idx}`"
          class="w-full h-px bg-gray-20"
        />
        <div
          :id="`editor-pane-${idx}`"
          :key="`editor-pane-lang-${editor.lang}-${idx}`"
          :data-lang="editor.language"
          class="py-4 px-2 mb-2 flex flex-col w-full"
        >
          <div class="flex flex-no-wrap items-center mx-2 mb-4">
            <s-icon
              :icon="editor.icon"
              class="m-1"
            />
            <s-text
              p="4"
              weight="medium"
              class="text-gray-100 ml-2 capitalize"
              v-text="editor.language"
            />
          </div>
          <div class="flex-1">
            <monaco-editor
              v-model="editor.value"
              :language="editor.language"
              class="w-full h-32"
              :options="editor.options"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import MonacoEditor from '@editor/MonacoEditor.vue'
import { Editor, Languages } from '&/editor'
import { IStorySample } from '&/StorySample'

@Component({
  name: 'EditorPane',
  components: { MonacoEditor }
})
export default class EditorPane extends Vue {
  private editors: Array<Editor> = []

  @Getter('getPayload')
  private payload!: IStorySample

  @Watch('payload', { immediate: true })
  private onPayloadUpdate () {
    this.editors.splice(0, this.editors.length)
    this.editors.push(new Editor(Languages.Storyscript, this.payload.code, { readOnly: true }))
  }
}
</script>

<style lang="scss">
#editor-pane .monaco-editor {
  .current-line {
    display: none;
  }
}
</style>
