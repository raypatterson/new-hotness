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
    'minify/pipe', [
      'minify/html',
      'minify/json',
      'minify/js',
      'minify/css',
      'minify/img'
    ],
    'rev/assets'
  ]
};
