'use-strict';

var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dest,
  src: ['**/*.css'],
  dest: cfg.dest,
  options: {}
};
