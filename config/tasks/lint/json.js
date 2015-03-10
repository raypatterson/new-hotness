'use-strict';

var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dir.cwd,
  src: ['**/*.json'],
  options: {
    comments: true
  },
  notify: {
    title: 'JSON Lint',
    message: 'JSON Lint Passed.',
  }
};
