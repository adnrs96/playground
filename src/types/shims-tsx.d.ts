/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    /* eslint-disable @typescript-eslint/no-empty-interface */
    interface Element extends VNode { }
    /* eslint-disable @typescript-eslint/no-empty-interface */
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }

  interface Window {
    Intercom: any;
  }
}
