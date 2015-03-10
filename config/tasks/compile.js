'use-strict';

module.exports = {
  sequence: [
    'clean',
    'todo', [
      'stylesass',
      'stylejs'
    ],
    'build',
    'uncss', [
      'lintcolor',
      'linthtml',
      'lintcss'
    ],
    'inline',
    'rev', [
      'minimg',
      'minjson',
      'minhtml',
      'mincss',
      'minjs'
    ],
    'minpipe',
    'localhost'
  ]
};
