'use-strict';

var fs = require('fs-extra');
var rek = require('rekuire');
var reporter = require('jscs-stylish').path;

var cfg = rek('config');

module.exports = {
  cwd: cfg.dir.cwd,
  src: ['**/*.js'],
  options: {
    reporter: reporter
  },
  notify: {
    title: 'JS Style',
    message: 'JS Style Passed.'
  }
};
