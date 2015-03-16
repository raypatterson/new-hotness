'use-strict';

var rek = require('rekuire');
var fs = require('fs-extra');
var glob = require('globby');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var cfg = rek('config');

var ROOT_DIR = '.';
var USEMIN_DIR = cfg.dir.usemin;
var VENDOR_DIR = cfg.dir.vendor;
var COMMON_DIR = cfg.dir.common;
var CONFIG_DIR = cfg.dir.config;
var BUNDLE_FILENAMES = ['js', 'css', 'html'].reduce(function(o, i) {
  o[i] = ['index', i].join('.');
  return o;
}, {});

// Construct paths
var app_dir = path.resolve(ROOT_DIR, path.join(cfg.dir.cwd, cfg.dir.app));
var pages_dir = path.join(app_dir, 'pages');
var templates_dir = path.join(app_dir, 'templates');

// Glob entry points from 'pages' dir
// TODO: Clean up entry creation
var entry = {};
var chunks = [];
var page_dir;

glob.sync([
  '**/*.js',
  '!' + path.join('**', CONFIG_DIR, '**')
], {
  cwd: pages_dir
}).map(function(val, idx) {
  page_dir = path.dirname(val);
  entry[page_dir] = path.join(pages_dir, page_dir);
  chunks.push(page_dir);
});

// Add plugins
var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.CommonsChunkPlugin({
    name: VENDOR_DIR,
    filename: '[name]/' + BUNDLE_FILENAMES.js,
    // We need to be extremely explicit about vendor chunks
    // so a dedicated entry point is the easy way to manage
    chunks: [VENDOR_DIR],
    // With more entries, this ensures that no other module goes into the vendor chunk
    minChunks: Infinity
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: COMMON_DIR,
    filename: '[name]/' + BUNDLE_FILENAMES.js,
    chunks: chunks
  }),
  new ExtractTextPlugin(path.join('[name]', BUNDLE_FILENAMES.css), {
    allChunks: true
  })
];

// Add HTML files
var page_cfg;

for (page_dir in entry) {

  page_cfg_path = path.join(pages_dir, page_dir, CONFIG_DIR);
  page_cfg = fs.existsSync(page_cfg_path) ? require(page_cfg_path) : {};
  page_cfg.title = page_cfg.name ? [cfg.name, page_cfg.name].join(' | ') : cfg.name;


  var root_path = path.resolve(ROOT_DIR);
  var page_path = path.resolve(ROOT_DIR, page_dir);
  var deep_path = page_path === root_path ? '' : path.relative(page_path, root_path) + '/' + path.relative(root_path, page_path);

  var bundle_path = deep_path;
  var usemin_path = path.relative(page_dir, USEMIN_DIR);
  var vendor_path = path.relative(page_dir, VENDOR_DIR);
  var common_path = path.relative(page_dir, COMMON_DIR);

  plugins.push(new HtmlWebpackPlugin({
    template: path.join(templates_dir, 'base.html'),
    filename: path.join(page_dir, BUNDLE_FILENAMES.html),
    config: page_cfg,
    js: {
      modernizr: path.join(vendor_path, cfg.plugins.modernizr.filename),
      usemin: path.join(usemin_path, BUNDLE_FILENAMES.js),
      vendor: path.join(vendor_path, BUNDLE_FILENAMES.js),
      common: path.join(common_path, BUNDLE_FILENAMES.js),
      bundle: path.join(bundle_path, BUNDLE_FILENAMES.js),
    },
    css: {
      usemin: path.join(usemin_path, BUNDLE_FILENAMES.css),
      vendor: path.join(vendor_path, BUNDLE_FILENAMES.css),
      common: path.join(common_path, BUNDLE_FILENAMES.css),
      bundle: path.join(bundle_path, BUNDLE_FILENAMES.css),
    }
  }));
};

// Add vendor entry point
entry[VENDOR_DIR] = [path.join(app_dir, VENDOR_DIR)];

var modulesDirectories = [
  app_dir,
  'node_modules',
  'bower_components'
];

var loaders = [{
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(
    'style',
    'css?' +
    // 'root=' + app_dir + // Allows root relative paths in SASS
    '!autoprefixer' +
    '!sass?' +
    'outputStyle=expanded' +
    modulesDirectories.reduce(function(paths, path) {
      paths.push('&includePaths[]=' + path);
      return paths;
    }, []).join(''), {
      publicPath: '/'
        // publicPath: function(url, prev, done) {
        //   return './bar/'
        // }
    }
  )
}, {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract(
    'style',
    'css'
  )
}, {
  test: /(.*)\/fonts?\/(.*)\.(ttf|eot|svg|woff[0-9]?)$/,
  loader: 'url?limit=10000&minetype=application/font-woff&name=' + path.join(cfg.dir.fonts, '[name].[ext]')
}];

// Add production configs
if (cfg.env === cfg.env_type.PRODUCTION) {
  plugins = plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': cfg.env
      }
    }),
    new webpack.optimize.DedupePlugin()
  );

  loaders = loaders.concat({
    test: /\.(jpe?g|png|gif)$/i,
    loader: 'image?bypassOnDebug&optimizationLevel=7&interlaced=false&name=[path][name].[ext]&context=' + app_dir
  });

} else {

  loaders = loaders.concat({
    test: /\.(jpe?g|png|gif)$/i,
    loader: 'url?limit=8192&name=[path][name].[ext]&context=' + app_dir
  });
};

module.exports = {
  debug: true,
  devtool: '#inline-source-map',
  src: [
    '**/*.{js}'
  ],
  resolve: {
    modulesDirectories: modulesDirectories,
    extensions: [
      '',
      '.js',
      '.json',
      '.css',
      '.sass',
      '.jpg'
    ]
  },
  entry: entry,
  plugins: plugins,
  module: {
    loaders: loaders
  },
  output: {
    // publicPath: './foo/',
    // publicPath: function(url, prev, done) {
    //   return './foo/'
    // },
    filename: path.join('[name]', BUNDLE_FILENAMES.js)
  }
};
