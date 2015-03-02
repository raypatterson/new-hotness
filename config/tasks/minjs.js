'use-strict';

var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dest,
  src: ['**/*.js'],
  dest: cfg.dest,
  options: {}
};
