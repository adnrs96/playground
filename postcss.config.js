module.exports = {
  plugins: [
    require('tailwindcss')('tailwind.config.js'),
    require('autoprefixer')(),
    (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'integration') && require('@fullhuman/postcss-purgecss')({
      content: [
        './public/index.html',
        './src/Studio.vue',
        './src/**/*.vue',
        './node_modules/monaco-editor/esm/vs/base/**/*.css',
        './node_modules/monaco-editor/esm/vs/editor/standalone/**/*.js',
        './node_modules/monaco-editor/esm/vs/editor/standalone/**/*.css',
        './node_modules/monaco-editor/esm/vs/editor/*.js',
        './node_modules/monaco-editor/esm/vs/editor/**/*.js',
        './node_modules/@storyscript/vue/dist/vue.storyscript.esm.js'
      ],
      defaultExtractor: content => content.match(/[a-zA-Z0-9-_:/]+/g)
    })
  ]
}
