'use-strict';

var _ = require('lodash');
var path = require('path');
var rek = require('rekuire');

var cfg = rek('config');

var cloudfront = cfg.plugins.cloudfront;
var rev = _.clone(cfg.plugins.rev);

rev.options.ignore = [
  /(?!.*html)^.*$/g
];

module.exports = {
  cwd: cfg.dest,
  src: [
    '**/*.html'
  ],
  cloudfront: cloudfront,
  rev: rev
};
