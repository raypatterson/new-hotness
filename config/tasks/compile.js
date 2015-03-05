'use-strict';

module.exports = {
  sequence: [
    'clean', [
      'lintjs',
      'stylejs'
    ],
    'todo',
    'build',
    'uncss',
    'rev', [
      'minjson',
      'minhtml',
      'mincss',
      'minjs'
    ],
    'inline',
    'localhost'
  ]
};
