'use-strict';

module.exports = function(gulp, $, cfg) {

  gulp.task('compile', function(cb) {

    $.sequence.apply(null, cfg.tasks.compile.sequence)(cb);
  });
};
