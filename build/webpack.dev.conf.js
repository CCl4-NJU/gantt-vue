'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

//为了模拟数据进行的配置修改
const express = require('express')
const app = express()
var product3Data = require('../static/mock/product-3-2020-10-01.json')
var product3Data_day = require('../static/mock/product-3-2020-10-17-2020-10-22.json')
var resourceData = require('../static/mock/resource-2020-10-01.json')
var resourceData2 = require('../static/mock/resource-2020-10-17.json')
var resourceData_post = require('../static/mock/resource-2020-11-01-2020-11-04.json')
var orderData = require('../static/mock/order-2020-10-01.json')
var percentData = require('../static/mock/percent-2020-10-01.json')
var percentData2 = require('../static/mock/percent-2020-10-17.json')
var percentData3 = require('../static/mock/percent-2020-09.json')
var resourceInfo = require('../static/mock/resource.json')

var apiRoutes = express.Router()
app.use(apiRoutes)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    //模拟数据配置项
    before(app) {
      app.get('/product/3/2020-10-01', (req, res) => {
        res.json(product3Data)
      })
      app.post('/product/3', (req, res) => {
        res.json(product3Data_day)
      })
      app.get('/resource-2020-10-01', (req, res) => {
        res.json(resourceData)
      })
      app.get('/resource-2020-10-17', (req, res) => {
        res.json(resourceData2)
      })
      app.post('/resource', (req, res) => {
        res.json(resourceData_post)
      })
      app.get('/order/2020-10-01', (req, res) => {
        res.json(orderData)
      })
      app.get('/percent/2020-10-01/2020-10-07', (req, res) => {
        res.json(percentData)
      })
      app.get('/percent/2020-10-17/2020-10-22', (req, res) => {
        res.json(percentData2)
      })
      app.get('/percent/month/2020-09/2020-11', (req, res) => {
        res.json(percentData3)
      })
      app.get('/resourceInfo', (req, res) => {
        res.json(resourceInfo)
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
