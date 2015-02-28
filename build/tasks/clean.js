'use-strict';

var del = require('del');

module.exports = function(gulp, $, cfg) {

  gulp.task('clean', function(cb) {
    del(cfg.tasks.clean.patterns, cb);
  });
};
