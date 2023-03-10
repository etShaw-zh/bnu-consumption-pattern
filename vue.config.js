const path = require('path')
const fs = require('fs')

// Generate pages object
const pages = {}

function getEntryFile(entryPath) {
  let files = fs.readdirSync(entryPath)
  return files
}

const chromeName = getEntryFile(path.resolve(`src/entry`))

function getFileExtension(filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined
}
chromeName.forEach((name) => {
  const fileExtension = getFileExtension(name)
  const fileName = name.replace('.' + fileExtension, '')
  pages[fileName] = {
    entry: `src/entry/${name}`,
    template: 'public/index.html',
    filename: `${fileName}.html`
  }
})

const isDevMode = process.env.NODE_ENV === 'development'
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin"); // Add this to fix the error about Crawler
module.exports = {
  pages,
  filenameHashing: false,
  chainWebpack: (config) => {
    config.plugin('copy').use(require('copy-webpack-plugin'), [
      {
        patterns: [
          {
            from: path.resolve(`src/manifest.${process.env.NODE_ENV}.json`),
            to: `${path.resolve('dist')}/manifest.json`
          },
          {
            from: path.resolve(`src/tools/api.js`),
            to: `${path.resolve('dist')}/api.js`
          },
          {
            from: path.resolve(`src/assets/icon.png`),
            to: `${path.resolve('dist')}/icon.png`
          }
        ]
      }
    ])
  },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()], // Add this to fix the error about Crawler
    externals: {
      fs: require('fs'), // Add this to fix the error about Crawler
      http2: require('http2'), // Add this to fix the error about Crawler
    },
    output: {
      filename: `[name].js`,
      chunkFilename: `[name].js`
    },
    devtool: isDevMode ? 'inline-source-map' : false
  },
  css: {
    extract: false // Make sure the css is the same
  }
}
