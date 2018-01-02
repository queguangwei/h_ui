const base = require('./webpack.dist.conf')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const builds = {
  'dev' : {
    filename: 'h_ui.js',
    // 组件采用UMD格式打包
    libraryTarget: 'umd',
  },
  'prod' : {
    filename: 'h_ui.min.js',
    libraryTarget: 'umd',
    env: 'production'
  }
}

function genConfig (opts) {
  let config = merge({}, base, {
    output: {
      filename: opts.filename,
      libraryTarget: opts.libraryTarget
    }
  })

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': opts.env || 'development'
    })
  ])

  if (opts.env) {
    config.module.loaders = config.module.loaders.concat([
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
      }
    ])
    //文件压缩
    config.plugins = config.plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin('h_ui.min.css')
    ])
  }else{
    config.module.loaders = config.module.loaders.concat([
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }      
    ])
  }

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET])
} else {
  exports.getBuild = name => genConfig(builds[name])
  exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]))
}