'use-strict';

var path = require('path');
var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dest,
  json: {
    src: ['**/*.json']
  },
  html: {
    src: ['**/*.html']
  },
  dest: cfg.dest,
  dataKeyName: '__inline_data___'
};
