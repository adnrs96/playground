import Vue from 'vue'
import monaco from 'monaco-editor'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    $monaco?: typeof monaco
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $monaco: typeof monaco;
  }
}
