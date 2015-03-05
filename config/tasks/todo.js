'use-strict';

var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dir.cwd,
  src: ['**/*.{js,scss}'],
  options: {
    verbose: true
  },
  dest: cfg.root
};
