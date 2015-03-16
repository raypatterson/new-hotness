'use-strict';

var path = require('path');
var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  // filename: Inherited from project config
  cwd: cfg.dest, // Run on the compiled source to only include active references
  src: [
    '**/*.{js,css}',
    '!' + path.join('**', cfg.dir.vendor, '**')
  ],
  dest: path.join(cfg.dest, cfg.dir.vendor),
  // Adds all tests for 'development' env
  // Detects used tests for 'production' env
  crawl: cfg.env === cfg.env_type.DEVELOPMENT ? false : true,
  filename: cfg.plugins.modernizr.filename,
  settings: {
    options: [
      'setClasses',
      'addTest',
      'html5printshiv',
      'testProp',
      'fnBind'
    ],
    excludeTests: [
      'dom/hidden', // FIXME: Need to exclude this test because otherwise Bootstrap hides the <html> element
      'websockets/binary' // FIXME: Need to exclude this test because otherwise Modernizr throws fatal JS error
    ]
  }
};
