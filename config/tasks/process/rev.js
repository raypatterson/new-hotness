'use-strict';

var _ = require('lodash');
var rek = require('rekuire');

var cfg = rek('config');

var options = _.clone(cfg.plugins.rev.options);

options.ignore = [
  /html$/g
];

module.exports = {
  cwd: cfg.dest,
  src: [
    '**/*.*'
  ],
  dest: cfg.dest,
  options: options,
  manifest: {
    fileName: 'json/filemap.json'
  },
  versionFile: {
    fileName: 'json/versions.json'
  }
};
