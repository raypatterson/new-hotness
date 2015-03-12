'use-strict';

var _ = require('lodash');

module.exports = function(gulp, $, cfg, id) {

  gulp.task(id, function(cb) {

    // FIXME: Something is mutating the parallel task string values into object literals... Maybe the sequence task?
    var sequence_cfg = _.clone(cfg.sequences[id]);

    $.sequence.apply(null, sequence_cfg.sequence)(cb);
  });
};
