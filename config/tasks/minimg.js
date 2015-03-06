'use-strict';

var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dir.cwd,
  src: [
    '**/*.{jpe?g|png|gif|svg}'
  ],
  options: {
    progressive: true,
    interlaced: true,
    svgoPlugins: [{
      removeViewBox: false
    }]
  },
  dest: cfg.dest
};
