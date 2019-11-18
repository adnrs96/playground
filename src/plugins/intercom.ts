import Vue, { PluginObject, PluginFunction } from 'vue'

const callIf = (a: boolean, f: () => void) => a && f()

export interface VueIntercom extends Vue {
  ready: boolean
  visible: boolean
  unreadCount: number
}

export class IntercomPlugin {
  private _vm: VueIntercom
  private id: string

  constructor ({ appId }: { appId: string }) {
    this.id = appId
    this._vm = new Vue({
      data: () => ({
        ready: false,
        visible: false,
        unreadCount: 0
      })
    })
  }

  private get vm (): VueIntercom {
    return this._vm
  }

  private callIntercom (...args: any[]): any {
    return window.Intercom(...args)
  }

  public _init () {
    this._vm.ready = true
    this.callIntercom('onHide', () => (this.vm.visible = false))
    this.callIntercom('onShow', () => (this.vm.visible = true))
    this.callIntercom(
      'onUnreadCountChange',
      (unreadCount: number) => (this.vm.unreadCount = unreadCount)
    )
  }

  public _call (...args: any[]): any {
    return this.callIntercom(...args)
  }

  public boot (options: { [key: string]: any } = { app_id: this.id }) {
    callIf(!options.app_id, () => (options.app_id = this.id))
    this.callIntercom('boot', options)
  }

  public shutdown (): any {
    return this.callIntercom('shutdown')
  }

  public update (...options: any): any {
    return this.callIntercom('update', ...options)
  }

  public show (): any {
    return this.callIntercom('show')
  }

  public hide (): any {
    return this.callIntercom('hide')
  }

  public showMessages (): any {
    return this.callIntercom('showMessages')
  }

  public showNewMessage (content: string): any {
    return this.callIntercom('showNewMessage', ...(typeof content === typeof '' ? [content] : []))
  }

  public trackEvent (name: string, ...metadata: any[]): any {
    return this.callIntercom('trackEvent', ...[name, ...metadata])
  }

  public getVisitorId (): string {
    return this.callIntercom('getVisitorId') as string
  }

  public loadScript (appId: string, done: () => void): void {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://widget.intercom.io/widget/${appId}`
    const firstScript = document.getElementsByTagName('script')[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
      script.onload = done
    }
  }
}

export let isIntercomPluginInstalled = false

export const install: PluginFunction<any> = (V: typeof Vue, options?: any) => {
  if (isIntercomPluginInstalled) return

  const plugin = new IntercomPlugin(options)

  V.mixin({
    mounted () {
      callIf(!isIntercomPluginInstalled, () => {
        if ('Intercom' in window && typeof window.Intercom === 'function') {
          plugin._init()
          plugin._call('reattach_activator')
          plugin.update()
        } else {
          const placeholder: any = (...args: any[]) => placeholder.c(args)
          placeholder.q = []
          placeholder.c = (args: any) => placeholder.q.push(args)
          window.Intercom = placeholder
          const loaded = () => plugin.loadScript(options.appId, () => plugin._init())
          if (document.readyState === 'complete') {
            loaded()
          } else {
            window.addEventListener('load', loaded, false)
          }
        }
        isIntercomPluginInstalled = true
      })
    }
  })

  Object.defineProperty(V.prototype, '$intercom', {
    get () { return plugin }
  })

  Object.defineProperty(V, '$intercom', {
    get () { return plugin }
  })
}

export const plugin: PluginObject<any> = {
  install
}

if (!process || process.env.NODE_ENV !== 'test') {
  Vue.use(plugin, { appId: process.env.VUE_APP_INTERCOM_APP_ID })
}

export default plugin
