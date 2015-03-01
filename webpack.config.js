var fs = require('fs-extra');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var bowerDirectory = JSON.parse(fs.readFileSync('./.bowerrc', 'utf-8')).directory;
var cfg = require('./gulpfile.config');

module.exports = {
  resolve: {
    modulesDirectories: [
      'node_modules',
      bowerDirectory,
      cfg.dir.app
    ]
  },
  extensions: [
    '',
    '.js',
    '.css', '.scss'
  ],
  entry: {
    lilsr: './app/lib/lilsr.jsx',
    index: './app/lib/index',
    lil: './app/utils/lil'
  },
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.jsx$/,
      loader: 'jsx'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.scss$/,
      loader: 'style!css!autoprefixer!sass?outputStyle=expanded&' +
        'includePaths[]=' +
        (path.resolve(__dirname, './app')) + '&' +
        'includePaths[]=' +
        (path.resolve(__dirname, './bower_components')) + '&' +
        'includePaths[]=' +
        (path.resolve(__dirname, './node_modules'))
    }, {
      test: /\.woff$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)$/,
      loader: 'file'
    }]
  },
  output: {
    filename: 'lib/[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'CONFIG': JSON.stringify(cfg)
    }),
    new HtmlWebpackPlugin({
      filename: 'lilsr.html',
      template: 'app/lilsr.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.html'
    }),
    new webpack.ProvidePlugin({
      Logger: 'js-logger',
      React: 'react',
      Reflux: 'reflux',
      Cortex: 'cortexjs',
      _: 'lodash',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};