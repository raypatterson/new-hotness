'use-strict';

var fs = require('fs-extra');
var rek = require('rekuire');

var cfg = rek('config');

var options = fs.readJsonSync('.jshintrc');

options.globals = {
  'window': false,
  'Modernizr': false,
  'jQuery': false,
  '$': false
};

module.exports = {
  cwd: cfg.dir.cwd,
  src: ['**/*.js'],
  options: options,
  reporter: 'jshint-stylish'
};
