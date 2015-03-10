'use-strict';

var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dest,
  src: ['**/*.json'],
  dest: cfg.dest,
  options: {}
};
