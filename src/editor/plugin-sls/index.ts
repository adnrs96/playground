import { IStandaloneCodeEditor, EditorPlugin } from '&/editor.d'
import SLS from './SLS'

export class StoryscriptSLS extends SLS implements EditorPlugin {
  constructor (url: string = process.env.VUE_APP_SLS_URL!) {
    /* istanbul ignore next line */
    super(url, 'Storyscript Language Client', 'storyscript')
  }

  public attach (editor: IStandaloneCodeEditor) {
    this.install(editor)
    this.connect()
  }

  public detach () {
    this.disconnect()
  }
}

export default StoryscriptSLS
