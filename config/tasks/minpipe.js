'use-strict';

var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dest,
  src: [
    '**/*.html'
  ],
  dest: cfg.dest,
  options: {
    outputRelativePath: './foo'
  }
};
