'use-strict';

module.exports = {
  sequence: [
    [
      'clean',
      'todo',
      'stylesass',
      'stylejs'
    ],
    'build',
    'uncss', [
      'lintcolor',
      'linthtml',
      'lintcss'
    ],
    'rev', [
      'minimg',
      'minjson',
      'minhtml',
      'mincss',
      'minjs'
    ],
    'inline',
    'localhost'
  ]
};
