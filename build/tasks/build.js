'use-strict';

module.exports = function(gulp, $, cfg) {

  gulp.task('build', function(cb) {

    $.sequence.apply(null, cfg.tasks.build.sequence)(cb);
  });
};
