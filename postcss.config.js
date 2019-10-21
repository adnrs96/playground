module.exports = {
  plugins: [
    require('tailwindcss')('tailwind.config.js'),
    require('autoprefixer')(),
    (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'integration') && require('@fullhuman/postcss-purgecss')({
      content: ['./public/index.html', './src/Playground.vue', './src/**/*.vue'],
      defaultExtractor: content => content.match(/[a-zA-Z0-9-_:/]+/g)
    })
  ]
}
