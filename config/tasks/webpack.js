'use-strict';

var rek = require('rekuire');
var glob = require('globby');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var cfg = rek('config');

var ROOT_DIR = '.';
var COMMON_DIR = 'common';
var BUNDLE_FILENAMES = ['js', 'css', 'html'].reduce(function(o, extension) {
  o[extension] = ['index', extension].join('.');
  return o;
}, {});

// Construct paths
var app_dir = path.resolve(ROOT_DIR, path.join(cfg.dir.cwd, cfg.dir.app));
var pages_dir = path.join(app_dir, 'pages');
var templates_dir = path.join(app_dir, 'templates');

// Glob entry points from 'pages' dir
var entry = {};
var page_dir;

glob.sync('**/*.js', {
  cwd: pages_dir
}).map(function(val, idx) {
  page_dir = path.dirname(val);
  entry[page_dir] = path.join(pages_dir, page_dir);
});

// Add plugins
var plugins = [
  new webpack.optimize.CommonsChunkPlugin(COMMON_DIR, '[name]/' + BUNDLE_FILENAMES.js),
  new ExtractTextPlugin(path.join('[name]', BUNDLE_FILENAMES.css), {
    allChunks: true
  })
];

// Add HTML files
var page_cfg;

for (page_dir in entry) {

  page_cfg = require(path.join(pages_dir, page_dir, 'config'));
  page_cfg.title = [cfg.name, page_cfg.name].join(' | ');

  plugins.push(new HtmlWebpackPlugin({
    template: path.join(templates_dir, 'base.html'),
    filename: path.join(page_dir, BUNDLE_FILENAMES.html),
    config: page_cfg,
    js: {
      common: path.join(path.relative(page_dir, COMMON_DIR), BUNDLE_FILENAMES.js),
      bundle: BUNDLE_FILENAMES.js
    },
    css: {
      common: path.join(path.relative(page_dir, COMMON_DIR), BUNDLE_FILENAMES.css),
      bundle: BUNDLE_FILENAMES.css
    }
  }));
};

var modulesDirectories = [
  app_dir,
  'node_modules',
  'bower_components'
];

var loaders = [{
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(
    'style',
    'css!autoprefixer!sass?' +
    'outputStyle=expanded' +
    '&' +
    modulesDirectories.join('includePaths[]=&')
  )
}, {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract(
    'style',
    'css'
  )
}, {
  test: /\.woff$/,
  loader: 'url?limit=10000&minetype=application/font-woff'
}, {
  test: /\.(ttf|eot|svg)$/,
  loader: 'file'
}];

module.exports = {
  resolve: {
    modulesDirectories: modulesDirectories
  },
  entry: entry,
  plugins: plugins,
  module: {
    loaders: loaders
  },
  output: {
    filename: path.join('[name]', BUNDLE_FILENAMES.js)
  }
};
