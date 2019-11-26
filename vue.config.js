const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true
    },
    name: 'Storyscript Studio',
    themeColor: '#5C52FF',
    msTileColor: '#FFFFFF',
    assetsVersion: require('./package.json').version,
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  },
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['storyscript'],
        features: ['!clipboard']
      })
    ],
    module: {
      rules: [{
        test: /\.story$/,
        use: 'raw-loader'
      }]
    }
  }
}
