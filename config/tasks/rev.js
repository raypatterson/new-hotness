'use-strict';

var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  cwd: cfg.dest,
  src: [
    '**/*.*'
  ],
  dest: cfg.dest,
  options: {
    hashLength: 16,
    ignore: [
      /html/g
    ]
  },
  manifest: {
    fileName: 'json/filemap.json'
  },
  versionFile: {
    fileName: 'json/versions.json'
  }
};
