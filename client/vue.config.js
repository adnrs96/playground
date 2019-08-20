module.exports = {
    chainWebpack: config => {
        config.entry('editor.worker').add('monaco-editor-core/esm/vs/editor/editor.worker.js')
        config.resolve.alias.set('vscode', require.resolve('monaco-languageclient/lib/vscode-compatibility'))
        config.devtool = 'source-map'
    }
}
