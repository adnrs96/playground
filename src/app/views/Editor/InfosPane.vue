<template>
  <div
    id="infos-pane"
    class="max-w-pane mr-1 relative"
  >
    <s-text
      id="infos-counter"
      p="4"
      weight="medium"
      align="center"
      class="text-gray-50 mt-3 sticky top-3"
    >
      0 Suggestions, {{ errors.length }} Error
    </s-text>
    <!-- We use 43px static offset here to account for difference from where top is being measured -->
    <!-- Ideally we should in future do this offset calculation dynamically -->
    <div
      v-for="error in errors"
      :key="`error-brick-${error.line}-${error.msg}`"
      :name="`error-brick-${error.line}-${error.msg}`"
      :style="{
        marginTop: error.relativeTop + error.editorTop - 43 + 'px',
        marginLeft: cursorLine === error.line? '-2rem': 'unset'
      }"
      class="transition-all-fastest"
    >
      <div class="flex flex-row absolute w-full bg-white border border-solid border-red-30 rounded-lg shadow-sm p-1">
        <div class="rounded-full border-red-60 border-2 mr-2 h-8" />
        <s-text
          p="2"
          weight="medium"
          class="text-gray-100 break-word self-center"
          v-text="error.msg"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { ISLSError } from '@app/store/modules/EditorErrors'

@Component({
  name: 'InfosPane'
})
export default class InfosPane extends Vue {
  @Getter('getSLSErrors')
  private errors!: ISLSError

  @Getter('getCursorLine')
  private cursorLine!: number
}
</script>
