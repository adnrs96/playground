import { SLS } from '&/sls/types/sls.d'
import { IStandaloneCodeEditor, IActionDescriptor, Position } from '&/editor.d'
import { KeyCode } from '&/editor'

/**
Overloads the 'enter' key in the editor for a custom indentation behavior.
*/
// TODO: transform into experimental LSP Feature and add as capability
export function enterIndentAction (completion: SLS) : IActionDescriptor {
  return {
    id: 'enter-indent',
    label: 'Enter Indent Overload',

    keybindings: [KeyCode.Enter],
    keybindingContext: undefined, // don't show in context menu

    run: (ed: IStandaloneCodeEditor): Promise<void> => {
      const selections = ed.getSelections()
      // no indentation with a selection
      if (selections === null || selections.length === 0) {
        return Promise.resolve()
      }
      // TODO: might not be connected
      const lc = completion.languageClient!
      const pos = ed.getPosition()!
      return lc.onReady().then(() => {
        // convert to LSP request
        const uri = ed.getModel()!.uri.toString()
        const position = { line: pos.lineNumber - 1, character: pos.column - 1 }
        return lc.sendRequest('storyscript/indent', { textDocument: { uri }, position })
      }).then((p:any) => {
        const { indent } = p

        // add indentation
        const lines = ed.getModel()!.getValue().split('\n')
        const lineIndex = pos!.lineNumber - 1
        lines.splice(lineIndex + 1, 0, indent)

        const value = lines.join('\n')
        ed.getModel()!.setValue(value)
        const newPos = new Position(lineIndex + 2, indent.length + 1)
        ed.setPosition(newPos)

        return Promise.resolve()
      })
    }
  }
}
