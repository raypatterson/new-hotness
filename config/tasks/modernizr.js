'use-strict';

var path = require('path');
var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dest, // Run on the compiled source to only include active references
  src: [
    '**/*.{js,css}'
  ],
  dest: cfg.dir.bundle,
  settings: {
    options: [
      'setClasses',
      'addTest',
      'html5printshiv',
      'testProp',
      'fnBind'
    ]
  }
};
