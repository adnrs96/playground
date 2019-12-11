import { Editor, Languages, EditorOptions } from '&/editor'
import { IEditorConstructionOptions } from '&/editor.d'

describe('Editor.ts', () => {
  describe('creating an editor', () => {
    it('without options', () => {
      const editor = new Editor(Languages.Storyscript)
      expect(editor).toHaveProperty('language', 'storyscript')
      expect(editor).toHaveProperty('icon', 'story')
    })

    it('with default options', () => {
      const options = {} as IEditorConstructionOptions
      const editor = new Editor(Languages.Storyscript, '', options)
      expect(editor).toHaveProperty('options', EditorOptions)
    })

    it('with a custom font size', () => {
      const options = { fontSize: 16 } as IEditorConstructionOptions
      const editor = new Editor(Languages.Storyscript, '', options)
      expect(editor).toHaveProperty('options', { ...EditorOptions, fontSize: 16 })
    })
  })
})
