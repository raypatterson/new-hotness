'use-strict';

var path = require('path');
var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  // filename: Inherited from project config
  cwd: cfg.dest, // Run on the compiled source to only include active references
  src: [
    '**/*.{js,css}'
  ],
  dest: path.join(cfg.dest, cfg.dir.vendor),
  settings: {
    options: [
      'setClasses',
      'addTest',
      'html5printshiv',
      'testProp',
      'fnBind'
    ],
    excludeTests: [
      'hidden' // FIXME: Need to exclude this test because otherwise Bootstrap hides the <html> element
    ]
  }
};
