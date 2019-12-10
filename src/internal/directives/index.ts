import Vue, { DirectiveOptions } from 'vue'
import ClickOutside from '@internal/directives/ClickOutside'

export const directives: { [key: string]: DirectiveOptions } = {
  ClickOutside
}

export function register () {
  for (const directive in (directives as any)) {
    Vue.directive(directive, directives[directive])
  }
}

export default {
  ...directives,
  register
}
