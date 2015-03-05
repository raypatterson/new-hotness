'use-strict';

var path = require('path');
var fs = require('fs-extra');
var rek = require('rekuire');

var cfg = rek('config');

var csslintrc = fs.readJsonSync('.csslintrc');

module.exports = {
  cwd: cfg.dest,
  src: [
    '**/*.css',
    '!' + path.join('**', cfg.dir.vendor, '**')
  ],
  options: {
    csslintrc: csslintrc
  },
  notify: {
    title: 'CSS Lint',
    message: 'CSS Lint Passed.',
  }
};
