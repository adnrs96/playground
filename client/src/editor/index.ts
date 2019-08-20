require('monaco-editor-core')
import 'setimmediate'
import monacoTheme from 'monaco-themes/themes/Brilliance Black.json'

import '@/editor/languageClient'
import { conf, language } from '@/editor/syntax.monarch'


(window as any).MonacoEnvironment = {
    getWorkerUrl: () => './editor.worker.js'
}

monaco.languages.register({ id: 'storyscript' })

window.editor = monaco.editor.create(document.getElementById('editor')!, {
    model: monaco.editor.createModel('', 'storyscript', monaco.Uri.parse('inmemory://model.story')),
    lightbulb: { enabled: true },
    minimap: { enabled: false },
    fontSize: 14,
    fontFamily: "DejaVu Sans Mono for Powerline",
    scrollbar: {
        vertical: 'hidden'
    }
})

monaco.editor.defineTheme('monacoTheme', monacoTheme as any)
monaco.editor.setTheme('monacoTheme')
monaco.languages.setMonarchTokensProvider('storyscript', language)
monaco.languages.setLanguageConfiguration('storyscript', conf)
