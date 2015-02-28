'use-strict';

var path = require('path');
var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dest,
  inputs: [{
    html: {
      cwd: cfg.dest,
      src: [
        '**/*.html'
      ]
    },
    css: {
      src: [
        path.join(cfg.dir.common, '**/*.css')
      ]
    }
  }, {
    html: {
      // if no 'cwd:' defined, glob pattern is confined to root dir of css file
      src: [
        '*.html'
      ]
    },
    css: {
      src: [
        '**/*.css',
        '!' + path.join(cfg.dir.common, '**/*.css')
      ]
    }
  }],
};
