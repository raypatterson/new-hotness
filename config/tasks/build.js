'use-strict';

module.exports = {
  sequence: [
    [
      'lint/json',
      'lint/js'
    ],
    [
      'process/webpack',
      'process/copy'
    ],
    'process/modernizr'
  ]
};
