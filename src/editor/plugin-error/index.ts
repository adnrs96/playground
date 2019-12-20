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
      // We need this monacoEditor instead of the one which the attach
      // function is called with because these two are different.
      // The one inside attach function call parameters is implementing
      // IStandaloneCodeEditor interface whereas editor in this constructor
      // is actually a module.
      // We need this editor because it has some functions which aren't present
      // inside the IStandalongCodeEditor (like setModelMarkers) which we need
      // to override in attach. One can think of editor in this constructor as
      // a module with some free floating functions which performs some tasks
      // on parameters provided to them whereas the editor inside the attach
      // function is more of an instance of the CodeEditor which one of the
      // free floating function (i.e. create()) inside this editor created.
      this.monacoEditor = monacoEditor
      this.setModelMarkersOriginal = monacoEditor.setModelMarkers
    }

    public attach (editor: IStandaloneCodeEditor) {
      // NOTE: Overhere we are overriding/swapping out a function
      // from monaco library with our own version. This is needed
      // for displaying errors as per Storyscript Studio design.
      // SLS plugin makese use of a library monaco-languageclient
      // which handles most of the RPC stuff for the SLS plugin and
      // is also responsible for capturing the error diagnostics from
      // SLS server and reporting/decorating the code with appropriate
      // Redflags and Peek problem context widgets. It does all this by
      // making a call to the `setModelMarkers` function of the monaco
      // library directly. Thus in order to intercept that call we need
      // to swap out the implementation of the function with our own and
      // extract data from the IMarkerData and use it to display #studio
      // style errors.
      this.monacoEditor.setModelMarkers = function (model: editor.ITextModel, owner: string, markers: editor.IMarkerData[]): void {
        if (markers.length > 0) {
          const sln = markers[0].startLineNumber
          const errorMsg = markers[0].message
          const editorTop = editor.getDomNode()!.offsetTop
          store.commit('setSLSErrors',
            [{ msg: errorMsg, line: sln, relativeTop: editor.getTopForLineNumber(sln), editorTop: editorTop }])
        } else {
          store.commit('clearErrorState')
        }
      }
      editor.onDidChangeCursorPosition((e) => store.commit('setCursorLine', e.position.lineNumber))
      editor.onDidBlurEditorText(() => store.commit('clearCursorState'))
    }

    public detach () {
      // Restore the function definition with monaco's original version.
      this.monacoEditor.setModelMarkers = this.setModelMarkersOriginal
    }
}

export default StoryscriptError
