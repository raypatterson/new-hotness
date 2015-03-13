'use-strict';

var rek = require('rekuire');

var cfg = rek('config');

// FIXME: Ironically, the 'src' prop needs some work...

module.exports = {
  cwd: cfg.root,
  src: [
    '**/*.{js,scss}',
    '!**/node_modules/**/*',
    '!**/bower_components/**/*',
    '!**/.tmp/**/*',
    '!**/dist/**/*'
  ],
  options: {
    // verbose: true
  },
  dest: cfg.root
};
