'use-strict';

var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  watch: {
    files: [
      cfg.dir.cwd + '/**/*.{html,json,js,jsx,scss}'
    ]
  }
};
