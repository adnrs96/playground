import { SLS } from '&/sls/types/sls.d'
import { IStandaloneCodeEditor, IActionDescriptor } from '&/editor.d'
import { KeyCode } from '&/editor'

/**
Overloads the 'enter' key in the editor for a custom indentation behavior.
*/
export function enterIndentAction (_: SLS) : IActionDescriptor {
  return {
    id: 'enter-indent',
    label: 'Enter Indent Overload',

    keybindings: [KeyCode.Enter],
    keybindingContext: undefined, // don't show in context menu

    run: (_: IStandaloneCodeEditor): Promise<void> => {
      return Promise.resolve()
    }
  }
}
