<template>
  <div id="infos-pane">
    <s-text
      p="4"
      weight="medium"
      align="center"
      class="text-gray-50 mt-3"
    >
      0 Suggestions, 0 Error
    </s-text>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'InfosPane'
})
export default class InfosPane extends Vue {
}
</script>
