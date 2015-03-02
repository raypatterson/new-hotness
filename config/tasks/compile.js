'use-strict';

module.exports = {
  sequence: [
    'clean',
    'build',
    'uncss',
    'rev', ['mincss', 'minjs', 'minjson', 'minhtml'],
    'inline',
    'localhost'
  ]
};
