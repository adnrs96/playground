import Vue, { DirectiveOptions } from 'vue'
import ClickOutside from '@/directives/ClickOutside'


export const directives: { [key: string]: DirectiveOptions } = {
  ClickOutside
}

export function register () {
  for (let directive in (directives as any)) {
    Vue.directive(directive, directives[directive])
  }
}

export default {
  ...directives,
  register
}
