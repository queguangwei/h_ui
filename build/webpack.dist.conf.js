const webpack = require('webpack')
const nib = require('nib')
const path = require('path')
const utils = require('./utils')
const projectRoot = path.resolve(__dirname, '../')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const config = require('./config')
module.exports = {
  devtool: false,
  watch: process.env.TARGET === 'dev',
  entry: {
    app: './src/index.js'
  },
  // devtool: config.build.productionSourceMap ? '#source-map' : false,
  // path：用来存放打包后文件的输出目录 
  // publicPath：指定资源文件引用的目录 
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: './'
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'Vue': 'vue/dist/vue.runtime.js',
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:5].[ext]')
        }
      }
    ]
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'Vue',
      commonjs2: 'Vue',
      amd: 'Vue'
    }
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
    // 使用 extract-text-webpack-plugin就可以把css从js中独立抽离出来
    // new ExtractTextPlugin('venus.min.css')
  ]
}