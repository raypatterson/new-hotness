'use-strict';

module.exports = {
  sequence: [
    'clean',
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
