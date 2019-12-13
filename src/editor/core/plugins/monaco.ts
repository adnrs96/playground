import Vue, { PluginObject, PluginFunction } from 'vue'
import storyTheme from 'monaco-themes/themes/IDLE.json'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
const StoryHighlightRules = require('./storyscript.lang').default
const registerRulesForLanguage = require('./storyscript.lang').registerRulesForLanguage

export class MonacoPlugin {
  private self: typeof monaco

  constructor () {
    this.self = monaco
  }

  public init () {
    this.self.languages.register({ id: 'storyscript' })
    registerRulesForLanguage('storyscript', new StoryHighlightRules())
    this.self.editor.defineTheme('storyscript', storyTheme as any)
    this.self.editor.setTheme('storyscript')
  }

  public get () {
    return this.self
  }
}

export let isMonacoPluginInstalled = false

export const install: PluginFunction<any> = (V: typeof Vue, options?: any) => {
  if (isMonacoPluginInstalled) return
  isMonacoPluginInstalled = true

  const plugin = new MonacoPlugin()
  plugin.init()

  Object.defineProperty(V.prototype, '$monaco', {
    get () { return plugin.get() }
  })

  Object.defineProperty(V, '$monaco', {
    get () { return plugin.get() }
  })
}

export const plugin: PluginObject<any> = {
  install
}

if (!process || process.env.NODE_ENV !== 'test') {
  Vue.use(plugin)
}

export default plugin
