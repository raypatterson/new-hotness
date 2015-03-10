'use-strict';

var path = require('path');
var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: path.join(cfg.dir.cwd, cfg.dir.app),
  src: [
    '**/*.{jpg,gif,png,svg}'
  ],
  dest: cfg.dest
};
