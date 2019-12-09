import Vue from 'vue'
import { IntercomPlugin } from '@internal/plugins/intercom'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    $intercom?: IntercomPlugin;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $intercom: IntercomPlugin;
  }
}
