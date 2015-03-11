'use-strict';

var rek = require('rekuire');

var cfg = rek('config');

module.exports = {
  patterns: [cfg.dest]
};
