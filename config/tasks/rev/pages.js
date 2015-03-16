'use-strict';

var _ = require('lodash');
var rek = require('rekuire');

var cfg = rek('config');

var options = _.clone(cfg.plugins.rev.options);

options.ignore = [
  /(?!.*html)^.*$/gi
];

module.exports = {
  cwd: cfg.dest,
  src: [
    '**/*.html'
  ],
  dest: cfg.dest,
  options: options
};
