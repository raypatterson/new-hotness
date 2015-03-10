'use-strict';

module.exports = {
  sequence: [
    'process/clean',
    'document/todo', [
      'style/sass',
      'style/js'
    ],
    'build',
    'process/uncss', [
      'lint/color',
      'lint/html',
      'lint/css'
    ],
    'process/inline',
    'process/rev', [
      'minify/img',
      'minify/json',
      'minify/html',
      'minify/css',
      'minify/js'
    ],
    'minify/pipe',
    'serve/browsersync'
  ]
};
