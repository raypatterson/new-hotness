'use-strict';

var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dest,
  src: ['**/*.html'],
  options: {
    htmlhintrc: '.htmlhintrc'
  },
  notify: {
    title: 'HTML Lint',
    message: 'HTML Lint Passed.',
  }
};
