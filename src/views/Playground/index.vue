<template>
  <div class="min-h-screen">
    <s-navbar />
    <div class="min-h-screen-no-navbar flex">
      <div class="flex flex-col w-2/3">
        <div class="flex items-center my-4 mx-8">
          <s-text
            p="3"
            weight="semibold"
            color="text-gray-100"
          >
            {{ payload.logs.files[0] }}.story
          </s-text>
          <s-text
            p="6"
            weight="semibold"
            color="text-indigo-70"
            class="flex items-center py-1 px-2 rounded-sm bg-indigo-10 ml-3 cursor-default select-none"
          >
            <s-icon icon="eye" />
            <span class="ml-1">Read only</span>
          </s-text>
        </div>
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
import SText from '@/components/Text.vue'
import SIcon from '@/components/Icon.vue'

@Component({
  components: {
    SNavbar,
    SLogs,
    MonacoEditor,
    SIcon,
    SText
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
