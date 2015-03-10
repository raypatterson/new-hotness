'use-strict';

module.exports = function(gulp, $, cfg) {

  gulp.task('default', function(cb) {

    $.sequence.apply(null, cfg.tasks.default.sequence)(cb);
  });
};
