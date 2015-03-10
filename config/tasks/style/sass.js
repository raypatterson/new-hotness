'use-strict';

var path = require('path');
var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dir.cwd,
  src: [
    '**/*.scss'
  ],
  configPath: path.join(cfg.root, '.csscomb.json'),
  options: {},
  dest: cfg.dir.cwd // Since we cannot report, we repair
};
