'use-strict';

var path = require('path');
var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: root,
  src: [
    path.join(cfg.dest, '**')
  ]
};
