import { IStandaloneCodeEditor, EditorPlugin } from '&/editor.d'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api'
import store from '@app/store'

interface ISetModelMarkers {
    (model: editor.ITextModel, owner: string, markers: editor.IMarkerData[]): void
}

export class StoryscriptError implements EditorPlugin {
    private readonly monacoEditor: typeof editor
    private readonly setModelMarkersOriginal: ISetModelMarkers

    constructor (monacoEditor: typeof editor) {
      this.monacoEditor = monacoEditor
      this.setModelMarkersOriginal = monacoEditor.setModelMarkers
    }

    public attach (editor: IStandaloneCodeEditor) {
      const setModelMarkers = this.setModelMarkersOriginal
      this.monacoEditor.setModelMarkers = function (model: editor.ITextModel, owner: string, markers: editor.IMarkerData[]): void {
        if (markers.length > 0) {
          const sln = markers[0].startLineNumber
          const errorMsg = markers[0].message
          store.commit('setSLSErrors', [{ msg: errorMsg, line: sln, relativeTop: editor.getTopForLineNumber(sln) }])
        } else {
          store.commit('clearErrorState')
        }
        setModelMarkers(model, owner, markers)
      }
      editor.onDidChangeCursorPosition((e) => store.commit('setCursorLine', e.position.lineNumber))
      editor.onDidBlurEditorText(() => store.commit('clearCursorState'))
    }

    public detach () {
      this.monacoEditor.setModelMarkers = this.setModelMarkersOriginal
    }
}

export default StoryscriptError
