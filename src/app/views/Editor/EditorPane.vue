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
          class="p-4 mb-4 flex flex-col w-full"
        >
          <div class="flex flex-no-wrap items-center mb-4">
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
import { Component, Vue } from 'vue-property-decorator'
import MonacoEditor from '@editor/MonacoEditor.vue'
import { Editor, Languages } from '&/editor'

@Component({
  name: 'EditorPane',
  components: { MonacoEditor }
})
export default class EditorPane extends Vue {
  private editors: Array<Editor> = []
  private code: string = ''

  mounted () {
    this.editors.push(new Editor(Languages.Storyscript, ''))
    this.editors.push(new Editor(Languages.Text))
  }
}
</script>

<style lang="scss">
#editor-pane .monaco-editor {
  .line-numbers {
    opacity: 0;
    transition: all .2s ease-out;
  }

  &:hover,&.focused {
    .line-numbers {
      opacity: 1;
    }
  }
}
</style>
