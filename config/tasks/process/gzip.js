'use-strict';

var path = require('path');
var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dest,
  src: [
    '**/*.{html,css,js,json}'
  ],
  dest: cfg.dest
};
