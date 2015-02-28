'use-strict';

var path = require('path');
var rek = require('rekuire');

var cfg = rek('config');

// var common_dir = path.join(cfg.dest, 'common');

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
        'common/**/*.css'
      ]
    }
  }, {
    html: {
      // cwd: defaults to dir of css file
      src: [
        '*.html'
      ]
    },
    css: {
      src: [
        '**/*.css',
        '!common/**/*.css'
      ]
    }
  }],
};
