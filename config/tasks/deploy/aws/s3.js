'use-strict';

var path = require('path');
var rek = require('rekuire');

var cfg = rek('config');

var options = cfg.plugins.s3.options;

module.exports = {
  cwd: cfg.dest,
  src: [
    '**'
  ],
  options: options
};
