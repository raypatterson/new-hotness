'use-strict';

module.exports = function(gulp, $, cfg) {

  gulp.task('minimg', function() {

    var task_cfg = cfg.tasks.minimg;

    return gulp.src(task_cfg.src, {
        cwd: task_cfg.cwd
      })
      .pipe($.imagemin(task_cfg.options))
      .pipe(gulp.dest(task_cfg.dest));
  });
};
