import Vue, { PluginObject, PluginFunction } from 'vue'
import storyTheme from 'monaco-themes/themes/IDLE.json'
const registerRulesForLanguage = require('monaco-ace-tokenizer').registerRulesForLanguage
const monaco = require('monaco-editor')
const StoryscriptRules = require('./storyscript.lang.js').default

export class MonacoPlugin {
  private self: typeof monaco

  constructor () {
    this.self = monaco
  }

  public init () {
    this.self.languages.register({ id: 'storyscript' })
    registerRulesForLanguage('storyscript', new StoryscriptRules())
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

  const monaco = new MonacoPlugin()
  monaco.init()

  Object.defineProperty(V.prototype, '$monaco', {
    get () { return monaco.get() }
  })

  Object.defineProperty(V, '$monaco', {
    get () { return monaco.get() }
  })
}

export const plugin: PluginObject<any> = {
  install
}

if (!process || process.env.NODE_ENV !== 'test') {
  Vue.use(plugin)
}

export default plugin
