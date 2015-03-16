'use-strict';

var _ = require('lodash');
var path = require('path');
var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dest,
  src: [
    '**/*.html'
  ],
  options: cfg.plugins.cloudfront.options
};
